import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import { useLanguagesStore } from '../stores/languages.ts';

import { Messages, messages } from './messages/messages';

interface LangProps {
  children: ReactNode;
}

export const LangProvider = ({ children }: LangProps) => {
  const { currentLang } = useLanguagesStore();

  return (
    <IntlProvider
      locale={currentLang.locale}
      messages={messages[currentLang.locale as keyof Messages]}
      defaultLocale={'en-US'}
    >
      {children}
    </IntlProvider>
  );
};
