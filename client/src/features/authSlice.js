import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { setAuth } from './authService';
//
const API_URl = 'http://localhost:8080';

// Get user from local storage

const token = JSON.parse(localStorage.getItem('token'));
// console.log(localStorage.token);
const initialState = {
    user: token ? token : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Register User
export const register = createAsyncThunk(
    API_URl + '/api/users',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// load user
// const loadUser =createAsyncThunk( async () => {
//     if (localStorage.token) {
//         setAuth(token);
//     }
//     try {
//       const res = await
//     } catch (error) {

//     }
// });
// login User
export const login = createAsyncThunk(
    API_URl + '/api/auth',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// logout user

export const logout = createAsyncThunk(API_URl, () => authService.logout());
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const authReducer = authSlice.reducer;
export const { reset } = authSlice.actions;
