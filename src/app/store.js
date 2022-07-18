import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/home/authSlice";
import profilesReducer from '../features/profiles/profilesSlice';
import skillssReducer from '../features/skills/skillsSlice';


export const store = configureStore({
    reducer: {
        profiles: profilesReducer,
        skills: skillssReducer,
        auth: authReducer
    }
})