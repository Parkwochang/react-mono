import type { ColumnDef } from '@tanstack/react-table';

import type { TableEntity } from '@/domains/table/api';
import { cn } from '@/libs';

// ----------------------------------------------------------------------

// ! 테이블 -> 기본 테이블
export const TABLE_COLUMNS: ColumnDef<TableEntity.TableRes>[] = [
  {
    id: 'expand-column',
    accessorFn: (row) => row.owner,
    header: 'Owner',
    filterFn: 'includesString',
    cell: ({ row }) => {
      const { owner, focus, team } = row.original;

      return (
        <div className="flex min-w-[240px] items-center gap-3 text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
            {owner.slice(0, 1)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">{owner}</p>
            <p className="truncate text-xs text-slate-400">
              {team} · {focus}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) {
        return true;
      }

      return row.getValue(columnId) === filterValue;
    },
    cell: ({ getValue }) => {
      const value = String(getValue());

      return (
        <span
          className={cn(
            'inline-flex rounded-full border px-3 py-1 text-xs font-semibold',
            value === 'Live' && 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
            value === 'Reviewing' && 'border-amber-400/30 bg-amber-400/10 text-amber-200',
            value === 'Draft' && 'border-white/10 bg-white/5 text-slate-300'
          )}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ getValue }) => {
      const value = String(getValue());

      return (
        <span
          className={cn(
            'text-sm font-semibold',
            value === 'High' && 'text-rose-200',
            value === 'Medium' && 'text-cyan-200',
            value === 'Low' && 'text-slate-300'
          )}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: 'team',
    header: 'Team',
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ getValue }) => {
      const value = Number(getValue());

      return (
        <div className="mx-auto flex min-w-[160px] max-w-[180px] items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-cyan-300 via-cyan-400 to-sky-400"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="w-10 text-right text-xs font-semibold text-slate-300">{value}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'tasks',
    header: 'Tasks',
    cell: ({ getValue }) => <span className="font-medium text-white">{String(getValue())}</span>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ getValue }) => <span className="text-slate-300">{String(getValue())}</span>,
  },
];
