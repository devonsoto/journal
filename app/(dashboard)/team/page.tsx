import TeamDropdown from '@/components/teamDropdown'

import { getTeam, getTeams } from '@/utils/team'

const Team = async () => {
  // const teams = getTeams()

  const myTeam = await getTeam()
  const teams = await getTeams()

  return (
    <div className=" p-10">
      <div className="mb-6">pick your EPL team here</div>
      <TeamDropdown name={myTeam?.name || 'Select a team'} teams={teams} />
    </div>
  )
}

export default Team
