import React, { ReactNode } from 'react';
import { MainMenuItem } from './MainMenuItem.tsx';
import { DEFAULT_SETTINGS } from '../../../config';

export type MenuItem = {
  path: string;
  icon: ReactNode;
  label: string;
  subs: MenuItem[];
  isExternal: boolean;
  megaParent: boolean;
  mega: string;
};

interface MainMenuItemsProps {
  menuItems: MenuItem[];
  menuPlacement: string;
  isSubItem: boolean;
}

export const MainMenuItems = React.memo<MainMenuItemsProps>(
  ({ menuItems = [], menuPlacement = DEFAULT_SETTINGS.MENU_PLACEMENT, isSubItem = false }) => (
    <>
      {menuItems.map((item, index) => (
        <MainMenuItem
          key={`menu.${item.path}.${index}`}
          id={item.path}
          item={item}
          menuPlacement={menuPlacement}
          isSubItem={isSubItem}
        />
      ))}
    </>
  )
);

MainMenuItems.displayName = 'MainMenuItems';
