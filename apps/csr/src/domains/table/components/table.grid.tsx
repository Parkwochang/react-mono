import { cn } from '@/libs';
import { TABLE_COLUMNS } from '@/constants/columns';
import { TABLE_DEFAULT_ROW } from '@/data/table';
import { TableViewer } from '@/shared/ui';
import type { TableEntity } from '../api';
import { useGetTable, useGridApi } from '../hooks';
import { TableFilter } from './table.filter';
import { TableForm } from './table.form';

// ----------------------------------------------------------------------

const getTableRowId = (row: TableEntity.TableRes) => row.id;

export const TableGrid = () => {
  const { data } = useGetTable();

  const grid = useGridApi({
    data: data ?? [],
    columns: TABLE_COLUMNS,
    defaultRow: TABLE_DEFAULT_ROW,
    getRowId: getTableRowId,
  });

  const liveCount = grid.rowData.filter((item) => item.status === 'Live').length;
  const reviewingCount = grid.rowData.filter((item) => item.status === 'Reviewing').length;
  const averageProgress = grid.rowData.length
    ? grid.rowData.reduce((acc, item) => acc + item.progress, 0) / grid.rowData.length
    : 0;

  return (
    <section className={cn('grid gap-4', grid.hasSelectedRow ? 'xl:grid-cols-[minmax(0,1fr)_24rem]' : 'grid-cols-1')}>
      <button className="w-full h-[50px]">테스트</button>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6">
        <TableViewer
          table={grid.table}
          renderItem={(table) => <TableFilter table={table} />}
        />
      </div>

      {grid.selectedRow && grid.selectedRowId && (
        <TableForm
          row={grid.selectedRow}
          onClose={grid.clearRowSelection}
          onSave={(updatedRow) => {
            grid.updateRow(grid.selectedRowId, updatedRow);
          }}
        />
      )}
    </section>
  );
};

function MetricCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </article>
  );
}
