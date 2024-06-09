import Parser from 'rss-parser'
// import { findOrCreateRss } from '#root/prisma/find-or-create-rss.js'
import type { Context } from '#root/bot/context.js'

const parser = new Parser()

export async function fetchRSSFeed(
  ctx: Context,
) {
  try {
    const feed = await parser.parseURL('https://www.merriam-webster.com/wotd/feed/rss2')
    const latestItem = feed.items[0] // Get the latest item from the feed

    if (latestItem.title) {
      // Do something with the latest item, such as logging its title and link
      console.log('Latest item title:', latestItem.title)
      console.log('Latest item link:', latestItem.link)

      return ctx.reply(latestItem.title)
    }

    else {
      console.error('Latest item title is undefined')
    }
    // return latestItem // Return the latest item for further processing if needed
  }

  catch (error) {
    console.error('Error fetching RSS feed:', error)
  }
}
