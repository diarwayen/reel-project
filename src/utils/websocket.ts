import { store } from '@/store';
import { addLog } from '@/store/logsSlice';
import { setConnected, setErrorMessage } from '@/store/connectionSlice';
import { parseLogLine } from './logParser';

let socket: WebSocket | null = null;

export function connectWebSocket(url: string, password?: string) {
  if (socket) socket.close();

  socket = new WebSocket(url);

  socket.onopen = () => {
    store.dispatch(setConnected(true));
    store.dispatch(setErrorMessage(''));
    if (password) {
      socket?.send(JSON.stringify({ type: 'auth', password }));
    }
  };

  socket.onmessage = (event) => {
    const parsed = parseLogLine(event.data);
    if (parsed) {
      const log = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...parsed,
      };
      store.dispatch(addLog(log));
    }
  };

  socket.onclose = () => {
    store.dispatch(setConnected(false));
  };

  socket.onerror = (error) => {
    store.dispatch(setErrorMessage('WebSocket connection failed'));
    store.dispatch(setConnected(false));
  };
}

export function disconnectWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}