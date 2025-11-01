import { createGenericSlice } from "./createGenericSlice";
import type { Client } from "../types/client";

const { slice, startListening } = createGenericSlice<Client, Client>({
  name: "clients",
  path: "clients",
  itemsPerPage: 3,
});

export const fetchClients = startListening;
export default slice.reducer;
