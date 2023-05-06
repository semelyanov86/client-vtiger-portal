import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import { getLabel } from '../../../utils/text.tsx';
import { MenuItem } from '../main-menu/MainMenuItems.tsx';

import { SidebarMenuItems } from './SidebarMenuItems.tsx';

interface SidebarMenuItemProps {
  item: MenuItem;
  id: string;
}

export const SidebarMenuItem = ({ item, id }: SidebarMenuItemProps) => {
  const { pathname } = useLocation();

  const isActive = item.path.startsWith('#')
    ? false
    : pathname === item.path || pathname.indexOf(`${item.path}/`) > -1;

  if (item.subs) {
    return (
      <li>
        <NavLink
          to={item.path}
          className={classNames({ active: isActive })}
          data-bs-target={item.path}
        >
          {getLabel(item.label, item.icon)}
        </NavLink>
        <ul>
          <SidebarMenuItems menuItems={item.subs} />
        </ul>
      </li>
    );
  }
  if (item.isExternal) {
    return (
      <li key={id}>
        <a href={item.path} target="_blank" rel="noopener noreferrer">
          {getLabel(item.label, item.icon)}
        </a>
      </li>
    );
  }
  return (
    <li>
      <NavLink to={item.path} className={classNames({ active: isActive })}>
        {getLabel(item.label, item.icon)}
      </NavLink>
    </li>
  );
};
