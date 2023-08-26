// This is all the setup we do if someone is a new user
// set up stripe account, etc

import { currentUser } from '@clerk/nextjs'
import { prisma } from '@/utils/db'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return (
    <div>
      <div>...loading</div>
    </div>
  )
}

export default NewUser
