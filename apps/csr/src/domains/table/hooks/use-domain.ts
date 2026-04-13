import { TABLE_COLUMNS } from '@/constants/columns';
import { useGetTable } from './use-api';
import { useGridApi } from './use-grid';
import { TABLE_DEFAULT_ROW } from '@/data/table';
import type { TableEntity } from '../api';

const getTableRowId = (row: TableEntity.TableRes) => row.id;

export const useDomain = () => {
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

  const handleAllResetClick = () => {
    grid.clearRowSelection();
  };

  return {
    data,
    grid,
    liveCount,
    reviewingCount,
    averageProgress,
    handleAllResetClick,
  };
};
