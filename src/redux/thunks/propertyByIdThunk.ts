import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDatabase, ref, get } from "firebase/database"

export const fetchPropertyById = createAsyncThunk(
  "properties/fetchById",
  async (id: string) => {
    const db = getDatabase()
    const snapshot = await get(ref(db, `properties/${id}`))

    if (snapshot.exists()) {
      return { id, ...snapshot.val() }
    } else {
      throw new Error("Property not found")
    }
  }
)
