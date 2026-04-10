import { queryOptions } from '@tanstack/react-query';

import { getTables } from './table.api';

// ----------------------------------------------------------------------

export const getTablesQuery = () =>
  queryOptions({
    queryKey: ['/table'],
    queryFn: () => getTables(),
  });
