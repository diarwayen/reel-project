import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Download, FileText, Table } from 'lucide-react';

const ExportButton: React.FC = () => {
  const logs = useSelector((state: RootState) => state.logs.logs);
  const filters = useSelector((state: RootState) => state.filters);

  const filteredLogs = logs.filter(log =>
    (!filters.level || log.level.includes(filters.level)) &&
    (!filters.thread || log.thread.includes(filters.thread)) &&
    (!filters.file || log.file.includes(filters.file)) &&
    (!filters.caller || log.caller.includes(filters.caller)) &&
    (!filters.message || log.message.includes(filters.message))
  );

  const handleExport = (type: 'txt' | 'csv') => {
    let content = '';
    if (type === 'csv') {
      content = 'timestamp,level,thread,file,caller,message\n' +
        filteredLogs.map(l =>
          [l.timestamp, l.level, l.thread, l.file, l.caller, `"${l.message.replace(/"/g, '""')}"`].join(',')
        ).join('\n');
    } else {
      content = filteredLogs.map(l =>
        `${l.timestamp} ${l.level} ${l.thread} ${l.file} ${l.caller} "${l.message}"`
      ).join('\n');
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleExport('txt')}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Export TXT
      </Button>
      <Button
        onClick={() => handleExport('csv')}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Table className="h-4 w-4" />
        Export CSV
      </Button>
    </div>
  );
};

export default ExportButton;