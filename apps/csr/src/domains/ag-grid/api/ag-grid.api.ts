import { TABLE_SAMPLE_ROWS } from '@/data/table';
import { ApiInstance } from '@/libs';
import type { GridEntity } from './ag-grid.schema';

// ----------------------------------------------------------------------

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ----------------------------------------------------------------------

export const getGrids = async () => {
  await delay(1000);

  return ApiInstance.get('/ag-grid')
    .json<GridEntity.GridRes[]>()
    .catch<GridEntity.GridRes[]>(() => TABLE_SAMPLE_ROWS);
};

// ----------------------------------------------------------------------

export const createGrid = async (json: GridEntity.CreateGrid) => {
  return ApiInstance.post('/ag-grid', {
    json,
  })
    .json<GridEntity.GridRes[]>()
    .catch(() => TABLE_SAMPLE_ROWS);
};

// ----------------------------------------------------------------------

export const updateGrid = async (json: GridEntity.UpdateGrid) => {
  return ApiInstance.put('/ag-grid', {
    json,
  })
    .json<GridEntity.GridRes[]>()
    .catch(() => TABLE_SAMPLE_ROWS);
};
