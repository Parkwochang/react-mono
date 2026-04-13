import { useCallback, useRef, useState } from 'react';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import type { AgGridReactProps } from 'ag-grid-react';

import { DEFAULT_COL_DEF, DEFAULT_GRID_SIZE } from '@/constants/config';

// ----------------------------------------------------------------------

interface UseGridReturn<TData extends unknown> extends AgGridReactProps<TData> {
  // ref: React.RefObject<AgGridReact<TData>>;
  gridApiRef: React.RefObject<GridApi<TData> | null>;
  isReady: boolean;
}

interface UseGridProps<TData extends unknown> extends AgGridReactProps<TData> {
  rowData?: TData[];
  columnDefs?: ColDef<TData>[];
}

export const useGrid = <TData extends unknown>(options?: UseGridProps<TData>): UseGridReturn<TData> => {
  const gridApiRef = useRef<GridApi<TData> | null>(null);

  const [isReady, setIsReady] = useState(false);

  const onGridReady = useCallback((event: GridReadyEvent) => {
    if (event.api) {
      gridApiRef.current = event.api;
      return setIsReady(true);
    }
  }, []);

  return {
    isReady,
    gridApiRef,
    onGridReady,
    ...DEFAULT_GRID_SIZE,
    defaultColDef: DEFAULT_COL_DEF,
    ...options,
  };
};
