import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type RowSelectionState,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  defaultRow?: TData;
  createRow?: (row: TData, rows: TData[]) => TData;
  getRowId?: (row: TData, index: number) => string;
}

export const useGridApi = <TData>({ data, columns, defaultRow, createRow, getRowId }: Props<TData>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [rowData, setRowData] = useState<TData[]>(data);

  const resolveRowId = (row: TData, index: number) => {
    return getRowId ? getRowId(row, index) : String(index);
  };

  const addRow = () => {
    if (!defaultRow) {
      return;
    }

    let nextRowId: string | null = null;

    setRowData((prev) => {
      const nextRow = createRow ? createRow(defaultRow, prev) : defaultRow;
      nextRowId = resolveRowId(nextRow, 0);

      return [nextRow, ...prev];
    });

    if (nextRowId) {
      setRowSelection({ [nextRowId]: true });
    }
  };

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setRowData((old) =>
      old.map((row, index) => {
        if (index === rowIndex)
          return {
            ...old[rowIndex]!,
            [columnId]: value,
          };

        return row;
      })
    );
  };

  const table = useReactTable({
    data: rowData,
    columns,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableColumnPinning: true,
    getRowId: (row, index) => resolveRowId(row, index),
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
      addRow,
      updateData,
    },
  });

  const selectedTableRow = table.getSelectedRowModel().rows[0] ?? null;
  const selectedRow = selectedTableRow?.original ?? null;
  const selectedRowId = selectedTableRow?.id ?? null;

  const hasSelectedRow = Boolean(selectedTableRow);

  const clearRowSelection = () => {
    setRowSelection({});
  };

  const setSelectedRowId = (rowId: string | null) => {
    setRowSelection(rowId ? { [rowId]: true } : {});
  };

  const toggleRow = (rowId: string) => {
    setRowSelection((prev) => (prev[rowId] ? {} : { [rowId]: true }));
  };

  const updateRow = (rowId: string, updater: TData | ((row: TData) => TData)) => {
    setRowData((prev) =>
      prev.map((row, index) => {
        if (resolveRowId(row, index) !== rowId) {
          return row;
        }

        if (typeof updater === 'function') {
          return (updater as (row: TData) => TData)(row);
        }

        return updater;
      })
    );
  };

  // ----------------------------------------------------------------------

  useEffect(() => {
    setRowSelection((prev) => {
      const validEntries = Object.entries(prev).filter(([rowId, selected]) => {
        return selected && data.some((row, index) => resolveRowId(row, index) === rowId);
      });

      const next = validEntries.length ? Object.fromEntries(validEntries) : {};
      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(next);

      const sameSelection = prevKeys.length === nextKeys.length && prevKeys.every((key) => prev[key] === next[key]);

      return sameSelection ? prev : next;
    });

    setRowData(data);
  }, [data, getRowId]);

  return {
    table,
    rowData,
    rowSelection,
    selectedRow,
    selectedRowId,
    hasSelectedRow,
    setRowData,
    updateRow,
    setSelectedRowId,
    toggleRow,
    clearRowSelection,
  };
};
