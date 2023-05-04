import React, { MouseEvent } from 'react';
import { Dropdown } from 'react-bootstrap';
import { MenuDown } from 'react-bootstrap-icons';

import { ScrollSpyItems } from '../../stores/scrollspy.ts'; // Adjust the import path according to your project structure

import { ScrollSpyContent } from './ScrollSpyContent';

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

interface ScrollspyMobileProps {
  items?: ScrollSpyItems[];
}

const ScrollspyMobile: React.FC<ScrollspyMobileProps> = ({ items = [] }) => {
  if (items === null || items.length <= 0) {
    return <></>;
  }

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={ScrollspyToggle}>
          <MenuDown />
        </Dropdown.Toggle>
        <Dropdown.Menu
          as="ul"
          className="dropdown-menu-end"
          popperConfig={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 5],
                },
              },
            ],
          }}
        >
          <ScrollSpyContent items={items} />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
export default React.memo(ScrollspyMobile);
