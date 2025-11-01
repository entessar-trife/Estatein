import { createSlice } from "@reduxjs/toolkit"
import type { Client } from "../types/client"

type TestimonialsState = {
  items: Client[]
  loading: boolean
  error: string | null
}

const initialState: TestimonialsState = {
  items: [],
  loading: true,
  error: null,
}

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    setTestimonials: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setTestimonials, setLoading, setError } =
  testimonialsSlice.actions

export default testimonialsSlice.reducer
