import { ReactNode } from 'react';

interface BlockHeaderProps {
  children: ReactNode;
}

export const BlockHeader = ({ children }: BlockHeaderProps) => {
  return <h2 className="small-title">{children}</h2>;
};
