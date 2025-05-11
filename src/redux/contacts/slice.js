import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from './operations';
import { logout } from '../auth/operations';

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      // Получение всех контактов
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })

      // Добавление нового контакта
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })

      // Удаление контакта
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload,
        );
      })

      // 🔄 Обновление контакта
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id,
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })

      // Очистка при выходе
      .addCase(logout.fulfilled, state => {
        state.contacts = [];
        state.isLoading = false;
      })

      // Обработка загрузки
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          updateContact.pending,
        ),
        state => {
          state.error = null;
          state.isLoading = true;
        },
      )

      // Завершение загрузки
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled,
          updateContact.fulfilled,
        ),
        state => {
          state.isLoading = false;
        },
      )

      // Обработка ошибок
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          updateContact.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const contactsReducer = slice.reducer;
