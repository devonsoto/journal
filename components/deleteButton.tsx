'use client'

import { deleteEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const DeleteButton = ({ entryId }) => {
  const router = useRouter()
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      await deleteEntry(entryId)

      router.push('/journal')
    }
  }

  return <button onClick={handleDelete}>Delete</button>
}

export default DeleteButton
