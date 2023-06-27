import React, { useState } from 'react';
import { Search, Moon, MoonFill } from 'react-bootstrap-icons';

import { SearchModal } from '../../features/global-search/components/SearchModal.tsx';
import { Notifications } from '../../features/notification/components/Notifications.tsx';
import { useSettingsStore } from '../../stores/settings.ts';

export const NavIconMenu = () => {
  const { color } = useSettingsStore().value;
  const { setColor } = useSettingsStore();

  const onLightDarkModeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setColor(
      color.includes('light') ? color.replace('light', 'dark') : color.replace('dark', 'light')
    );
  };
  const [showSearchModal, setShowSearchModal] = useState(false);

  const onSearchIconClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowSearchModal(true);
  };

  return (
    <>
      <ul className="list-unstyled list-inline text-center menu-icons">
        <li className="list-inline-item">
          <a href="#/" onClick={onSearchIconClick}>
            <Search size={18}></Search>
          </a>
        </li>
        <Notifications></Notifications>
        <li className="list-inline-item">
          <a href="#/" id="colorButton" onClick={onLightDarkModeClick}>
            {color.includes('light') ? <Moon size={18}></Moon> : <MoonFill size={18}></MoonFill>}
          </a>
        </li>
      </ul>
      <SearchModal show={showSearchModal} setShow={setShowSearchModal} />
    </>
  );
};
