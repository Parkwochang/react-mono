import { AG_GRID_COLUMN } from '@/constants/columns';
import type { TableEntity } from '@/domains/table/api';
import { useGetTable } from '@/domains/table/hooks';
import { useGrid } from '@/shared/hooks';

// ----------------------------------------------------------------------
// ! 그리드 내 CREATE, UPDATE, DELETE, FILTER 핸들러 예제

export const useGridCUD = () => {
  const tableData = useGetTable();

  const { isReady, gridApiRef, ...gridOptions } = useGrid({
    rowData: tableData.data,
    columnDefs: AG_GRID_COLUMN,
    getRowId: (params) => params.data.id,
  });

  const gridApi = gridApiRef.current;

  const onAddRow = () => {
    if (!gridApi) return;

    const nextNumber = gridApi.getDisplayedRowCount() + 1;

    gridApi.applyTransaction({
      add: [
        {
          id: `sam-${String(nextNumber).padStart(3, '0')}`,
          owner: `New Owner ${nextNumber}`,
          team: 'Studio',
          status: 'Draft',
          priority: 'Medium',
          progress: 18,
          tasks: 3,
          updatedAt: new Date().toISOString(),
          focus: 'New sample row',
        },
      ],
      addIndex: 0,
    });
  };

  // ----------------------------------------------------------------------

  const onUpdateRow = (data: TableEntity.TableRes) => {
    if (!gridApi) return;

    gridApi.applyTransaction({
      update: [data],
    });
  };

  // ----------------------------------------------------------------------

  const onDeleteRow = (data: TableEntity.TableRes) => {
    if (!gridApi) return;

    gridApi.applyTransaction({
      remove: [data],
    });
  };

  // ----------------------------------------------------------------------

  const onOwnerChange = (owner: string) => {
    if (!gridApi) return;

    if (owner === '') {
      gridApi.setColumnFilterModel('owner', null);
    } else {
      gridApi.setColumnFilterModel('owner', {
        filterType: 'text',
        type: 'contains',
        filter: owner,
      });
    }

    return gridApi.onFilterChanged();
  };

  // ----------------------------------------------------------------------

  const onStatusChange = (status: TableEntity.TableRes['status'] | '') => {
    if (!gridApi) return;

    if (status === '') {
      gridApi.setColumnFilterModel('status', null);
    } else {
      gridApi.setColumnFilterModel('status', {
        filterType: 'text',
        type: 'equals',
        filter: status,
      });
    }

    return gridApi.onFilterChanged();
  };

  // const onFilterCha2

  return {
    tableData,
    gridOptions,
    onAddRow,
    onUpdateRow,
    onDeleteRow,
    onOwnerChange,
    onStatusChange,
  };
};
