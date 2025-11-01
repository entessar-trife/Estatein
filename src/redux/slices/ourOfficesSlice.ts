import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { OfficeLocation } from "../types/OfficeLocation"

type OfficesState = {
  items: OfficeLocation[]
  loading: boolean
  error: string | null
  activeTab: "all" | "regional" | "international"
}

const initialState: OfficesState = {
  items: [],
  loading: true,
  error: null,
  activeTab: "all",
}

const officesSlice = createSlice({
  name: "offices",
  initialState,
  reducers: {
    setOffices: (state, action: PayloadAction<OfficeLocation[]>) => {
      state.items = action.payload ?? []
      state.loading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    setActiveTab: (state, action: PayloadAction<OfficesState["activeTab"]>) => {
      state.activeTab = action.payload
    },
  },
})

export const { setOffices, setLoading, setError, setActiveTab } =
  officesSlice.actions
export default officesSlice.reducer
