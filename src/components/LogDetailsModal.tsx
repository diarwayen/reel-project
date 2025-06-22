import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedLog } from '@/store/logsSlice';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Code, 
  File, 
  User, 
  MessageSquare, 
  XCircle, 
  AlertTriangle, 
  Info, 
  CheckCircle 
} from 'lucide-react';

const LogDetailsModal = () => {
  const dispatch = useDispatch();
  const log = useSelector((state: RootState) => state.logs.selectedLog);

  if (!log) return null;

  const getLevelIcon = (level: string) => {
    switch (level.toUpperCase()) {
      case 'ERROR': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'WARN': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'INFO': return <Info className="h-4 w-4 text-blue-500" />;
      case 'DEBUG': return <Code className="h-4 w-4 text-purple-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'ERROR': return 'bg-red-100 text-red-800 border-red-200';
      case 'WARN': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'INFO': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DEBUG': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <Dialog open={!!log} onOpenChange={() => dispatch(setSelectedLog(null))}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getLevelIcon(log.level)}
            Log Details
            <Badge className={getLevelColor(log.level)}>
              {log.level}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Clock className="h-4 w-4" />
                Timestamp
              </div>
              <div className="text-sm font-mono bg-slate-50 p-2 rounded">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Code className="h-4 w-4" />
                Thread
              </div>
              <div className="text-sm bg-slate-50 p-2 rounded">
                {log.thread}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <File className="h-4 w-4" />
                File
              </div>
              <div className="text-sm font-mono bg-slate-50 p-2 rounded">
                {log.file}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <User className="h-4 w-4" />
                Caller
              </div>
              <div className="text-sm font-mono bg-slate-50 p-2 rounded">
                {log.caller}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <MessageSquare className="h-4 w-4" />
              Message
            </div>
            <div className="text-sm bg-slate-50 p-3 rounded border-l-4 border-blue-400">
              {log.message}
            </div>
          </div>

          {log.info && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Info className="h-4 w-4" />
                Additional Info
              </div>
              <div className="text-sm bg-slate-50 p-3 rounded">
                {log.info}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogDetailsModal;