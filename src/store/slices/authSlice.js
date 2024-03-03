import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        username: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.username = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.username = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
