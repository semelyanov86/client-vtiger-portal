import classNames from 'classnames';
import React, { useState } from 'react';
import { Search, Lock, LockFill, Lightning, LightningFill } from 'react-bootstrap-icons';

import { MENU_BEHAVIOUR } from '../../config/constants.ts';
import { useMenusStore } from '../../stores/menus.ts';
import { useSettingsStore } from '../../stores/settings.ts';

import { SearchModal } from './search/SearchModal.tsx';

export const NavIconMenu = () => {
  const { pinButtonEnable, behaviour } = useMenusStore().value;
  const { menuChangeBehaviour } = useMenusStore();
  const { color } = useSettingsStore().value;
  const { setColor } = useSettingsStore();

  const onPinButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (pinButtonEnable) {
      menuChangeBehaviour(
        behaviour === MENU_BEHAVIOUR.Pinned ? MENU_BEHAVIOUR.Unpinned : MENU_BEHAVIOUR.Pinned
      );
    }
  };
  const onDisabledPinButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
            onClick={pinButtonEnable ? onPinButtonClick : onDisabledPinButtonClick}
            className={classNames('pin-button', { disabled: !pinButtonEnable })}
          >
            <LockFill size={18}></LockFill>
            <Lock size={18}></Lock>
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#/" id="colorButton" onClick={onLightDarkModeClick}>
            <Lightning size={18}></Lightning>
            <LightningFill size={18}></LightningFill>
          </a>
        </li>
        {/*<IconMenuNotifications />*/}
      </ul>
      <SearchModal show={showSearchModal} setShow={setShowSearchModal} />
    </>
  );
};
