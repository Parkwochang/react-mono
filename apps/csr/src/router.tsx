import { createRouter as createTanStackRouter } from '@tanstack/react-router';

import { createQueryClient } from './libs/query-client';
import { QueryProvider } from './libs/query-provider';
import { routeTree } from './routeTree.gen';
import { LoadingIndicatorScreen } from './shared/ui';

// ----------------------------------------------------------------------

export function getRouter() {
  const queryClient = createQueryClient();

  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient,
    },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPendingMs: 0,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: LoadingIndicatorScreen,
    Wrap: ({ children }) => <QueryProvider client={queryClient}>{children}</QueryProvider>,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
