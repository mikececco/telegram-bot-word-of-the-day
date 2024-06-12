// import cron from 'node-cron'
import { config as configuration } from '#root/config.js'
import { createBot } from '#root/bot/index.js'
import { prisma } from '#root/prisma/index.js'

const bot = createBot(configuration.BOT_TOKEN, {
  prisma,
})

console.log(bot)

// Ensure bot instance is available and properly configured
// cron.schedule('* * * * *', async () => {
//   try {
//     await bot.api.sendMessage(12345, 'Hi!')
//   }

//   catch (error) {
//     console.error('Error sending message:', error)
//   }
// })
