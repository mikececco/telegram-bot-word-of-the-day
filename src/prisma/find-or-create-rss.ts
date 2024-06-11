// import type { User } from '@prisma/client'
// import { prisma } from './index.js'

// interface CreateRSSItemInput {
//   link: string
//   title: string
// }

// export async function findOrCreateRss(data: CreateRSSItemInput): Promise<RSSItem | null> {
//   let rssItem: RSSItem | null = null // Declare the rssItem variable
//   try {
//     const existingItem = await prisma.rSSItem.findFirst({ where: { link: data.link } })

//     if (!existingItem) {
//       rssItem = await prisma.rSSItem.create({
//         data: {
//           link: data.link,
//           title: data.title,
//           // Assuming you have other fields in your RSSItem model
//           // You should include them here accordingly
//         },
//       })
//       console.log(`RSS item created: ${rssItem}`)
//     }

//     else {
//       console.log(`RSS item already exists: ${existingItem}`)
//       rssItem = existingItem
//     }

//     return rssItem // Return rssItem inside the try block
//   }

//   catch (error) {
//     console.error('Error creating or finding RSS item:', error)
//     throw error
//   }

//   finally {
//     await prisma.$disconnect() // Disconnect Prisma outside the try-catch block
//   }
// }
console.log('HELLO')
