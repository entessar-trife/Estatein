import { createGenericSlice } from "./createGenericSlice"
import type { Achievement } from "../types/achievement"

const { slice, startListening } = createGenericSlice<Achievement, Achievement>({
  name: "achievements",
  path: "achievements",
  itemsPerPage: 3,
})

export const fetchAchievements = startListening
export const { actions } = slice
export default slice.reducer
