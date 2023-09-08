import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

import SidePanel from '@/components/sidePanel'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { getTotalEntries } from '@/utils/api'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: false },
  {
    name: 'Journal',
    href: '/journal',
    icon: HomeIcon,
    count: '5',
    current: true,
  },
  { name: 'Team', href: '/team', icon: UsersIcon, current: false },
  {
    name: 'History',
    href: '/history',
    icon: FolderIcon,
    count: '12',
    current: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
  { href: '/team', label: 'Team' },
]

const DashBoardLayout = async ({ children }) => {
  const res = await getTotalEntries()

  return (
    <div className="flex h-screen w-screen">
      <SidePanel count={res} />
      <div className="flex flex-1">{children}</div>
    </div>
  )
}

// import { UserButton } from '@clerk/nextjs'
// import Link from 'next/link'

// const DashBoardLayout = ({ children }) => {
//   const links = [
//     { href: '/', label: 'Home' },
//     { href: '/journal', label: 'Journal' },
//     { href: '/history', label: 'History' },
//     { href: '/team', label: 'Team' },
//   ]

//   return (
//     <div className="h-full w-full relative">
//       <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
//         <div className="text-3xl">EPL Journal</div>
//         <ul>
//           {links.map((link) => (
//             <li key={link.href} className="px-2 py-6 text-xl">
//               <Link href={link.href}>{link.label}</Link>
//             </li>
//           ))}
//         </ul>
//       </aside>
//       <div className="ml-[200px] h-full">
//         <header className="h-[60px] border-b border-black/10">
//           <div className="h-full w-full px-6 flex items-center justify-end">
//             <UserButton />
//           </div>
//         </header>
//         <div className="h-[calc(100vh-60px)]">{children}</div>
//       </div>
//     </div>
//   )
// }

export default DashBoardLayout
