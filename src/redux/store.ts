import { configureStore } from "@reduxjs/toolkit"
import faqsReducer from "./slices/faqsSlice"
import achievementReducer from "./slices/achievementSlice"
import teamReducer from "./slices/teamSlice"
import officesReducer from "./slices/ourOfficesSlice"
import propertiesReducer from "./slices/propertiesSlice"
import testimonialsReducer from "./slices/testimonialsSlice"
import themeReducer from "./slices/themeSlice"
import bannerReducer from "./slices/bannerSlice"
import clientsReducer from "./slices/clientsSlice"
import stepsReducer from "./slices/stepsSlice"
import valuesReducer from "./slices/valueSlice"
import pricingReducer from "./slices/pricingSlice";
import experienceReducer from "./slices/experienceSlice"
import footerLinksReducer from "./slices/footerLinksSlice"
import contactLinksReducer from "./slices/contactSlice";
import outboundMailer from "./slices/createEmailSlice.ts";


const store: any = configureStore({
  reducer: {
    theme: themeReducer,
    faqs: faqsReducer,
    achievements: achievementReducer,
    properties: propertiesReducer,
    team: teamReducer,
    testimonials: testimonialsReducer,
    offices: officesReducer,
    banner: bannerReducer,
    clients: clientsReducer,
    values: valuesReducer,
    pricing: pricingReducer,
    experience: experienceReducer,
    footerLinks: footerLinksReducer,
    contactLinks: contactLinksReducer,
    outboundMailer,
    steps: stepsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
