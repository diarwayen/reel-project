import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  level: string;
  thread: string;
  file: string;
  caller: string;
  message: string;
}

const initialState: FiltersState = {
  level: '',
  thread: '',
  file: '',
  caller: '',
  message: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<{ key: keyof FiltersState; value: string }>) {
      state[action.payload.key] = action.payload.value;
    },
    clearFilters(state) {
      Object.keys(state).forEach((key) => {
        state[key as keyof FiltersState] = '';
      });
    },
  },
});

export const { setFilter, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;