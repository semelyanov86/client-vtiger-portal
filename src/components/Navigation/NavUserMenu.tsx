import { ToggleMetadata } from '@restart/ui/Dropdown';
import classNames from 'classnames';
import React, { CSSProperties, memo, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

import { MENU_PLACEMENT } from '../../config/constants.ts';
import { useAuthContext } from '../../lib/auth.tsx';
import { useLayoutsStore } from '../../stores/layouts.ts';
import { useMenusStore } from '../../stores/menus.ts';
import { useSettingsStore } from '../../stores/settings.ts';

import { NavUserMenuContent } from './NavUserMenuContent.tsx';
import { NavUserMenuDropdownToggle } from './NavUserMenuDropdownToggle.tsx';

const MENU_NAME = 'NavUserMenu';

export const NavUserMenu = memo(() => {
  const {
    placementStatus: { view: placement },
    behaviourStatus: { behaviourHtmlData },
    attrMobile,
    attrMenuAnimate,
  } = useMenusStore().value;

  const { user } = useAuthContext();
  const { color } = useSettingsStore().value;
  const { showingNavMenu, layoutShowingNavMenu } = useLayoutsStore();

  const onToggle = (status: boolean, event: ToggleMetadata) => {
    if (event && event.originalEvent && event.originalEvent.stopPropagation)
      event.originalEvent.stopPropagation();
    layoutShowingNavMenu(status ? MENU_NAME : '');
  };

  useEffect(() => {
    layoutShowingNavMenu('');
  }, [attrMenuAnimate, behaviourHtmlData, attrMobile, color, layoutShowingNavMenu]);

  if (!user) {
    return <></>;
  }
  return (
    <Dropdown
      as="div"
      bsPrefix="user-container d-flex"
      onToggle={onToggle}
      show={showingNavMenu === MENU_NAME}
      drop="down"
    >
      <Dropdown.Toggle as={NavUserMenuDropdownToggle} user={user} />
      <Dropdown.Menu
        as={NavUserMenuDropdownMenu}
        className="dropdown-menu dropdown-menu-end user-menu wide"
        popperConfig={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: () => {
                  if (placement === MENU_PLACEMENT.Horizontal) {
                    return [0, 7];
                  }
                  if (window.innerWidth < 768) {
                    return [-84, 7];
                  }

                  return [-78, 7];
                },
              },
            },
          ],
        }}
      />
    </Dropdown>
  );
});

NavUserMenu.displayName = 'NavUserMenu';

interface NavUserMenuDropdownMenuProps {
  style?: CSSProperties;
  className?: string;
}

const NavUserMenuDropdownMenu = memo(
  React.forwardRef<HTMLDivElement, NavUserMenuDropdownMenuProps>(({ style, className }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={classNames('dropdown-menu dropdown-menu-end user-menu wide', className)}
      >
        <NavUserMenuContent />
      </div>
    );
  })
);

NavUserMenuDropdownMenu.displayName = 'NavUserMenuDropdownMenu';
