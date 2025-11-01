import { createGenericSlice } from "./createGenericSlice";
import type { Value } from "../types/value";

const { slice, startListening } = createGenericSlice<Value, Value>({
  name: "values",
  path: "values",
  itemsPerPage: 4,
});

export const fetchValues = startListening;

export default slice.reducer;
