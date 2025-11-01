import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CommonCardProps } from "../../types/CommonCard";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebaseConfig";

type ContactState = {
    cards: CommonCardProps[];
    loading: boolean;
};

const initialState: ContactState = {
    cards: [],
    loading: true,
};

export const listenToCardData = createAsyncThunk(
    "contactLinks/listenToCardData",
    async (_, thunkAPI) => {
        const { dispatch } = thunkAPI;
        let contactCards: CommonCardProps[] = [];
        let socialLinksCards: CommonCardProps[] = [];

        const updateIfReady = () => {
            if (contactCards.length && socialLinksCards.length) {
                dispatch(setCardData([...contactCards, ...socialLinksCards]));
                dispatch(setLoading(false));
            }
        };

        const contactRef = ref(db, "locations");
        onValue(contactRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const firstItem = Object.values(data)[0];
                contactCards = transformContactData(firstItem);
                updateIfReady();
            }
        });

        const socialRef = ref(db, "socialLinks");
        onValue(socialRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                socialLinksCards = transformSocialData(Object.values(data));
                updateIfReady();
            }
        });
    }
);

export const transformContactData = (contactData: any): CommonCardProps[] => {
    return [
        {
            cardTitle: contactData.email || "No Email",
            cardImg: "/assets/icons/CardUnderHero/email.svg",
            HeadingTag: "a",
            titleLink: `mailto:${contactData.email}`,
        },
        {
            cardTitle: contactData.phone || "No Phone",
            cardImg: "/assets/icons/CardUnderHero/phone.svg",
            HeadingTag: "a",
            titleLink: `tel:${contactData.phone}`,
        },
        {
            cardTitle: contactData.branch || "No Branch",
            cardImg: "/assets/icons/CardUnderHero/location.svg",
            HeadingTag: "a",
            titleLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactData.branch)}`,
        },
    ];
};

export const transformSocialData = (socialData: any): CommonCardProps[] => {
    const linkedin = socialData.find((s: any) => s.platform.toLowerCase() === "linkedin");
    const facebook = socialData.find((s: any) => s.platform.toLowerCase() === "facebook");
    const instagram = socialData.find((s: any) => s.platform.toLowerCase() === "instagram");

    return [
        {
            cardImg: "assets/icons/CardUnderHero/estatein.svg",
            HeadingTag: "a",
            links: [
                {
                    title: instagram?.platform || "No Instagram",
                    href: instagram?.url || "#",
                },
                {
                    title: linkedin?.platform || "No LinkedIn",
                    href: linkedin?.url || "#",
                },
                {
                    title: facebook?.platform || "No Facebook",
                    href: facebook?.url || "#",
                },
            ],
        },
    ];
};


const contactLinksSlice = createSlice({
    name: "contactLinks",
    initialState,
    reducers: {
        setCardData: (state, action: PayloadAction<CommonCardProps[]>) => {
            state.cards = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setCardData, setLoading } = contactLinksSlice.actions;
export default contactLinksSlice.reducer;
