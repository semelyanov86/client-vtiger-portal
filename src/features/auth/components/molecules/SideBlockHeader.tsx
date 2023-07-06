import { ReactNode } from 'react';

interface SideBlockHeaderProps {
  children: ReactNode;
}

export const SideBlockHeader = ({ children }: SideBlockHeaderProps) => {
  return <p className="text-small text-muted mb-2">{children}</p>;
};
