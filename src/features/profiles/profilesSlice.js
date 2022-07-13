import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PROFILES_URL = 'https://6195285474c1bd00176c6be7.mockapi.io/profiles';

const initialState = {
    profiles: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async () => {
    const response = await axios.get(PROFILES_URL)
    return response.data
})

export const addNewProfile = createAsyncThunk('profiles/addNewProfile', async (initialProfile) => {
    const response = await axios.post(PROFILES_URL, initialProfile)
    return response.data
})

export const updateProfile = createAsyncThunk(
    "profiles/updateProfile",
    async (initialProfile) => {
      const { id } = initialProfile;
      try {
        const response = await axios.put(`${PROFILES_URL}/${id}`, initialProfile);
        return response.data;
      } catch (err) {
        return err.message;
      }
    }
  );

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        deleteProfile: (state, action) => {
          const profileId = action.payload;
          state.profiles = state.profiles.filter((profile) => profile.id !== profileId);
          axios.delete(
            `${PROFILES_URL}/${profileId}`
          );
        },
      },
    extraReducers(builder) {
        builder
            .addCase(fetchProfiles.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.profiles = action.payload
            })
            .addCase(fetchProfiles.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewProfile.fulfilled, (state, action) => {
                state.profiles.push(action.payload)
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                  console.log("Update could not complete");
                  console.log(action.payload);
                  return;
                }
                const { id } = action.payload;
                const profiles = state.profiles.filter((profile) => profile.id !== id);
                state.profiles = [...profiles, action.payload];
              });
    }
})

export const selectAllProfiles = (state) => state.profiles.profiles;
export const getProfilesStatus = (state) => state.profiles.status;
export const getProfilesError = (state) => state.profiles.error;

export const selectProfileById = (state, profileId) =>
  state.profiles.profiles.find((profile) => profile.id === profileId);

export const { deleteProfile } = profilesSlice.actions;

export default profilesSlice.reducer