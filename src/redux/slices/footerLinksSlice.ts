import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";

export type SocialLink = {
    platform: string; 
    url: string;
};

type SocialState = {
    links: SocialLink[];
    loading: boolean;
};

const initialState: SocialState = {
    links: [],
    loading: true,
};

const socialSlice = createSlice({
    name: "social",
    initialState,
    reducers: {
        setSocialLinks: (state, action: PayloadAction<SocialLink[]>) => {
            state.links = action.payload;
            state.loading = false;
        },
        setSocialLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setSocialLinks, setSocialLoading } = socialSlice.actions;
export default socialSlice.reducer;

// Thunk for get data
export const fetchSocialLinks = () => (dispatch: any) => {
    dispatch(setSocialLoading(true));

    const socialRef = ref(db, "socialLinks");

    onValue(socialRef, (snapshot) => {
        const data = snapshot.val() || {};
        const list: SocialLink[] = Object.values(data) as SocialLink[];
        dispatch(setSocialLinks(list));
    });
};
