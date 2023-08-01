import { createSlice } from '@reduxjs/toolkit';
import { logoutUserThunk, registerUserThunk } from './thunks';

const initialState = {
  login: null,
  email: null,
  id: null,
  token: null,
};

const handleRegisterUserFulfilled = (state, { payload }) => {
  console.log(payload);
  state.login = payload.displayName;
  state.email = payload.email;
  state.id = payload.uid;
  state.token = payload.accessToken;
};

const handleLogoutUserFulfilled = (state, { payload }) => {
  state.login = null;
  state.email = null;
  state.id = null;
  state.token = null;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.fulfilled, handleRegisterUserFulfilled)
      .addCase(logoutUserThunk.fulfilled, handleLogoutUserFulfilled);
    // .addCase(registerUserThunk.rejected, handleRejected);
  },
  // reducers: {
  //   setUser(state, action) {
  //     // console.log(action);
  //     state.login = action.payload.login;
  //     state.email = action.payload.email;
  //     state.token = action.payload.token;
  //     state.id = action.payload.id;
  //   },
  //   removeUser(state) {
  //     state.login = null;
  //     state.email = null;
  //     state.token = null;
  //     state.id = null;
  //   },
  // },
});

export const { setUser, removeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
// console.log(userReducer);

// export const { actions: userActions, reducer: userReducer } = userSlice;
