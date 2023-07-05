import { memo } from 'react';
import * as icons from 'react-bootstrap-icons';

import { DEFAULT_SETTINGS } from '../../../config';

import { MainMenuItem } from './MainMenuItem.tsx';

export type MenuItem = {
  path: string;
  icon?: keyof typeof icons;
  component?: () => JSX.Element;
  label?: string;
  subs?: MenuItem[];
  redirect?: boolean;
  exact?: boolean;
  to?: string;
  isExternal?: boolean;
  megaParent?: boolean;
  mega?: string;
};

interface MainMenuItemsProps {
  menuItems: MenuItem[];
  menuPlacement: string;
  isSubItem: boolean;
}

export const MainMenuItems = memo(
  ({
    menuItems = [],
    menuPlacement = DEFAULT_SETTINGS.MENU_PLACEMENT,
    isSubItem = false,
  }: MainMenuItemsProps) => (
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
