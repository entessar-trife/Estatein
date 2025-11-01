import type { ExperienceSectionCardProps } from "../../types/Experience";
import { createGenericSlice } from "./createGenericSlice";

const { slice, startListening } = createGenericSlice<ExperienceSectionCardProps, ExperienceSectionCardProps>({
  name: "steps",
  path: "steps",
  itemsPerPage: 6,
});

export const fetchSteps = startListening;
export default slice.reducer;