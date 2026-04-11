import { type Table as TableType, flexRender } from '@tanstack/react-table';

import { cn } from '@/libs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

// ----------------------------------------------------------------------

interface DataTableProps<TData> {
  table: TableType<TData>;
  renderItem?: (table: TableType<TData>) => React.ReactElement;
  className?: string;
}

export const TableViewer = <TData,>({ table, className, renderItem }: DataTableProps<TData>) => {
  return (
    <>
      {renderItem && <div className="px-1 pb-4">{renderItem(table)}</div>}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 shadow-[0_20px_60px_rgba(2,6,23,0.38)] backdrop-blur">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div className="outline-none relative w-full overflow-x-auto">
          <Table className={cn('min-w-full text-sm text-slate-100', className)}>
            <TableHeader className="[&_tr]:border-b-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="whitespace-nowrap bg-white/[0.04]"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          'h-12 border-b border-white/10 px-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-cyan-200/85',
                          header.column.getIsPinned() &&
                            'sticky left-0 z-20 bg-slate-950/95 shadow-[10px_0_24px_rgba(2,6,23,0.28)] backdrop-blur'
                        )}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-b-0">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const active = row.getIsSelected();
                  const interactive = row.getCanSelect();

                  return (
                    <TableRow
                      key={row.id}
                      className={cn(
                        'group whitespace-nowrap border-b border-white/8 odd:bg-white/[0.02] hover:bg-cyan-400/[0.05] data-[state=selected]:bg-cyan-400/[0.1]',
                        interactive && 'cursor-pointer',
                        active && 'bg-cyan-400/[0.08] shadow-[inset_0_0_0_1px_rgba(103,232,249,0.18)]'
                      )}
                      data-state={active ? 'selected' : undefined}
                      aria-keyshortcuts={interactive ? 'Enter Space' : undefined}
                      tabIndex={interactive ? 0 : undefined}
                      onClick={interactive ? () => row.toggleSelected() : undefined}
                      onKeyDown={
                        interactive
                          ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                row.toggleSelected();
                              }
                            }
                          : undefined
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          className={cn(
                            'px-4 py-3.5 text-center text-sm text-slate-200',
                            cell.column.getIsPinned() &&
                              'sticky left-0 z-10 bg-slate-950/92 shadow-[10px_0_24px_rgba(2,6,23,0.22)] transition-colors group-hover:bg-slate-900/95 group-data-[state=selected]:bg-cyan-950/35'
                          )}
                          key={cell.id}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-28 px-6 text-center text-sm font-medium tracking-[0.18em] text-slate-400 uppercase"
                  >
                    No Results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
