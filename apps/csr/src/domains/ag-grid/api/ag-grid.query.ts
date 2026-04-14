import { queryOptions } from '@tanstack/react-query';

import { getGrids } from './ag-grid.api';

// ----------------------------------------------------------------------

export const getGridsQuery = () =>
  queryOptions({
    queryKey: ['/ag-grid'],
    queryFn: () => getGrids(),
  });
