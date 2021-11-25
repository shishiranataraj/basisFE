import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user : null,
        token: null
    },
    reducers:{
        login: (state,action) => {
            state.user = action.payload;

        },
        logout: (state) => {
            state.user = null;
        },
         token: (state, action) => {
            state.token = action.payload;
         }
    }
})

export const {login, logout, token} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const setToken = (state) => state.user.token;
export default userSlice.reducer;