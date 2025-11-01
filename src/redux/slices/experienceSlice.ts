import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";

export type ExperienceItem = {
    step: string;
    title: string;
    description: string;
};

export type ExperienceState = {
    items: ExperienceItem[];
    loading: boolean;
    error: string | null;
};

const initialState: ExperienceState = {
    items: [],
    loading: true,
    error: null,
};

const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {
        setExperience: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setExperience, setLoading, setError } = experienceSlice.actions;
export default experienceSlice.reducer;

export const subscribeExperience = () => (dispatch: any) => {
    dispatch(setLoading(true));

    const experienceRef = ref(db, "steps");

    onValue(
        experienceRef,
        (snapshot) => {
            if (snapshot.exists()) {
                const dataObj = snapshot.val();
                const dataArray: ExperienceItem[] = Object.values(dataObj).map(
                    (value: any) => ({
                        step: value.stepNum || 0,
                        title: value.title || "",
                        description: value.description || "",
                    })
                );
                
                dispatch(setExperience(dataArray));
            } else {
                dispatch(setExperience([]));
            }
        },
        (error) => {
            dispatch(setError(error.message));
        }
    );
};
