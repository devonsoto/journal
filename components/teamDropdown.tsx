'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

import { createTeam } from '@/utils/team'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const teams = [
  { name: 'Arsenal', color: '#EF0107' },
  { name: 'Aston Villa', color: '#95BFE5' },
  { name: 'Brentford', color: '#F90101' },
  { name: 'Brighton & Hove Albion', color: '#0057B8' },
  { name: 'Burnley', color: '#6C1D45' },
  { name: 'Chelsea', color: '#034694' },
  { name: 'Crystal Palace', color: '#1B458F' },
  { name: 'Everton', color: '#003399' },
  { name: 'Leeds United', color: '#FFCD00' },
  { name: 'Leicester City', color: '#003090' },
  { name: 'Liverpool', color: '#C8102E' },
  { name: 'Manchester City', color: '#6CABDD' },
  { name: 'Manchester United', color: '#DA291C' },
  { name: 'Newcastle United', color: '#241F20' },
  { name: 'Norwich City', color: '#FFF200' },
  { name: 'Southampton', color: '#D71920' },
  { name: 'Tottenham Hotspur', color: '#132257' },
  { name: 'Watford', color: '#FBEE23' },
  { name: 'West Ham United', color: '#7A263A' },
  { name: 'Wolverhampton Wanderers', color: '#FDB913' },
]

interface Props {
  name: string
}

const TeamDropdown = (name: string) => {
  console.log('name', name)
  const [team, setTeam] = useState('name')

  const handleOnClick = async (team) => {
    // do things here

    const data = await createTeam(team)
    console.log('data', data.name)
    setTeam(data.name)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {team}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {teams.map((team) => (
              <Menu.Item key={team.name}>
                {({ active }) => (
                  <p
                    onClick={() => handleOnClick(team)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {team.name}
                  </p>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default TeamDropdown
