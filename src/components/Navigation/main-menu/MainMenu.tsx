import classNames from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { memo, useCallback, useEffect, useMemo } from 'react';

import { MENU_BEHAVIOUR, MENU_PLACEMENT } from '../../../config/constants.ts';
import { useWindowScroll } from '../../../hooks/useWindowScroll.ts';
import { useWindowSize } from '../../../hooks/useWindowSize.ts';
import { getMenuItems } from '../../../routes/helper.ts';
import { menuRoutes } from '../../../routes/menuRoutes.ts';
import { useLayoutsStore } from '../../../stores/layouts.ts';
import { BreakpointsInterface, navClassesInterface, useMenusStore } from '../../../stores/menus.ts';

import {
  checkBehaviour,
  checkPlacement,
  isDeeplyDiffBehaviourStatus,
  isDeeplyDiffPlacementStatus,
} from './helper.ts';
import { MainMenuItems } from './MainMenuItems.tsx';

export const MainMenu = memo(() => {
  const {
    placement,
    behaviour,
    placementStatus,
    behaviourStatus,
    attrMobile,
    breakpoints,
    useSidebar,
  } = useMenusStore().value;
  const {
    menuChangeAttrMenuAnimate,
    menuChangeNavClasses,
    menuChangeAttrMobile,
    menuChangeCollapseAll,
    menuChangePinButtonEnable,
    menuChangePlacementStatus,
    menuChangeBehaviourStatus,
  } = useMenusStore();
  const { layoutShowingNavMenu } = useLayoutsStore();
  const scrolled = useWindowScroll();
  const { width } = useWindowSize();

  const menuItemsMemo = useMemo(
    () => getMenuItems(attrMobile && useSidebar ? menuRoutes : menuRoutes.mainMenuItems),
    [attrMobile, useSidebar]
  );

  useEffect(() => {
    menuChangeAttrMenuAnimate('');
    layoutShowingNavMenu('');

    if (placementStatus.status === 2 || placementStatus.status === 4) {
      // Switching back from the mobile menu layout fast
      menuChangeNavClasses({} as navClassesInterface);
      menuChangeAttrMobile(false);
    }
    // Prevents menu animation to make a fast switch
    if (behaviourStatus.status === 1) {
      menuChangeCollapseAll(true);
      menuChangePinButtonEnable(true);
    } else if (behaviourStatus.status === 2) {
      menuChangeCollapseAll(true);
      menuChangePinButtonEnable(false);
    } else if (behaviourStatus.status === 3) {
      menuChangePinButtonEnable(true);
      menuChangeCollapseAll(false);
    } else if (behaviourStatus.status === 4) {
      menuChangePinButtonEnable(false);
      menuChangeCollapseAll(true);
    } else if (behaviourStatus.status === 5) {
      menuChangeCollapseAll(false);
      menuChangePinButtonEnable(true);
    } else if (behaviourStatus.status === 6) {
      menuChangeCollapseAll(false);
      menuChangePinButtonEnable(true);
    }
    // eslint-disable-next-line
  }, [behaviourStatus, placementStatus]);

  useEffect(() => {
    if (
      placementStatus.placementHtmlData === MENU_PLACEMENT.Vertical &&
      behaviourStatus.behaviourHtmlData === MENU_BEHAVIOUR.Unpinned &&
      attrMobile !== true
    ) {
      menuChangeCollapseAll(true);
      menuChangeAttrMenuAnimate('hidden');
    }
    return () => {};
    // eslint-disable-next-line
  }, [attrMobile]);

  useEffect(() => {
    if (
      placementStatus.placementHtmlData === MENU_PLACEMENT.Horizontal &&
      !attrMobile &&
      behaviourStatus.behaviourHtmlData === MENU_BEHAVIOUR.Unpinned
    ) {
      if (scrolled) {
        menuChangeAttrMenuAnimate('hidden');
        // Hiding all dropdowns to make sure they are closed when menu collapses
        document.documentElement.click();
      } else {
        menuChangeAttrMenuAnimate('');
      }
    }
    return () => {};
    // eslint-disable-next-line
  }, [scrolled]);

  const getMenuStatus = useCallback(
    (pBreakpoints: BreakpointsInterface, pPlacement: string, pBehaviour: string) => {
      if (pBreakpoints) {
        const placementStatusCB = checkPlacement({
          placement: pPlacement,
          breakpoints: pBreakpoints,
          placementStatus: placementStatus,
          behaviourStatus: behaviourStatus,
        });
        const behaviourStatusCB = checkBehaviour({
          placement: placementStatusCB.placementHtmlData,
          behaviour: pBehaviour,
          breakpoints: pBreakpoints,
          placementStatus: placementStatus,
          behaviourStatus: behaviourStatus,
        });

        if (isDeeplyDiffPlacementStatus(placementStatusCB, placementStatus)) {
          menuChangePlacementStatus(placementStatusCB);
        }
        if (isDeeplyDiffBehaviourStatus(behaviourStatusCB, behaviourStatus)) {
          menuChangeBehaviourStatus(behaviourStatusCB);
        }
      }
    },
    [placementStatus, behaviourStatus, menuChangePlacementStatus, menuChangeBehaviourStatus]
  );

  useEffect(() => {
    if (width && placement && behaviour && breakpoints) {
      getMenuStatus(breakpoints, placement, behaviour);
    }
    // eslint-disable-next-line
  }, [width, breakpoints, placement, behaviour]);

  // Initializes the horizontal menu
  // Customizes dropdown clicks to prevent auto closing and making sure all sub menus are closed when parent is closed
  if (menuItemsMemo) {
    if (placement === MENU_PLACEMENT.Horizontal) {
      return (
        <div className="menu-container flex-grow-1">
          <ul id="menu" className={classNames('menu show')}>
            <MainMenuItems
              menuItems={menuItemsMemo}
              menuPlacement={placementStatus.view}
              isSubItem={false}
            />
          </ul>
        </div>
      );
    }
    // Vertical menu scrollbar init
    return (
      <OverlayScrollbarsComponent
        options={{
          scrollbars: { autoHide: 'leave', autoHideDelay: 600 },
          overflow: { x: 'hidden', y: 'scroll' },
        }}
        className="menu-container flex-grow-1"
      >
        <ul id="menu" className={classNames('menu show')}>
          <MainMenuItems
            menuItems={menuItemsMemo}
            menuPlacement={placementStatus.view}
            isSubItem={false}
          />
        </ul>
      </OverlayScrollbarsComponent>
    );
  }
  return <></>;
});

MainMenu.displayName = 'MainMenu';
