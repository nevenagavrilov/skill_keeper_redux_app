import { configureStore } from "@reduxjs/toolkit";
import profilesReducer from '../features/profiles/profilesSlice';
import skillssReducer from '../features/skills/skillsSlice';


export const store = configureStore({
    reducer: {
        profiles: profilesReducer,
        skills: skillssReducer
    }
})