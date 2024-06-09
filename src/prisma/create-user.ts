import type { User } from '@prisma/client'
import { prisma } from './index.js'

interface CreateUserInput {
  telegramId: number
  username: string
}

export async function createOrFindUser(data: CreateUserInput): Promise<User | null> {
  try {
    let user = await prisma.user.findUnique({
      where: {
        telegramId: data.telegramId,
      },
    })
    console.log(`User: ${user}`)

    if (!user) {
      user = await prisma.user.create({
        data: {
          telegramId: data.telegramId,
          username: data.username,
        },
      })
    }
    console.log(`User: ${user}`)

    return user
  }
  catch (error) {
    console.error('Error creating or finding user:', error)
    throw error
  }
  finally {
    await prisma.$disconnect()
  }
}
