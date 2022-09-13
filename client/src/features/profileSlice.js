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
  success: false
};
// 
// admin ~ delete a user
export const deleteUser = createAsyncThunk(API_URL, async () => {
  return await profileService.deleteUserProfile()
})
// get all users profile
export const getAllUsers = createAsyncThunk(API_URL + '/', async () => {
  return await profileService.getAllProfiles();
});
// get user profile by id
export const getUserByID = createAsyncThunk(API_URL + '/user', async (userID) => {
  return await profileService.getUserProfileById(userID);
});

// get current user profile
export const getCurrentUser = createAsyncThunk(API_URL + '/me', async () => {
  return await profileService.getCurrentProfile();
});

// create current user profile
export const createUserProfile = createAsyncThunk(API_URL, async (userData) => {
  return await profileService.createProfile(userData);
});

// add current user experience
export const addUserExperience = createAsyncThunk(API_URL, async (userData) => {
  return await profileService.addUserExperiance(userData);
});

// delete current user experience
export const deleteUserExperience = createAsyncThunk(API_URL, async (expID) => {
  return await profileService.deleteUserExperiance(expID);
});

// add current user education
export const addUserEducation = createAsyncThunk(API_URL, async (userData) => {
  return await profileService.addUserEducation(userData);
});

// delete current user education
export const deleteUserEducation = createAsyncThunk(API_URL, async (eduID) => {
  return await profileService.deleteUserEducation(eduID);
});

// get user github repos

export const getUserGithubRepos = createAsyncThunk(API_URL + '/github', async (githubUsername) => {
  return await profileService.getUserGithubRepos(githubUsername)
})

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
        state.success = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.profile = null;
        state.exists = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;

      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
        state.success = true
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

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
      }).addCase(getUserGithubRepos.pending, (state) => {
        state.loading = true
      }).addCase(getUserGithubRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repo = action.payload;
      })
      .addCase(getUserGithubRepos.rejected, (state, action) => {
        state.repo = null;
      })
  },
});
export const profileReducer = profileSlice.reducer;
// export const {} = profileSlice.actions;
