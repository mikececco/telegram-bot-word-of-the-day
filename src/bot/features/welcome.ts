import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { createOrFindUser } from '#root/prisma/create-user.js'
import { startKeyboard } from '#root/bot/keyboards/index.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command('start', logHandle('command-start'), async (ctx) => {
  try {
    const newUser = await createOrFindUser({
      telegramId: ctx.from.id,
      username: ctx.from.username ?? 'Unknown', // Use optional chaining and provide a default value
    })
    console.log('User username:', ctx.from.username)
    console.log('Created user:', newUser)
  }
  catch (error) {
    console.error('Error creating user:', error)
  }

  return ctx.reply(ctx.t('welcome'), {
    reply_markup: startKeyboard,
  })
})

export { composer as welcomeFeature }
