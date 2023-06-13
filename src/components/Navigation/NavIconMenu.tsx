import classNames from 'classnames';
import React, { useState } from 'react';
import { Search, Pin, PinAngle, Moon, MoonFill } from 'react-bootstrap-icons';

import { MENU_BEHAVIOUR } from '../../config/constants.ts';
import { SearchModal } from '../../features/global-search/components/SearchModal.tsx';
import { useMenusStore } from '../../stores/menus.ts';
import { useSettingsStore } from '../../stores/settings.ts';

export const NavIconMenu = () => {
  const { pinButtonEnable, behaviour } = useMenusStore().value;
  const { menuChangeBehaviour } = useMenusStore();
  const { color } = useSettingsStore().value;
  const { setColor } = useSettingsStore();

  const onPinButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    menuChangeBehaviour(
      behaviour === MENU_BEHAVIOUR.Pinned ? MENU_BEHAVIOUR.Unpinned : MENU_BEHAVIOUR.Pinned
    );
  };

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
        <li className="list-inline-item">
          <a
            href="#/"
            id="pinButton"
            onClick={onPinButtonClick}
            className={classNames('pin-button', { disabled: !pinButtonEnable })}
          >
            {behaviour === MENU_BEHAVIOUR.Pinned ? (
              <Pin size={18}></Pin>
            ) : (
              <PinAngle size={18}></PinAngle>
            )}
          </a>
        </li>
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
