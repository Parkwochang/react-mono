import type { ColDef } from 'ag-grid-community';

import {
  OwnerCellRenderer,
  PriorityCellRenderer,
  ProgressCellRenderer,
  StatusCellRenderer,
  TasksCellRenderer,
  TeamCellRenderer,
  UpdatedCellRenderer,
} from '@/domains/ag-grid/components';
import type { TableEntity } from '@/domains/table/api';

// ----------------------------------------------------------------------

export const AG_GRID_COLUMN: ColDef<TableEntity.TableRes>[] = [
  {
    colId: 'owner',
    headerName: 'Owner',
    field: 'owner',
    pinned: 'left',
    minWidth: 360,
    flex: 1.8,
    cellStyle: {
      justifyContent: 'flex-start',
    },
    cellRenderer: OwnerCellRenderer,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    flex: 1,
    cellRenderer: StatusCellRenderer,
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 160,
    flex: 1,
    cellRenderer: PriorityCellRenderer,
  },
  {
    field: 'team',
    headerName: 'Team',
    width: 150,
    flex: 1,
    cellRenderer: TeamCellRenderer,
  },
  {
    field: 'progress',
    headerName: 'Progress',
    width: 240,
    flex: 1.2,
    cellRenderer: ProgressCellRenderer,
  },
  {
    field: 'tasks',
    headerName: 'Tasks',
    width: 120,
    flex: 0.7,
    cellRenderer: TasksCellRenderer,
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    width: 150,
    flex: 0.9,
    cellRenderer: UpdatedCellRenderer,
  },
];
