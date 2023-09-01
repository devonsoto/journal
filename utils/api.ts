// will give us the full url
const createURL = (path: string) => {
  return window.location.origin + path
}

export const updateEntry = async (id, content) => {
  console.log('update entry', id, content)
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
