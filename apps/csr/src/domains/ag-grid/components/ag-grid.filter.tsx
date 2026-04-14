import { STATUS_OPTIONS } from '@/constants/config';
import { cn } from '@/libs';
import { Input } from '@/shared/ui';
import { useState } from 'react';
import type { GridEntity } from '../api';

// ----------------------------------------------------------------------

interface Props {
  onOwnerChange: (owner: string) => void;
  onStatusChange: (status: GridEntity.GridRes['status'] | '') => void;
  onAddRow: () => void;
}

export const AgGridFilter = ({ onAddRow, onOwnerChange, onStatusChange }: Props) => {
  // ! 추후 훅폼이나 api로 변경점

  const [statusFilter, setStatusFilter] = useState<GridEntity.GridRes['status'] | ''>('');
  const [ownerFilter, setOwnerFilter] = useState<string>('');

  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setOwnerFilter(value);
    onOwnerChange(value);
  };

  const handleStatusChange = (value: GridEntity.GridRes['status'] | '') => () => {
    setStatusFilter(value);
    onStatusChange(value);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
        <div className="w-full max-w-sm">
          <Input
            value={ownerFilter}
            onChange={handleOwnerChange}
            placeholder="담당자 이름으로 검색"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((item) => {
            const isActive = statusFilter === item.value;

            return (
              <button
                key={item.label}
                type="button"
                onClick={handleStatusChange(item.value)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-semibold transition',
                  isActive
                    ? 'border-cyan-400/70 bg-cyan-400/10 text-white'
                    : 'border-white/10 text-slate-300 hover:border-cyan-300/50 hover:text-white'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-slate-400">
          {/* Visible Rows <span className="font-semibold text-white">{filteredRows.length}</span> */}
        </p>
        <button
          type="button"
          onClick={onAddRow}
          className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          샘플 행 추가
        </button>
      </div>
    </div>
  );
};
