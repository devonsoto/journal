import SidePanel from '@/components/sidePanel'

import { getTotalEntries } from '@/utils/api'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashBoardLayout = async ({ children }) => {
  const res = await getTotalEntries()

  return (
    <div className="flex h-screen w-screen">
      <SidePanel count={res} />
      <div className="flex flex-1">{children}</div>
    </div>
  )
}

export default DashBoardLayout
