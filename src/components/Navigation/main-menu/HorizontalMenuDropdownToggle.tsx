import classNames from 'classnames';
import React, { MouseEvent } from 'react';

interface HorizontalMenuDropdownToggleProps {
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  href?: string;
  active?: boolean;
}

const HorizontalMenuDropdownToggle = React.memo(
  React.forwardRef<HTMLAnchorElement, HorizontalMenuDropdownToggleProps>(
    ({ children, onClick, href = '#', active = false }, ref) => (
      <a
        ref={ref}
        className={classNames('dropdown-toggle', { active })}
        data-toggle="dropdown"
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </a>
    )
  )
);

export default HorizontalMenuDropdownToggle;
