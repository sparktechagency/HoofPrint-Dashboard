import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   token: localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user")).accessToken
//     : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//     logout: (state) => {
//       state.token = null;
//       localStorage.removeItem("user"); 
//     },
//   },
// });

// export const { setToken, logout } = authSlice.actions;
// export default authSlice.reducer;

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.warn("Failed to parse user from localStorage:", err);
    return null;
  }
};

const initialState = {
  token: getUserFromStorage()?.accessToken || null,
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
