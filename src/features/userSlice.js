import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  user: null,
  authReady: false,
};


const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    login: (state, {payload}) => {
      state.user = payload;
    },
    logout: (state) => {
        state.user = null;
    },
    isAuthReady: (state) => {
        state.authReady = true;
    },
  },
}); 

export const { login, logout, isAuthReady } = userSlice.actions;
export default userSlice.reducer;