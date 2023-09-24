import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { baseUrl } from '@/utils/api'
import { redirect } from 'next/navigation'

export const DELETE = async (request, { params }) => {
  const user = await getUserByClerkID()

  const { id } = params

  const deleteEntry = await prisma.journalEntry.delete({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  })

  debugger
  console.log('deleteEntry', deleteEntry)

  if (deleteEntry) {
    return NextResponse.redirect(`${baseUrl}/journal`)
  }
}

export const PATCH = async (request, { params }) => {
  const user = await getUserByClerkID()
  const { content } = await request.json()

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

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updateEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updateEntry.id,
      ...analysis,
    },
    update: analysis,
  })

  return NextResponse.json({ data: { ...updateEntry, analysis: updated } })
}
