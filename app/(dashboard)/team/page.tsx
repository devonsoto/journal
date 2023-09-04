import TeamDropdown from '@/components/teamDropdown'

import { getTeam } from '@/utils/team'

const Team = async () => {
  // const teams = getTeams()

  const myTeam = await getTeam()

  console.log(myTeam?.team?.name)

  console.log('myTeam', myTeam?.team?.name)

  return (
    <div className=" p-10">
      <div className="mb-6">pick your EPL team here</div>
      <TeamDropdown name={'hi'} />
    </div>
  )
}

export default Team
