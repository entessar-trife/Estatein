import { createSlice, type Draft, type SliceCaseReducers } from "@reduxjs/toolkit";
import { genericListener } from "../../utlis/firebaseListeners/genericListener";
import type { AppDispatch } from "../store";

export interface GenericState<T> {
  items: T[];
  visibleItems: T[];
  loading: boolean;
  error: string | null;
  itemsPerPage: number;
  currentPage: number;
}

interface CreateGenericSliceOptions<T, R, State> {
  name: string;
  path: string;
  transform?: (item: T, id: string) => R;
  itemsPerPage?: number;
  reducers?: SliceCaseReducers<State & GenericState<R>>;
  extraInitialState?: Partial<State & GenericState<R>>;
}

export const createGenericSlice = <T, R, State = {}>({
  name,
  path,
  transform,
  itemsPerPage = 3,
  reducers: customReducers,
  extraInitialState = {},
}: CreateGenericSliceOptions<T, R, State>) => {
  const initialState: GenericState<R> & State = {
    items: [],
    visibleItems: [],
    loading: true,
    error: null,
    itemsPerPage,
    currentPage: 1,
    ...extraInitialState,
  } as GenericState<R> & State;

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      setItems: (state, action: { payload: R[] }) => {
        state.loading = false;
        state.items = action.payload as Draft<R>[];
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        state.visibleItems = state.items.slice(startIndex, endIndex);
      },
      paginate: (state, action: { payload: number }) => {
        const page = action.payload;
        const startIndex = (page - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        state.currentPage = page;
        state.visibleItems = state.items.slice(startIndex, endIndex);
      },
      ...customReducers,
    },
  });

  const startListening = (dispatch: AppDispatch) => {
    return genericListener<T, R>(path, transform, (items) => {
      dispatch(slice.actions.setItems(items));
    });
  };

  return { slice, actions: slice.actions, startListening };
};
