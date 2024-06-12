import { Composer } from 'grammy'
import { AssemblyAI } from 'assemblyai'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { config as configuration } from '#root/config.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

const client = new AssemblyAI({
  apiKey: configuration.ASSEMBLY_AI,
})

feature.on('message', logHandle('command-any'), async (ctx) => {
  if (ctx.message.photo) {
    ctx.reply('You sent a photo.')
  }
  else if (ctx.message.animation) {
    ctx.reply('You sent an animation.')
  }
  else if (ctx.message.audio) {
    ctx.reply('Audio received.')
    ctx.chatAction = 'typing'
    const file = await ctx.getFile() // valid for at least 1 hour
    const path = file.file_path // file path on Bot API server

    if (path) {
      const config = {
        audio_url: path,
      }

      const transcript = await client.transcripts.transcribe(config)

      console.log(transcript.text)
      if (transcript.text) {
        return ctx.reply(transcript.text)
      }
      return (ctx.reply('Empty'))
    }
    else {
      console.error('audio_url is undefined')
    }
  }
  else if (ctx.message.document) {
    ctx.reply('You sent a document.')
  }
  else if (ctx.message.video) {
    ctx.reply('You sent a video.')
  }
  else if (ctx.message.video_note) {
    ctx.reply('You sent a video note.')
  }
  else if (ctx.message.voice) {
    // const voice = ctx.msg.voice

    // const duration = voice.duration // in seconds
    // await ctx.reply(`Your voice message is ${duration} seconds long.`)

    // const fileId = voice.file_id
    // await ctx.reply("The file identifier of your voice message is: " + fileId)

    // const file = await ctx.getFile() // valid for at least 1 hour
    // const path = file.file_path // file path on Bot API server
    // await ctx.reply("Download your own file again: " + path)

    ctx.reply('You sent a voice message.')
  }
  else if (ctx.message.sticker) {
    ctx.reply('You sent a sticker.')
  }
  else {
    ctx.reply('Unknown file type or no file sent.')
  }
})

export { composer as anyFeature }
