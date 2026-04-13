import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { AgGridProvider } from 'ag-grid-react';

import { routeTree } from './routeTree.gen';
import { LoadingIndicatorScreen } from './shared/ui';
import { gridSharedModules, QueryProvider, createQueryClient } from './libs';

// ----------------------------------------------------------------------

export function getRouter() {
  const queryClient = createQueryClient();

  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient,
    },
    notFoundMode: 'root',
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPendingMs: 0,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: LoadingIndicatorScreen,
    defaultNotFoundComponent: () => <div>Not found</div>,
    Wrap: ({ children }) => (
      <QueryProvider client={queryClient}>
        <AgGridProvider modules={gridSharedModules} /* licenseKey='' */>{children}</AgGridProvider>
      </QueryProvider>
    ),
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
