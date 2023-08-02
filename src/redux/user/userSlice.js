import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk, logoutUserThunk, registerUserThunk } from './thunks';

const initialState = {
  login: null,
  email: null,
  id: null,
  token: null,
};

const handleRegisterUserFulfilled = (state, { payload }) => {
  state.login = payload.displayName;
  state.email = payload.userEmail;
  state.id = payload.uid;
  state.token = payload.accessToken;
};

const handleLoginUserFulfilled = (state, { payload }) => {
  state.login = payload.displayName;
  state.email = payload.userEmail;
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
      .addCase(loginUserThunk.fulfilled, handleLoginUserFulfilled)
      .addCase(logoutUserThunk.fulfilled, handleLogoutUserFulfilled);
  },
});

export const userReducer = userSlice.reducer;
