import { TABLE_SAMPLE_ROWS } from '@/data/table';
import { ApiInstance } from '@/libs';
import type { TableEntity } from './table.schema';

// ----------------------------------------------------------------------

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ----------------------------------------------------------------------

export const getTables = async () => {
  await delay(1000);

  return ApiInstance('/table', {
    method: 'GET',
  })
    .json<TableEntity.TableRes[]>()
    .catch(() => TABLE_SAMPLE_ROWS);
};

// ----------------------------------------------------------------------

export const createTable = async (json: TableEntity.CreateTable) => {
  return ApiInstance('/table', {
    method: 'POST',
    json,
  })
    .json<TableEntity.TableRes[]>()
    .catch(() => TABLE_SAMPLE_ROWS);
};

// ----------------------------------------------------------------------

export const updateTable = async (json: TableEntity.UpdateTable) => {
  return ApiInstance('/table', {
    method: 'PUT',
    json,
  })
    .json<TableEntity.TableRes[]>()
    .catch(() => TABLE_SAMPLE_ROWS);
};
