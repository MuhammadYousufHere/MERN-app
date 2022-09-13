import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';
const API_URL = 'http://localhost:8080/api/posts';

const initialState = {
  post: null,
  posts: [],
  error: null,
  loading: true,
  success: false
};

// get all posts
export const getAllUserPost = createAsyncThunk(API_URL, async () => {
  return await postService.getAllPosts();
});

// create a post
export const createPost = createAsyncThunk(API_URL + '/', async (post) => {
  return await postService.createAPost(post)
})

// like post
export const likePost = createAsyncThunk(API_URL + '/like', async (postId) => {
  return await postService.likePost(postId)
})

// unlike post
export const unlikePost = createAsyncThunk(API_URL + '/unlike', async (postId) => {
  return await postService.unlikePost(postId)
})

// comment on post
export const commentOnPost = createAsyncThunk(API_URL + '/comment/:id', async (state) => {

  return await postService.commentOnPost(state)
})

// delete post
export const deletePost = createAsyncThunk(API_URL + '/:postID', async (PostID) => {
  return await postService.deleteAPost(PostID)
})

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    refreshPost: (state) => {
      state.loading = true;
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    increaseCount(state, action) {
      state.count = state.count + 1
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllUserPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllUserPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(createPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(deletePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
        state.success = false

      })
      .addCase(commentOnPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true
      })
      .addCase(commentOnPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
        state.success = false

      })
  },
});

export const postReducer = postSlice.reducer;
