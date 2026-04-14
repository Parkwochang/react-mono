import type { CustomCellRendererProps } from 'ag-grid-react';

import type { GridEntity } from '../api';
import { cn } from '@/libs';

// ----------------------------------------------------------------------

export function OwnerCellRenderer({ data }: CustomCellRendererProps<GridEntity.GridRes, string>) {
  if (!data) return null;

  return (
    <div className="flex w-full min-w-[240px] items-center gap-3 text-left">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
        {data.owner.slice(0, 1)}
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold text-white">{data.owner}</p>
        <p className="truncate text-xs text-slate-400">
          {data.team} · {data.focus}
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

export function StatusCellRenderer({ value }: CustomCellRendererProps<GridEntity.GridRes, string>) {
  if (!value) return null;

  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-3 py-1 text-xs font-medium',
        value === 'Live' && 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
        value === 'Reviewing' && 'border-amber-400/30 bg-amber-400/10 text-amber-200',
        value === 'Draft' && 'border-white/10 bg-white/5 text-slate-300'
      )}
    >
      {value}
    </span>
  );
}

// ----------------------------------------------------------------------

export function PriorityCellRenderer({ value }: CustomCellRendererProps<GridEntity.GridRes, string>) {
  if (!value) return null;

  return (
    <span
      className={cn(
        'text-sm font-medium',
        value === 'High' && 'text-rose-200',
        value === 'Medium' && 'text-cyan-200',
        value === 'Low' && 'text-slate-300'
      )}
    >
      {value}
    </span>
  );
}

// ----------------------------------------------------------------------

export function TeamCellRenderer({ value }: CustomCellRendererProps<GridEntity.GridRes, string>) {
  return <span className="text-slate-200">{String(value ?? '')}</span>;
}

// ----------------------------------------------------------------------

export function ProgressCellRenderer({ value }: CustomCellRendererProps<GridEntity.GridRes, number>) {
  const safeValue = typeof value === 'number' ? Math.max(0, Math.min(100, value)) : 0;

  return (
    <div className="mx-auto flex min-w-[160px] max-w-[180px] items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-linear-to-r from-cyan-300 via-cyan-400 to-sky-400"
          style={{ width: `${safeValue}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs font-semibold text-slate-300">{safeValue}%</span>
    </div>
  );
}

// ----------------------------------------------------------------------

export function TasksCellRenderer({ value }: CustomCellRendererProps<GridEntity.GridRes, number>) {
  return <span className="font-medium text-white">{String(value ?? '')}</span>;
}

// ----------------------------------------------------------------------

export function UpdatedCellRenderer({ value }: CustomCellRendererProps<GridEntity.GridRes, string>) {
  return <span className="text-slate-300">{String(value ?? '')}</span>;
}
