import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async ({ email, password, login }, { rejectWithValue }) => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = data;

      await updateProfile(user, {
        displayName: login, // name - це змінна, що містить ім'я користувача
        // photoURL: photo, // photo - це змінна, що містить URL фото користувача (опціонально)
      });

      return user;
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
