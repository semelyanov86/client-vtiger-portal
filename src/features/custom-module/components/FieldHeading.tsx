import { ReactNode } from 'react';

interface FieldHeadingProps {
  children: ReactNode;
}

export const FieldHeading = ({ children }: FieldHeadingProps) => {
  return <div className="heading">{children}</div>;
};
