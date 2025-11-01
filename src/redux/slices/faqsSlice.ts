import type { AppDispatch } from "../store";
import type { Faqs } from "../types/FAQ";
import { createGenericSlice } from "./createGenericSlice";

const { slice, startListening } = createGenericSlice<Faqs, Faqs>({
  name: "faqs",
  path: "faqs",
  itemsPerPage: 3,
});

export const fetchFaqs = () => (dispatch: AppDispatch) => {
  return startListening(dispatch);
};

export default slice.reducer;
export const faqsActions = slice.actions;