import { getUserByClerkID } from './auth'
import { prisma } from './db'
import { revalidatePath } from 'next/cache'

export const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

// will give us the full url
export const createURL = (path: string) => {
  return window.location.origin + path
}

export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
      // body: JSON.stringify({}),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data // since we are always sending back an object with a data key
  }
}

export const deleteEntry = async (id) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), { method: 'DELETE' })
  )
  try {
    // TODO: There should be another way to do this
    revalidatePath('/journal')
  } catch (e) {
    console.log(e)
  }
}

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL('/api/question'), {
      method: 'POST',
      body: JSON.stringify({ question }),
      // body: JSON.stringify({}),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data // since we are always sending back an object with a data key
  }
}

export const getTotalEntries = async () => {
  const user = await getUserByClerkID()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  })

  return entries.length
}
