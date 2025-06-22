import { useDispatch, useSelector } from 'react-redux';
import { setUrl, setPassword, setConnected } from '@/store/connectionSlice';
import { connectWebSocket, disconnectWebSocket } from '@/utils/websocket';
import { RootState } from '@/store';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Lock, Globe } from 'lucide-react';

const ConnectPort: React.FC = () => {
  const dispatch = useDispatch();
  const { url, password, connected, status, errorMessage } = useSelector((state: RootState) => state.connection);
  const [inputUrl, setInputUrl] = useState(url);
  const [inputPassword, setInputPassword] = useState(password);

  const handleConnect = () => {
    connectWebSocket(inputUrl, inputPassword);
    dispatch(setUrl(inputUrl));
    dispatch(setPassword(inputPassword));
  };

  const handleDisconnect = () => {
    disconnectWebSocket();
    dispatch(setConnected(false));
  };

  return (
    <Card className="border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <Globe className="h-5 w-5 text-blue-600" />
          WebSocket Connection
          <Badge variant={connected ? "default" : "secondary"} className={`ml-auto ${connected ? 'bg-green-100 text-green-800 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
            {connected ? (
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3" />
                Connected
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <WifiOff className="h-3 w-3" />
                Disconnected
              </div>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Server URL</label>
          <Input
            type="text"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            placeholder="ws://localhost:8080"
            disabled={connected}
            className="font-mono"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Password (Optional)
          </label>
          <Input
            type="password"
            value={inputPassword}
            onChange={e => setInputPassword(e.target.value)}
            placeholder="Enter password if required"
            disabled={connected}
          />
        </div>

        {errorMessage && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {errorMessage}
          </div>
        )}

        <div className="flex gap-2">
          {connected ? (
            <Button 
              onClick={handleDisconnect} 
              variant="destructive" 
              className="flex items-center gap-2 flex-1"
            >
              <WifiOff className="h-4 w-4" />
              Disconnect
            </Button>
          ) : (
            <Button 
              onClick={handleConnect} 
              className="flex items-center gap-2 flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={status === 'connecting'}
            >
              <Wifi className="h-4 w-4" />
              {status === 'connecting' ? 'Connecting...' : 'Connect'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectPort;