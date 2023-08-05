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
  },
});

export const postsReducer = postsSlice.reducer;
