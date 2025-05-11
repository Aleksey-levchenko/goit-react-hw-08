import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  phone: '',
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilterName: (state, action) => {
      state.name = action.payload;
    },
    changeFilterPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const { changeFilterName, changeFilterPhone } = slice.actions;
export const filtersReducer = slice.reducer;
