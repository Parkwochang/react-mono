import type { TableEntity } from '@/domains/table/api';
import type { ColDef } from 'ag-grid-community';

export const AG_COlUMN: ColDef<TableEntity.TableRes>[] = [
  {
    field: 'service',
    headerName: 'Service',
    minWidth: 180,
    pinned: 'left',
  },
  {
    field: 'owner',
    headerName: 'Owner',
    minWidth: 120,
  },
  {
    field: 'squad',
    headerName: 'Squad',
    minWidth: 150,
  },
  {
    field: 'stage',
    headerName: 'Stage',
    minWidth: 120,
    // cellRenderer: StageCellRenderer,
  },
  {
    field: 'priority',
    headerName: 'Priority',
    minWidth: 120,
    // cellRenderer: PriorityCellRenderer,
  },
  {
    field: 'progress',
    headerName: 'Progress',
    minWidth: 130,
    // cellRenderer: ProgressCellRenderer,
  },
  {
    field: 'tickets',
    headerName: 'Tickets',
    minWidth: 110,
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    minWidth: 120,
  },
];
