import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Log } from '@/types/log';

interface LogsState {
  logs: Log[];
  selectedLog: Log | null;
}

const initialState: LogsState = {
  logs: [],
  selectedLog: null,
};

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<Log>) => {
      state.logs.push(action.payload);
    },
    clearLogs: (state) => {
      state.logs = [];
    },
    setSelectedLog: (state, action: PayloadAction<Log | null>) => {
      state.selectedLog = action.payload;
    },
  },
});

export const { addLog, clearLogs, setSelectedLog } = logsSlice.actions;
export default logsSlice.reducer;