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

export const mockedUser = {
  id: 0,
  crmid: '12x11',
  firstname: 'Sergei',
  lastname: 'Emelianov',
  description: 'Here is changed description second',
  account_id: '11x6',
  account_name: '',
  title: 'Director',
  department: 'Management',
  email: 'se@sergeyem.ru',
  created_at: '0001-01-01T00:00:00Z',
  updated_at: '0001-01-01T00:00:00Z',
  is_active: false,
  mailingcity: 'Cheboksary',
  mailingstreet: 'Bulvar Yunosti, 3',
  mailingcountry: 'Russia',
  othercountry: 'Russia',
  mailingstate: 'Chuvashia',
  mailingpobox: '',
  othercity: 'Cheboksary',
  otherstate: 'Chuvashia',
  mailingzip: '428010',
  otherzip: '428010',
  otherstreet: 'Bulvar Yunosti, 3',
  otherpobox: '',
  image: '',
  imageattachmentids: '12x42',
  imagecontent: '',
  phone: '+4915211100235',
};
