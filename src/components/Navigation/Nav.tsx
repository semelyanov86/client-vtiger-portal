import classNames from 'classnames';
import React, { useRef } from 'react';

import { MENU_BEHAVIOUR, MENU_PLACEMENT } from '../../config/constants.ts';
import { useMenusStore } from '../../stores/menus.ts';

import MainMenu from './main-menu/MainMenu.tsx';
import { NavIconMenu } from './NavIconMenu.tsx';
import { NavLanguageSwitcher } from './NavLanguageSwitcher.tsx';
import { NavLogo } from './NavLogo.tsx';
import { NavMobileButtons } from './NavMobileButtons.tsx';
import { NavUserMenu } from './NavUserMenu.tsx';

const DELAY = 80;

export const Nav: React.FC = () => {
  const { navClasses, placementStatus, behaviourStatus, attrMobile, menuPadding } =
    useMenusStore().value;

  const { menuChangeCollapseAll, menuChangeAttrMenuAnimate } = useMenusStore();
  const mouseActionTimer = useRef<NodeJS.Timeout | null>(null);

  // Vertical menu semihidden state showing
  // Only works when the vertical menu is active and mobile menu closed
  const onMouseEnterDelay = () => {
    if (
      placementStatus.placementHtmlData === MENU_PLACEMENT.Vertical &&
      behaviourStatus.behaviourHtmlData === MENU_BEHAVIOUR.Unpinned &&
      !attrMobile
    ) {
      menuChangeCollapseAll(false);
      menuChangeAttrMenuAnimate('show');
    }
  };

  // Delayed one that hides or shows the menu. It's required to prevent collapse animation getting stucked
  const onMouseEnter = () => {
    if (mouseActionTimer.current) clearTimeout(mouseActionTimer.current);

    mouseActionTimer.current = setTimeout(() => {
      onMouseEnterDelay();
    }, DELAY);
  };

  // Vertical menu semihidden state hiding
  // Only works when the vertical menu is active and mobile menu closed
  const onMouseLeaveDelay = () => {
    if (
      placementStatus.placementHtmlData === MENU_PLACEMENT.Vertical &&
      behaviourStatus.behaviourHtmlData === MENU_BEHAVIOUR.Unpinned &&
      attrMobile !== true
    ) {
      menuChangeCollapseAll(true);
      menuChangeAttrMenuAnimate('hidden');
    }
  };

  const onMouseLeave = () => {
    if (mouseActionTimer.current) clearTimeout(mouseActionTimer.current);
    mouseActionTimer.current = setTimeout(() => {
      onMouseLeaveDelay();
    }, DELAY);
  };

  return (
    <div
      id="nav"
      className={classNames('nav-container d-flex', {
        'mobile-side-in': navClasses ? navClasses['mobile-side-in'] : false,
        'mobile-side-ready': navClasses ? navClasses['mobile-side-ready'] : false,
        'mobile-top-out': navClasses ? navClasses['mobile-top-out'] : false,
        'mobile-top-in': navClasses ? navClasses['mobile-top-in'] : false,
        'mobile-top-ready': navClasses ? navClasses['mobile-top-ready'] : false,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="nav-content d-flex"
        style={
          placementStatus.placementHtmlData === MENU_PLACEMENT.Horizontal && menuPadding
            ? { paddingRight: menuPadding }
            : {}
        }
      >
        <NavLogo />
        <NavLanguageSwitcher />
        <NavUserMenu />
        <NavIconMenu />
        <MainMenu />
        <NavMobileButtons />
      </div>
      <div className="nav-shadow" />
    </div>
  );
};
export default React.memo(Nav);
