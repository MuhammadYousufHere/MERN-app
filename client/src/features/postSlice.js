import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';
const API_URL = 'http://localhost:8080/api/posts';

const initialState = {
    post: null,
    posts: [],
    error: null,
    loading: true,
};

export const getUserPost = createAsyncThunk(API_URL, async () => {
    return await postService.getPost();
});
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        refreshPost: (state) => {
            state.loading = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserPost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUserPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getUserPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const postReducer = postSlice.reducer;
