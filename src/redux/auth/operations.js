import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const goitAPI = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

const setAuthHeader = token => {
  goitAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthHeader = () => {
  goitAPI.defaults.headers.common.Authorization = ``;
};

const ensureAuthHeader = thunkAPI => {
  const token = thunkAPI.getState().auth.token;
  if (!token) throw new Error('No auth token available');
  setAuthHeader(token);
};

export const register = createAsyncThunk(
  'auth/register',
  async (body, thunkAPI) => {
    try {
      const response = await goitAPI.post('users/signup', body);
      setAuthHeader(response.data.token);
      toast.success('You have successfully registered!');
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        toast.error('Registration error!');
        return thunkAPI.rejectWithValue(error.response.data.errors);
      }

      toast.error('Server error!');
      return thunkAPI.rejectWithValue(error.massage);
    }
  },
);

export const login = createAsyncThunk('auth/login', async (body, thunkAPI) => {
  try {
    const response = await goitAPI.post('users/login', body);
    setAuthHeader(response.data.token);
    toast.success('You have logged in successfully.');
    return response.data;
  } catch (error) {
    toast.error('Login failed!');
    return thunkAPI.rejectWithValue(error.massage);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await goitAPI.post('users/logout');
    removeAuthHeader();
    toast.success('Logged out successfully!');
  } catch (error) {
    toast.error('Logout failed!');
    return thunkAPI.rejectWithValue(error.massage);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      ensureAuthHeader(thunkAPI);
      const response = await goitAPI.get('users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  },
);
