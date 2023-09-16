import HistoryChart from '@/components/historyChart'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkID()

  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce((acc, cur) => acc + cur.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { analyses, avg }
}

const History = async () => {
  const { analyses, avg } = await getData()

  return (
    <div className="flex flex-col w-full">
      <div>{`Avg. Sentiment ${avg}`}</div>
      <HistoryChart data={analyses} />
    </div>
  )
}

export default History
