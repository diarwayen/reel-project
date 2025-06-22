import { useDispatch } from 'react-redux';
import { clearLogs } from '@/store/logsSlice';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const ClearLogsButton: React.FC = () => {
  const dispatch = useDispatch();
  
  return (
    <Button
      onClick={() => dispatch(clearLogs())}
      variant="destructive"
      size="sm"
      className="flex items-center gap-2"
    >
      <Trash2 className="h-4 w-4" />
      Clear Logs
    </Button>
  );
};

export default ClearLogsButton;