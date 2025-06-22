import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedLog } from '@/store/logsSlice';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Code, AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react';

const LogGrid: React.FC = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state: RootState) => state.logs.logs);
  const filters = useSelector((state: RootState) => state.filters);

  // Filter logs
  const filteredLogs = logs.filter(log =>
    (!filters.level || (log.level && log.level.includes(filters.level))) &&
    (!filters.thread || (log.thread && log.thread.includes(filters.thread))) &&
    (!filters.file || (log.file && log.file.includes(filters.file))) &&
    (!filters.caller || (log.caller && log.caller.includes(filters.caller))) &&
    (!filters.message || (log.message && log.message.includes(filters.message)))
  );

  // Get unique threads and timestamps
  const threads = Array.from(new Set(filteredLogs.map(log => log.thread))).sort();
  const timestamps = Array.from(new Set(filteredLogs.map(log => log.timestamp))).sort();

  // Build a map: {timestamp: {thread: log}}
  const logMap: Record<string, Record<string, typeof logs[0]>> = {};
  filteredLogs.forEach(log => {
    if (!logMap[log.timestamp]) logMap[log.timestamp] = {};
    logMap[log.timestamp][log.thread] = log;
  });

  const getLevelIcon = (level: string) => {
    switch (level.toUpperCase()) {
      case 'ERROR': return <XCircle className="h-3 w-3 text-red-500" />;
      case 'WARN': return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
      case 'INFO': return <Info className="h-3 w-3 text-blue-500" />;
      case 'DEBUG': return <Code className="h-3 w-3 text-purple-500" />;
      default: return <CheckCircle className="h-3 w-3 text-green-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'ERROR': return 'bg-red-50 border-red-200 text-red-800 hover:bg-red-100';
      case 'WARN': return 'bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100';
      case 'INFO': return 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100';
      case 'DEBUG': return 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100';
      default: return 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100';
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <Code className="h-5 w-5 text-blue-600" />
          Log Entries
          <Badge variant="secondary" className="ml-auto">
            {filteredLogs.length} entries
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header */}
            <div className="grid grid-cols-[200px_1fr] gap-2 mb-2 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Clock className="h-4 w-4" />
                Timestamp
              </div>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${threads.length}, 1fr)` }}>
                {threads.map(thread => (
                  <div key={thread} className="text-sm font-semibold text-slate-700 text-center p-2 bg-slate-50 rounded">
                    {thread}
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {timestamps.map(timestamp => (
                <div key={timestamp} className="grid grid-cols-[200px_1fr] gap-2 min-h-[60px]">
                  <div className="text-xs text-slate-600 font-mono py-2 px-1 bg-slate-50 rounded text-center self-center">
                    {new Date(timestamp).toLocaleTimeString()}
                  </div>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${threads.length}, 1fr)` }}>
                    {threads.map(thread => {
                      const log = logMap[timestamp]?.[thread];
                      return (
                        <div
                          key={thread}
                          className={`min-h-[56px] p-2 rounded border transition-all duration-200 cursor-pointer ${
                            log 
                              ? `${getLevelColor(log.level)} border shadow-sm hover:shadow-md transform hover:-translate-y-0.5` 
                              : 'bg-slate-25 border-slate-100 hover:bg-slate-50'
                          }`}
                          onClick={() => {
                            if (log) dispatch(setSelectedLog(log));
                          }}
                          title={log ? `${log.level}: ${log.message}` : ''}
                        >
                          {log && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                {getLevelIcon(log.level)}
                                <span className="text-xs font-medium">{log.level}</span>
                              </div>
                              <div className="text-xs line-clamp-2 leading-tight">
                                {log.message}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogGrid;