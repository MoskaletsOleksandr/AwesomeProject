import { createSlice } from '@reduxjs/toolkit';
import { getAllPostsThunk } from './thunks';

const initialState = {
  allPosts: [],
};

const handleGetAllPostsFulfilled = (state, { payload }) => {
  state.allPosts = payload;
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPostsThunk.fulfilled, handleGetAllPostsFulfilled);
    //   .addCase(loginUserThunk.fulfilled, handleLoginUserFulfilled)
    //   .addCase(logoutUserThunk.fulfilled, handleLogoutUserFulfilled);
  },
});

export const postsReducer = postsSlice.reducer;
