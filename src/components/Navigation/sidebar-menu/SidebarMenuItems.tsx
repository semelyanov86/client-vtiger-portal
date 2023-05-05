import React from 'react';

import { MenuItem } from '../main-menu/MainMenuItems.tsx';

import { SidebarMenuItem } from './SidebarMenuItem.tsx';

interface SidebarMenuItemsProps {
  menuItems: MenuItem[];
}

export const SidebarMenuItems = React.memo<SidebarMenuItemsProps>(({ menuItems }) => {
  return (
    <>
      {menuItems.map((item, index) => (
        <SidebarMenuItem key={`menu.${item.path}.${index}`} id={item.path} item={item} />
      ))}
    </>
  );
});
SidebarMenuItems.displayName = 'SidebarMenuItems';
