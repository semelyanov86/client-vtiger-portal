import classNames from 'classnames';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Icon } from 'react-bootstrap-icons';
import { useIntl } from 'react-intl';
import { NavLink, useLocation } from 'react-router-dom';

import { DEFAULT_SETTINGS, USE_MULTI_LANGUAGE } from '../../../config';
import { MENU_PLACEMENT } from '../../../config/constants.ts';
import { useLayoutsStore } from '../../../stores/layouts.ts';
import { useMenusStore } from '../../../stores/menus.ts';

import HorizontalMenuDropdownToggle from './HorizontalMenuDropdownToggle.tsx';
import { MainMenuItems, MenuItem } from './MainMenuItems.tsx';

interface Props {
  item: MenuItem;
  id: string;
  isSubItem?: boolean;
  menuPlacement?: string;
}

export const MainMenuItem = memo(
  ({ item, id, isSubItem = false, menuPlacement = DEFAULT_SETTINGS.MENU_PLACEMENT }: Props) => {
    const dropdownMenuRef = useRef<HTMLUListElement>(null);
    const { collapseAll } = useMenusStore().value;
    const { menuChangeCollapseAll } = useMenusStore();
    const { showingNavMenu, layoutShowingNavMenu } = useLayoutsStore();
    const { pathname } = useLocation();
    const isActive = item.path.startsWith('#')
      ? false
      : pathname === item.path || pathname.indexOf(`${item.path}/`) > -1;

    const { formatMessage: f } = useIntl();
    const [verticalMenuCollapseExpanded, setVerticalMenuCollapseExpanded] = useState(isActive);
    const [horizontalDropdownIsOpen, setHorizontalDropdownIsOpen] = useState(false);

    const getLabel = (label: string, icon?: Icon) => (
      <>
        {icon && <>{icon} </>}
        <span className="label">{USE_MULTI_LANGUAGE ? f({ id: label }) : label}</span>
      </>
    );

    const onToggleItem = (isOpen: boolean) => {
      setHorizontalDropdownIsOpen(isOpen);
    };

    const onVerticalMenuCollapseClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setVerticalMenuCollapseExpanded(!verticalMenuCollapseExpanded);
      menuChangeCollapseAll(false);
    };

    const onHorizontalMenuDropdownToggleClick = () => {
      onToggleItem(!horizontalDropdownIsOpen);
      layoutShowingNavMenu('');
    };

    useEffect(() => {
      if (showingNavMenu !== '' && horizontalDropdownIsOpen) {
        onToggleItem(false);
      }
    }, [showingNavMenu, horizontalDropdownIsOpen]);

    if (item.subs && menuPlacement === MENU_PLACEMENT.Horizontal && !item.megaParent) {
      return (
        <Dropdown
          as="li"
          key={id}
          onToggle={onToggleItem}
          className={classNames({ mega: item.mega })}
          show={horizontalDropdownIsOpen}
        >
          <Dropdown.Toggle
            as={HorizontalMenuDropdownToggle}
            onClick={onHorizontalMenuDropdownToggleClick}
            href={item.path}
            active={isActive}
          >
            {getLabel(item.label ?? '', item.icon)}
          </Dropdown.Toggle>
          <Dropdown.Menu
            ref={dropdownMenuRef as React.RefObject<HTMLUListElement>}
            renderOnMount
            as="ul"
            align="start"
            className={classNames('opacityIn', {
              'row align-items-start': item.mega,
              [`row-cols-${item.subs.length}`]: item.mega,
            })}
            popperConfig={{
              strategy: item.mega ? 'fixed' : 'absolute',
              modifiers: [
                {
                  name: 'computeStyles',
                  options: {
                    gpuAcceleration: true, // true by default
                    adaptive: false,
                    roundOffsets: ({ x, y }: { x: number; y: number }) => {
                      if (item.mega && dropdownMenuRef.current) {
                        try {
                          return {
                            x: Math.round(
                              (window.innerWidth - dropdownMenuRef.current.clientWidth) / 2 - 8
                            ),
                            y: y + 7,
                          };
                        } catch (e) {
                          console.warn('error:', e);
                        }
                      }
                      if (isSubItem) {
                        return { x, y: y - 34 };
                      }
                      return { x, y: y + 2 };
                    },
                  },
                },
              ],
            }}
          >
            <MainMenuItems menuItems={item.subs} menuPlacement={menuPlacement} isSubItem />
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    if (item.subs && menuPlacement === MENU_PLACEMENT.Horizontal) {
      return (
        <li className="dropdown col d-flex flex-column">
          <NavLink to={item.path} className={classNames('dropdown-toggle', { active: isActive })}>
            {getLabel(item.label ?? '', item.icon)}
          </NavLink>
          <ul>
            <MainMenuItems menuItems={item.subs} menuPlacement={menuPlacement} isSubItem />
          </ul>
        </li>
      );
    }
    if (item.subs && menuPlacement === MENU_PLACEMENT.Vertical) {
      return (
        <li>
          <a
            href={item.path}
            data-bs-toggle="collapse"
            role="button"
            className={classNames({ active: isActive })}
            aria-expanded={verticalMenuCollapseExpanded && !collapseAll}
            onClick={onVerticalMenuCollapseClick}
          >
            {getLabel(item.label ?? '', item.icon)}
          </a>
          <Collapse in={verticalMenuCollapseExpanded && !collapseAll}>
            <ul>
              <MainMenuItems menuItems={item.subs} menuPlacement={menuPlacement} isSubItem />
            </ul>
          </Collapse>
        </li>
      );
    }
    if (item.isExternal) {
      return (
        <li key={id}>
          <a href={item.path} target="_blank" rel="noopener noreferrer">
            {getLabel(item.label ?? '', item.icon)}
          </a>
        </li>
      );
    }
    if (!isSubItem || menuPlacement === MENU_PLACEMENT.Vertical) {
      return (
        <li>
          <NavLink to={item.path} className={classNames({ active: isActive })}>
            {getLabel(item.label ?? '', item.icon)}
          </NavLink>
        </li>
      );
    }
    if (menuPlacement === MENU_PLACEMENT.Horizontal && item.megaParent) {
      return (
        <li className="col d-flex flex-column">
          <NavLink to={item.path} className={classNames({ active: isActive })}>
            {getLabel(item.label ?? '', item.icon)}
          </NavLink>
        </li>
      );
    }
    return (
      <Dropdown.Item as="li">
        <NavLink to={item.path} className={classNames({ active: isActive })}>
          {getLabel(item.label ?? '', item.icon)}
        </NavLink>
      </Dropdown.Item>
    );
  }
);
MainMenuItem.displayName = 'MainMenuItem';
