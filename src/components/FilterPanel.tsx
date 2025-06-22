import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilters } from '@/store/filtersSlice';
import { RootState } from '@/store';
import type { FiltersState } from '@/store/filtersSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, X } from 'lucide-react';

const fields: { key: keyof FiltersState; label: string; placeholder: string }[] = [
  { key: 'level', label: 'Level', placeholder: 'Filter by level (INFO, WARN, ERROR...)' },
  { key: 'thread', label: 'Thread', placeholder: 'Filter by thread name' },
  { key: 'file', label: 'File', placeholder: 'Filter by file name' },
  { key: 'caller', label: 'Caller', placeholder: 'Filter by caller function' },
  { key: 'message', label: 'Message', placeholder: 'Filter by message content' },
];

const FilterPanel: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  
  const hasActiveFilters = Object.values(filters).some(value => value.length > 0);

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <Filter className="h-5 w-5 text-blue-600" />
          Log Filters
          {hasActiveFilters && (
            <Button
              onClick={() => dispatch(clearFilters())}
              variant="ghost"
              size="sm"
              className="ml-auto h-6 px-2 text-xs text-slate-500 hover:text-red-600"
            >
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {fields.map(field => (
            <div key={field.key} className="space-y-1">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                {field.label}
              </label>
              <Input
                type="text"
                value={filters[field.key]}
                onChange={e => dispatch(setFilter({ key: field.key, value: e.target.value }))}
                placeholder={field.placeholder}
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;