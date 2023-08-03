import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../config';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async ({ email, password, login, downloadURL }, { rejectWithValue }) => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = data;

      await updateProfile(user, {
        displayName: login,
        photoURL: downloadURL,
      });

      const {
        displayName,
        email: userEmail,
        uid,
        accessToken,
        photoURL,
      } = user;
      const userData = { displayName, userEmail, uid, accessToken, photoURL };

      return userData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      const { user } = data;
      const {
        displayName,
        email: userEmail,
        uid,
        accessToken,
        photoURL,
      } = user;
      const userData = { displayName, userEmail, uid, accessToken, photoURL };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
