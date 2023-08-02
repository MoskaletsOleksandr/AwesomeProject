import { async } from '@firebase/util';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addPostsToFirebase } from '../../api/addPostsToFirebase';
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

export const createNewPostThunk = createAsyncThunk(
  'posts/createPost',
  async (body, { rejectWithValue, dispatch }) => {
    try {
      await addPostsToFirebase(body);
      dispatch(getAllPostsThunk());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
