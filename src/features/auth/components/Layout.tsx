import { ReactNode } from 'react';

import { Head } from '../../../components/Head';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head title={title}></Head>
      {children}
    </>
  );
};
