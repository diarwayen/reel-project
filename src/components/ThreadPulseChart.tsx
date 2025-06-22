import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp } from 'lucide-react';

const ThreadPulseChart: React.FC = () => {
  const logs = useSelector((state: RootState) => state.logs.logs);

  // Aggregate log counts per thread per minute
  const data: Record<string, Record<string, number>> = {};
  logs.forEach(log => {
    const minute = log.timestamp.slice(0, 16); // e.g., "2024-06-01T12:34"
    if (!data[minute]) data[minute] = {};
    if (!data[minute][log.thread]) data[minute][log.thread] = 0;
    data[minute][log.thread]++;
  });

  const minutes = Object.keys(data).sort().slice(-10); // Show last 10 minutes
  const threads = Array.from(new Set(logs.map(l => l.thread))).sort();

  const getIntensityColor = (count: number, max: number) => {
    const intensity = count / Math.max(max, 1);
    if (intensity > 0.8) return 'bg-red-500';
    if (intensity > 0.6) return 'bg-orange-500';
    if (intensity > 0.4) return 'bg-yellow-500';
    if (intensity > 0.2) return 'bg-green-500';
    if (intensity > 0) return 'bg-blue-500';
    return 'bg-slate-100';
  };

  const maxCount = Math.max(...minutes.flatMap(min => 
    threads.map(thread => data[min]?.[thread] || 0)
  ));

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <Activity className="h-5 w-5 text-blue-600" />
          Thread Activity Pulse
          <Badge variant="outline" className="ml-auto">
            <TrendingUp className="h-3 w-3 mr-1" />
            Last 10 minutes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-[120px_1fr] gap-4 text-sm">
            <div className="font-medium text-slate-600">Time</div>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${threads.length}, 1fr)` }}>
              {threads.map(thread => (
                <div key={thread} className="text-center font-medium text-slate-600 text-xs">
                  {thread}
                </div>
              ))}
            </div>
          </div>
          
          {minutes.map(minute => (
            <div key={minute} className="grid grid-cols-[120px_1fr] gap-4 items-center">
              <div className="text-xs font-mono text-slate-600">
                {new Date(minute).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${threads.length}, 1fr)` }}>
                {threads.map(thread => {
                  const count = data[minute]?.[thread] || 0;
                  return (
                    <div
                      key={thread}
                      className={`h-6 rounded text-white text-xs flex items-center justify-center font-medium transition-all duration-200 hover:scale-110 ${getIntensityColor(count, maxCount)}`}
                      title={`${thread}: ${count} logs at ${new Date(minute).toLocaleTimeString()}`}
                    >
                      {count || ''}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {minutes.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No log data available for the pulse chart
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreadPulseChart;