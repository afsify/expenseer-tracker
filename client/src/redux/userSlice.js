import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authorized: false,
  },
  reducers: {
    login(state) {
      state.authorized = true;
    },
    logout(state) {
      state.authorized = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
