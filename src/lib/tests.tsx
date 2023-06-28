import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import { messages } from '../providers/messages/messages.ts';

import { AuthProvider } from './auth.tsx';

interface wrapToRouterAndIntlProps {
  children: ReactNode;
}

export const WrapToRouterAndIntl = ({ children }: wrapToRouterAndIntlProps) => {
  return (
    <AuthProvider>
      <IntlProvider locale="en" messages={messages['en-US']}>
        <MemoryRouter>{children}</MemoryRouter>
      </IntlProvider>
    </AuthProvider>
  );
};
