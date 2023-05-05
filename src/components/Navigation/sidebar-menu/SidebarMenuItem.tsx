import classNames from 'classnames';
import { Icon } from 'react-bootstrap-icons';
import { useIntl } from 'react-intl';
import { NavLink, useLocation } from 'react-router-dom';

import { USE_MULTI_LANGUAGE } from '../../../config';
import { MenuItem } from '../main-menu/MainMenuItems.tsx';

import { SidebarMenuItems } from './SidebarMenuItems.tsx';

interface SidebarMenuItemProps {
  item: MenuItem;
  id: string;
}

export const SidebarMenuItem = ({ item, id }: SidebarMenuItemProps) => {
  const { pathname } = useLocation();
  const { formatMessage: f } = useIntl();

  const isActive = item.path.startsWith('#')
    ? false
    : pathname === item.path || pathname.indexOf(`${item.path}/`) > -1;

  const getLabel = (icon?: Icon, label?: string) => (
    <>
      {icon && <>{icon} </>}
      <span className="label">{USE_MULTI_LANGUAGE ? f({ id: label }) : label}</span>
    </>
  );

  if (item.subs) {
    return (
      <li>
        <NavLink
          to={item.path}
          className={classNames({ active: isActive })}
          data-bs-target={item.path}
        >
          {getLabel(item.icon, item.label)}
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
          {getLabel(item.icon, item.label)}
        </a>
      </li>
    );
  }
  return (
    <li>
      <NavLink to={item.path} className={classNames({ active: isActive })}>
        {getLabel(item.icon, item.label)}
      </NavLink>
    </li>
  );
};
