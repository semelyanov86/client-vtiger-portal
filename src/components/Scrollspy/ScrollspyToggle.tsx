import React, { MouseEvent } from 'react';

interface ScrollspyToggleProps {
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const ScrollspyToggle = React.forwardRef<HTMLAnchorElement, ScrollspyToggleProps>(
  ({ children, onClick }, ref) => (
    <a
      href="#/!"
      ref={ref}
      className="spy-button text-white"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  )
);
ScrollspyToggle.displayName = 'ScrollspyToggle';

export default ScrollspyToggle;
