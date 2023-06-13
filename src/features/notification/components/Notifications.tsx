import { ToggleMetadata } from '@restart/ui/Dropdown';
import { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';

import { MENU_PLACEMENT } from '../../../config/constants.ts';
import { useLayoutsStore } from '../../../stores/layouts.ts';
import { useMenusStore } from '../../../stores/menus.ts';
import { useSettingsStore } from '../../../stores/settings.ts';
import { Notification } from '../types';

import NotificationsDropdownMenu from './NotificationsDropdownMenu.tsx';
import NotificationsDropdownToggle from './NotificationsDropdownToggle.tsx';

const MENU_NAME = 'Notifications';

export const Notifications = () => {
  const menusStore = useMenusStore();
  const settingsStore = useSettingsStore();
  const notifications: Notification[] = [];
  const layoutStore = useLayoutsStore();

  useEffect(() => {
    notifications.push({
      crmid: '11x1',
      description: 'Test notification',
      label: 'Test',
      manager: {},
      module: 'HelpDesk',
    } as Notification);
    return () => {};
    // eslint-disable-next-line
  }, []);

  const onToggle = (status: boolean, event: ToggleMetadata) => {
    if (event && event.originalEvent && event.originalEvent.stopPropagation)
      event.originalEvent.stopPropagation();
    layoutStore.layoutShowingNavMenu(status ? MENU_NAME : '');
  };

  useEffect(() => {
    layoutStore.layoutShowingNavMenu('');
    // eslint-disable-next-line
  }, [
    menusStore.value.attrMenuAnimate,
    menusStore.value.behaviour,
    menusStore.value.attrMobile,
    settingsStore.value.color,
  ]);

  if (notifications && notifications.length > 0) {
    return (
      <Dropdown
        as="li"
        bsPrefix="list-inline-item"
        onToggle={onToggle}
        show={layoutStore.showingNavMenu === MENU_NAME}
        align={menusStore.value.placement === MENU_PLACEMENT.Horizontal ? 'end' : 'start'}
      >
        <Dropdown.Toggle as={NotificationsDropdownToggle} />
        <Dropdown.Menu
          as={NotificationsDropdownMenu}
          items={notifications}
          popperConfig={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: () => {
                    if (menusStore.value.placement === MENU_PLACEMENT.Horizontal) {
                      return [0, 7];
                    }
                    if (window.innerWidth < 768) {
                      return [-168, 7];
                    }
                    return [-162, 7];
                  },
                },
              },
            ],
          }}
        />
      </Dropdown>
    );
  }
  return (
    <li className="list-inline-item">
      <a href="#" id="notificataionButton">
        <Bell size={18}></Bell>
      </a>
    </li>
  );
};
