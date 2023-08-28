// api/journal

import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkID()

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about you day here',
    },
  })

  // we can tell nextjs to revalidate this page

  revalidatePath('/journal')

  //   easier to send an object back named data as a convention
  return NextResponse.json({ data: entry })
}
