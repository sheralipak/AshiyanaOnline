import { createSlice } from '@reduxjs/toolkit'; // Import createSlice function from Redux Toolkit

const initialState = {
    user: null, // Initial value for user state
    token: null // Initial value for token state
};

// Create authSlice using createSlice function
export const authSlice = createSlice({
    name: 'auth', // Slice name
    initialState, // Initial state
    reducers: {
        // Reducer function for login action
        login(state, action) {
            localStorage.clear(); // Clear localStorage
            state.user = action.payload.others; // Set user state with payload
            state.token = action.payload.token; // Set token state with payload
        },
        // Reducer function for register action
        register(state, action) {
            localStorage.clear(); // Clear localStorage
            state.user = action.payload.others; // Set user state with payload
            state.token = action.payload.token; // Set token state with payload
        },
        // Reducer function for logout action
        logout(state) {
            state.user = null; // Reset user state to null
            state.token = null; // Reset token state to null
            localStorage.clear(); // Clear localStorage
        }
    },
});

// Export action creators
export const { login, register, logout } = authSlice.actions;

// Export reducer function
export default authSlice.reducer;
