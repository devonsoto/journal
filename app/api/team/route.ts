import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

import { NextResponse } from 'next/server'


export const POST = async (req) => {


  const user = await getUserByClerkID()
  const data = await req.json()

  console.log(data)

  // const team = await prisma.team.create({
  //   data: {
  //     userId: user.id,
  //     ...team
  //   }
  // })



  return NextResponse.json({ data: data })



  // const team = await prisma.team.create({

  // })




}