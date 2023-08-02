import { async } from '@firebase/util';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../../api/getPostsFromFirebase';

export const getAllPostsThunk = createAsyncThunk(
  'posts/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPosts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
