import { config as configuration } from '#root/config.js'
import { createBot } from '#root/bot/index.js'
import { prisma } from '#root/prisma/index.js'

const bot = createBot(configuration.BOT_TOKEN, {
  prisma,
})

console.log(bot)
console.log('helo')
