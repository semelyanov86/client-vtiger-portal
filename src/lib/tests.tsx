import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { messages } from '../providers/messages/messages.ts';

import { AuthProvider } from './auth.tsx';

interface wrapToRouterAndIntlProps {
  children: ReactNode;
}

export const WrapToRouterAndIntl = ({ children }: wrapToRouterAndIntlProps) => {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      <AuthProvider>
        <IntlProvider locale="en" messages={messages['en-US']}>
          <MemoryRouter>{children}</MemoryRouter>
        </IntlProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  };
}

export function createQueryWrapper() {
  const testQueryClient = createTestQueryClient();
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  );
}
