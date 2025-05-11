import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// Создание экземпляра axios с базовым URL
export const goitAPI = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

// Установка заголовка авторизации
const setAuthHeader = token => {
  goitAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Проверка наличия токена перед запросом
const ensureAuthHeader = thunkAPI => {
  const token = thunkAPI.getState().auth.token;
  if (!token) throw new Error('No auth token available');
  setAuthHeader(token);
};

// Получение всех контактов
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      ensureAuthHeader(thunkAPI);
      const response = await goitAPI.get(`/contacts`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Добавление нового контакта
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (body, thunkAPI) => {
    try {
      ensureAuthHeader(thunkAPI);
      const response = await goitAPI.post(`/contacts`, body);
      toast.success('Contact added successfully!');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Удаление контакта
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      ensureAuthHeader(thunkAPI);
      await goitAPI.delete(`/contacts/${id}`);
      toast.success('Contact successfully deleted!');
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 🔄 Обновление существующего контакта
export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, name, number }, thunkAPI) => {
    try {
      ensureAuthHeader(thunkAPI);
      const response = await goitAPI.patch(`/contacts/${id}`, {
        name,
        number,
      });
      toast.success('Contact successfully updated!');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
