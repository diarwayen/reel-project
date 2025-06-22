import { useDispatch, useSelector } from 'react-redux';
import { toggleLiveUpdate } from '@/store/liveUpdateSlice';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Play, Pause, Radio } from 'lucide-react';

const LiveUpdateToggle: React.FC = () => {
  const dispatch = useDispatch();
  const enabled = useSelector((state: RootState) => state.liveUpdate.enabled);

  return (
    <Button
      onClick={() => dispatch(toggleLiveUpdate())}
      variant={enabled ? "default" : "outline"}
      className={`flex items-center gap-2 transition-all duration-200 ${
        enabled 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
      }`}
    >
      {enabled ? (
        <>
          <div className="relative">
            <Radio className="h-4 w-4" />
            <div className="absolute top-0 left-0 h-4 w-4 animate-ping">
              <Radio className="h-4 w-4 text-green-400" />
            </div>
          </div>
          Live Updates
        </>
      ) : (
        <>
          <Pause className="h-4 w-4" />
          Paused
        </>
      )}
    </Button>
  );
};

export default LiveUpdateToggle;