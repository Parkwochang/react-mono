import { createFileRoute } from '@tanstack/react-router';

import { AgGridScreen } from '@/domains/ag-grid/components';

export const Route = createFileRoute('/ag-grid/')({
  component: AgGridScreen,
});
