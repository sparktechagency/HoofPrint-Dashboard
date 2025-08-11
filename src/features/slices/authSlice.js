import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).accessToken
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("user"); 
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
