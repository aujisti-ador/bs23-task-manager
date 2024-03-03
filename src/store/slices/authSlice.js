import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLogin } from '../../api/fetchApi';

//  async thunk for the login action
export const loginAsync = createAsyncThunk('auth/loginAsync', async (credentials, { dispatch }) => {
    try {
        const response = await fetchLogin(credentials);
        dispatch(clearError())
        return response.username;
    } catch (error) {
        // Handle error, dispatch an error action, etc.
        console.error('Login failed:', error.message);
        throw error;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        username: null,
        loading: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.username = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.username = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.username = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },

});

export const { loginSuccess, logout, clearError } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
