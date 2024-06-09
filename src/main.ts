#!/usr/bin/env tsx

import process from 'node:process'
import cron from 'node-cron'
import { createBot } from '#root/bot/index.js'
import { config } from '#root/config.js'
import { logger } from '#root/logger.js'
import { createServer, createServerManager } from '#root/server/index.js'
import { prisma } from '#root/prisma/index.js'

function onShutdown(cleanUp: () => Promise<void>) {
  let isShuttingDown = false
  const handleShutdown = async () => {
    if (isShuttingDown)
      return
    isShuttingDown = true
    logger.info('Shutdown')
    await cleanUp()
  }
  process.on('SIGINT', handleShutdown)
  process.on('SIGTERM', handleShutdown)
}

async function startPolling() {
  const bot = createBot(config.BOT_TOKEN, {
    prisma,
  })
  // graceful shutdown
  onShutdown(async () => {
    await bot.stop()
  })

  // start bot
  await bot.start({
    allowed_updates: config.BOT_ALLOWED_UPDATES,
    onStart: ({ username }) =>
      logger.info({
        msg: 'Bot running...',
        username,
      }),
  })
}

async function startWebhook() {
  const bot = createBot(config.BOT_TOKEN, {
    prisma,
  })
  const server = createServer(bot)
  const serverManager = createServerManager(server)

  // graceful shutdown
  onShutdown(async () => {
    await serverManager.stop()
  })

  // to prevent receiving updates before the bot is ready
  await bot.init()

  cron.schedule('* * * * *', async () => {
    try {
      await bot.api.sendMessage(352550606, 'Hi!')
    }

    catch (error) {
      console.error('Error sending message:', error)
    }
  })

  // start server
  const info = await serverManager.start(
    config.BOT_SERVER_HOST,
    config.BOT_SERVER_PORT,
  )
  logger.info({
    msg: 'Server started',
    url:
      info.family === 'IPv6'
        ? `http://[${info.address}]:${info.port}`
        : `http://${info.address}:${info.port}`,
  })
}

try {
  if (config.BOT_MODE === 'webhook')
    await startWebhook()
  else if (config.BOT_MODE === 'polling')
    await startPolling()
}
catch (error) {
  logger.error(error)
  process.exit(1)
}
