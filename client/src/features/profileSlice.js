import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileService from './profileService';

const API_URL = 'http://localhost:8080/api/profile/';

const initialState = {
    profile: null,
    profiles: [],
    repo: null,
    loading: true,
    error: {},
};

export const getCurrentUser = createAsyncThunk(API_URL + 'me', async () => {
    return await profileService.getCurrentProfile();
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
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.profile = null;
            });
    },
});
export const profileReducer = profileSlice.reducer;
// export const {} = profileSlice.actions;
