import TeamDropdown from '@/components/teamDropdown'

import { getTeam } from '@/utils/team'

const Team = async () => {
  // const teams = getTeams()

  const myTeam = await getTeam()

  console.log(myTeam?.name)

  console.log('myTeam', myTeam?.name)

  return (
    <div className=" p-10">
      <div className="mb-6">pick your EPL team here</div>
      <TeamDropdown name={myTeam?.name} />
    </div>
  )
}

export default Team
