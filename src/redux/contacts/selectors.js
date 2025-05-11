import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter, selectPhoneFilter } from '../filters/selectors';

export const selectContacts = state => state.contacts.contacts;
export const selectLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter, selectPhoneFilter],
  (contacts, name, phone) => {
    return contacts.filter(contact => {
      const filteredByName = name
        ? contact.name.toLowerCase().includes(name.toLowerCase())
        : true;
      const filteredByPhone = phone ? contact.number.includes(phone) : true;

      return filteredByName && filteredByPhone;
    });
  },
);
