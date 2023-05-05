import { useMemo } from 'react';
import { Col } from 'react-bootstrap';

import { getMenuItems } from '../../../routes/helper.ts';
import { menuRoutes } from '../../../routes/menuRoutes.ts';
import { useMenusStore } from '../../../stores/menus.ts';

import { SidebarMenuItems } from './SidebarMenuItems.tsx';

export const SidebarMenu = () => {
  const { useSidebar } = useMenusStore().value;

  const menuItemsMemo = useMemo(() => getMenuItems(menuRoutes.sidebarItems), []);

  if (!useSidebar) {
    return <></>;
  }

  return (
    <Col xs="auto" className="side-menu-container">
      <ul className="sw-25 side-menu mb-0 primary" id="menuSide">
        <SidebarMenuItems menuItems={menuItemsMemo} />
      </ul>
    </Col>
  );
};
