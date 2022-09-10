import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileService from './profileService';

const API_URL = 'http://localhost:8080/api/profile';

const initialState = {
    profile: null,
    profiles: [],
    exists: false,
    repo: null,
    loading: true,
    error: {},
};
// get current user profile
export const getCurrentUser = createAsyncThunk(API_URL + '/me', async () => {
    return await profileService.getCurrentProfile();
});

// create current user profile
export const createUserProfile = createAsyncThunk(API_URL, async (userData) => {
    return await profileService.createProfile(userData);
});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.exists = action.payload.skills ? true : false;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.profile = null;
                state.exists = false;
            })
            .addCase(createUserProfile.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.exists = true;
                state.profile = action.payload;
            })
            .addCase(createUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.profile = null;
                state.exists = false;
            });
    },
});
export const profileReducer = profileSlice.reducer;
// export const {} = profileSlice.actions;
