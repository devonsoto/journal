// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const teams = [
  { name: 'Arsenal', color: '#EF0107' },
  { name: 'Aston Villa', color: '#95BFE5' },
  { name: 'Bournemouth', color: '#D71920' }, //
  { name: 'Brentford', color: '#F90101' },
  { name: 'Brighton & Hove Albion', color: '#0057B8' },
  { name: 'Burnley', color: '#6C1D45' },
  { name: 'Chelsea', color: '#034694' },
  { name: 'Crystal Palace', color: '#1B458F' },
  { name: 'Everton', color: '#003399' },
  { name: 'Fulham', color: '#FFF200' }, //
  { name: 'Luton Town', color: '#FF6600' },
  { name: 'Liverpool', color: '#C8102E' },
  { name: 'Manchester City', color: '#6CABDD' },
  { name: 'Manchester United', color: '#DA291C' },
  { name: 'Newcastle United', color: '#241F20' },
  { name: 'Nottingham Forest', color: '#FF0000' },
  { name: 'Sheffield United', color: '#FBEE23' },
  { name: 'Tottenham Hotspur', color: '#132257' },
  { name: 'West Ham United', color: '#7A263A' },
  { name: 'Wolverhampton Wanderers', color: '#FDB913' },
]

async function main() {
  await prisma.team.createMany({
    data: [...teams],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
