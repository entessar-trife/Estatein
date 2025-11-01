import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref } from "firebase/database";
import { db } from "../../firebaseConfig";

export const createFetchThunk = <T>(
  name: string,
  path: string,
  transform?: (data: any, id: string) => T
) =>
  createAsyncThunk(`${name}/fetch`, async (_, { rejectWithValue }) => {
    try {
      const snapshot = await get(ref(db, path));
      if (!snapshot.exists()) return [];

      const data = snapshot.val();
      const items = Object.keys(data).map((id) => {
        const item = data[id];
        return transform ? transform(item, id) : { id, ...item };
      });

      return items as T[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  });