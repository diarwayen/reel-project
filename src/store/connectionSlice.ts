import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConnectionState {
  status: 'idle' | 'connecting' | 'connected' | 'error';
  url: string;
  password: string;
  connected: boolean;
  errorMessage: string;
}

const initialState: ConnectionState = {
  status: 'idle',
  url: 'ws://localhost:8080',
  password: '',
  connected: false,
  errorMessage: '',
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setConnectionStatus(state, action: PayloadAction<ConnectionState['status']>) {
      state.status = action.payload;
    },
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
      state.status = action.payload ? 'connected' : 'idle';
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      if (action.payload) {
        state.status = 'error';
      }
    },
  },
});

export const { setConnectionStatus, setUrl, setPassword, setConnected, setErrorMessage } = connectionSlice.actions;
export default connectionSlice.reducer;