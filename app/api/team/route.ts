import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

import { NextResponse } from 'next/server'

export const PUT = async (req) => {
  const user = await getUserByClerkID()
  const { content } = await req.json()

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      team: {
        connect: {
          ...content,
        },
      },
    },
  })

  return NextResponse.json({ data: content })
}

export const GET = async () => {
  const user = await getUserByClerkID()

  const team = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      team: true,
    },
  })

  return NextResponse.json({ data: team })
}
