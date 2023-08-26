import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUserByClerkID = async () => {
  const { userId } = await auth()

  //   the reason we are throwing a findUniqueOrThrow error is because we want to make sure that the user exists in the database.
  //   If the user does not exist, we want to throw an error. If the user does exist, we want to return the user object.
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  })

  return user
}
