import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()

  const href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-6">The Premier League Journal app.</h1>
        <p className="text-2xl text-white/60 mb-6">
          {
            'The Premier league is starting.. After every game you can write your thoughts and feelings. Whether your team scores in the 90+10 minute or loses 7-0. Use AI to analyze your journals and track how your team affects you.'
          }
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              {userId ? 'Log In' : 'Get Started'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
