import type { RootState } from "../../redux/store"

export const selectOfficesState = (state: RootState) =>
  state.offices ?? {
    items: [],
    loading: true,
    error: null,
    activeTab: "all" as const,
  }

export const selectFilteredOffices = (state: RootState) => {
  const offices = state.offices?.items ?? []
  const activeTab = state.offices?.activeTab ?? "all"

  if (activeTab === "all") return offices
  return offices.filter((o: any) => o.category === activeTab)
}
