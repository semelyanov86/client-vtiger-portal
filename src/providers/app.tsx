import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';

import { Spinner } from '../components/Elements';
import { Notifications } from '../components/Notifications';
import { AuthProvider } from '../lib/auth.tsx';
import { queryClient } from '../lib/react-query';
import { AppRoutes } from '../routes';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};

export const AppProvider = () => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <HelmetProvider>
            {import.meta.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            <Notifications />
            <AuthProvider>
              <RouterProvider router={AppRoutes()}></RouterProvider>
            </AuthProvider>
          </HelmetProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
