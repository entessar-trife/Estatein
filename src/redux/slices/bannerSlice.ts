import { createSlice } from "@reduxjs/toolkit";

interface BannerState {
  isVisible: boolean;
}

const initialState: BannerState = {
  isVisible: true,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    hideBanner: (state) => {
      state.isVisible = false;
    },
    showBanner: (state) => {
      state.isVisible = true;
    },
    setBannerVisibility: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});

export const { hideBanner, showBanner, setBannerVisibility } =
  bannerSlice.actions;
export default bannerSlice.reducer;
