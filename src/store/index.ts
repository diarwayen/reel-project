import { configureStore } from '@reduxjs/toolkit';
import logsReducer from './logsSlice';
import filtersReducer from './filtersSlice';
import liveUpdateReducer from './liveUpdateSlice';
import connectionReducer from './connectionSlice';

export const store = configureStore({
  reducer: {
    logs: logsReducer,
    filters: filtersReducer,
    liveUpdate: liveUpdateReducer,
    connection: connectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;