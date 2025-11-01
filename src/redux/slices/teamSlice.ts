import { createGenericSlice } from "./createGenericSlice"
import type { Team } from "../types/team"

const { slice, startListening } = createGenericSlice<Team, Team>({
  name: "team",
  path: "team",
})

export const fetchTeams = startListening
export default slice.reducer
