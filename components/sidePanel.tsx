'use client'

import { FolderIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useState } from 'react'

const navigation = [
  { name: 'Login', href: '/', icon: HomeIcon },
  {
    name: 'Journal',
    href: '/journal',
    icon: HomeIcon,
    count: '5',
  },
  { name: 'Team', href: '/team', icon: UsersIcon, current: false },
  {
    name: 'History',
    href: '/history',
    icon: FolderIcon,
    count: '12',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SidePanel = ({ count }) => {
  const [page, setPage] = useState('home')

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 max-w-[250px]">
      <div className="flex h-16 shrink-0 items-center justify-between">
        <p className="text-gray-400 text-lg">EPL Journal</p>
        <UserButton />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    onClick={() => setPage(item.name)}
                    href={item.href}
                    className={classNames(
                      page === item.name
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.name === 'Journal' ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                        aria-hidden="true"
                      >
                        {count}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SidePanel
