import { ReactNode } from 'react';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <h1>{title}</h1>
      {children}
    </>
  );
};
