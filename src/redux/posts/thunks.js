import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateCommentsInPost } from '../../api/addComment';
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

export const createNewCommentThunk = createAsyncThunk(
  'posts/createComment',
  async ({ docId, comments }, { rejectWithValue, dispatch }) => {
    try {
      await updateCommentsInPost(docId, comments);
      dispatch(getAllPostsThunk());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
