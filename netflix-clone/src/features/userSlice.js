import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux acts like a global store for our application. We can and may need to access the 'user' variable anywhere in the app
 * so redux helps with that
 */

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  // two actions login and logout defined below help us intereact with the user space in
  // the global store.
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// Getting values stored inside the store and use it. Done thru selectors.
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
