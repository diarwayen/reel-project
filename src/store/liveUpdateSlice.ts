import { createSlice } from '@reduxjs/toolkit';

interface LiveUpdateState {
  enabled: boolean;
}

const initialState: LiveUpdateState = {
  enabled: true,
};

const liveUpdateSlice = createSlice({
  name: 'liveUpdate',
  initialState,
  reducers: {
    toggleLiveUpdate(state) {
      state.enabled = !state.enabled;
    },
    enableLiveUpdate(state) {
      state.enabled = true;
    },
    disableLiveUpdate(state) {
      state.enabled = false;
    },
  },
});

export const { toggleLiveUpdate, enableLiveUpdate, disableLiveUpdate } = liveUpdateSlice.actions;
export default liveUpdateSlice.reducer;