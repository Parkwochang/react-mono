import React, { useEffect, useState } from 'react';
import {
  type ColumnDef,
  type Table as TableType,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cn } from '@/libs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

// ----------------------------------------------------------------------

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  renderItem?: (table: TableType<TData>) => React.ReactElement;
  className?: string;
  defaultRow?: TData;
}

export const TableViewer = <TData,>({ data, columns, defaultRow, className, renderItem }: DataTableProps<TData>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [rowData, setRowData] = useState<TData[]>(data);

  const table = useReactTable({
    data: rowData,
    columns,
    enableRowSelection: true,
    enableColumnPinning: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      columnPinning: {
        left: ['expand-column'],
      },
    },
    state: {
      rowSelection,
    },
    meta: {
      addRow: () => {
        setRowData((pre) => {
          return defaultRow ? [defaultRow, ...pre] : pre;
        });
      },
      updateData: (rowIndex, columnId, value) => {
        setRowData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  useEffect(() => {
    setRowData(data);
    setRowSelection({});
  }, [data]);

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
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group whitespace-nowrap border-b border-white/8 odd:bg-white/[0.02] hover:bg-cyan-400/[0.05] data-[state=selected]:bg-cyan-400/[0.1]"
                    data-state={row.getIsSelected() && 'selected'}
                    aria-keyshortcuts="Space"
                    // onKeyDown={(e) => {
                    //   e.preventDefault();
                    //   if (e.key == ' ' || e.code == 'Space' || e.keyCode == 32) {
                    //     row.getToggleSelectedHandler()(e);
                    //   }
                    // }}
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   e.stopPropagation();
                    //   row.getToggleSelectedHandler()(e);
                    // }}
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
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={columns.length}
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
