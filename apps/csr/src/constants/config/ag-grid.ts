import type { ColDef } from 'ag-grid-community';

// ----------------------------------------------------------------------
// ! 그리드 기본 컬럼

export const DEFAULT_COL_DEF: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  suppressMovable: true,
  flex: 1,
  minWidth: 120,
  cellStyle: {
    justifyContent: 'center',
  },
} as const;

// ----------------------------------------------------------------------
// ! 그리드 기본 사이즈

export const DEFAULT_GRID_SIZE = {
  headerHeight: 48,
  rowHeight: 72,
} as const;

// ----------------------------------------------------------------------
// ! 그리드 상태 옵션

export const STATUS_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Live', value: 'Live' },
  { label: 'Reviewing', value: 'Reviewing' },
  { label: 'Draft', value: 'Draft' },
] as const;
