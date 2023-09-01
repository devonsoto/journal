import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (request, { params }) => {
  const user = await getUserByClerkID()
  const { content } = await request.json()

  console.log('content-patch', content)

  const updateEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(updateEntry.content)

  console.log('analysis', analysis)

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updateEntry.id,
    },
    create: {
      entryId: updateEntry.id,
      ...analysis,
    },
    update: analysis,
  })

  return NextResponse.json({ data: { ...updateEntry, analysis: updated } })
}
