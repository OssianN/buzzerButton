import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  usersList: [],
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setBuzzed(state, action) {
      const newList = state.usersList.map((user) =>
        user.id === action.payload ? { ...user, buzzed: true } : user
      );
      state.usersList = newList;
    },
    setUsersList(state, action) {
      state.usersList = action.payload;
    },
    setLoadingTrue(state) {
      state.isLoading = true;
    },
    setLoadingFalse(state) {
      state.isLoading = false;
    },
    setError(state, action) {
      state.isError = action.payload;
    },
  },
});

export const {
  setUser,
  setUsersList,
  setBuzzed,
  setLoadingTrue,
  setLoadingFalse,
  setError,
} = userSlice.actions;
export default userSlice.reducer;
