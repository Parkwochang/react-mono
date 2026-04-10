import { createFileRoute } from '@tanstack/react-router';

import { TableScreen } from '@/domains/table/components';

export const Route = createFileRoute('/table/')({
  component: TableScreen,
});
