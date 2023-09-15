'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  const onChange = (e) => {
    e.preventDefault()
    // do things here

    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={onChange}
          disabled={loading}
          type="text"
          placeholder="Ask a Question"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg mr-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-400 text-white px-4 py-2 text-lg rounded-lg "
        >
          Ask
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {response && <div>{response}</div>}
    </div>
  )
}

export default Question
