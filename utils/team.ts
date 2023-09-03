import { createURL } from './api'


export const createTeam = async (content) => {

  console.log('create team', content)

  const res = await fetch(
    new Request(createURL(`/api/team`), {
      method: 'POST',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    console.log('res ok')
    const data = await res.json()
    return data.data
  }
}