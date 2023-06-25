import React, { useCallback, useEffect } from 'react';
import { MenuButton } from 'react-bootstrap-icons';

import { useMenusStore } from '../../stores/menus.ts';
import { useScrollSpyStore } from '../../stores/scrollspy.ts';
import ScrollspyMobile from '../Scrollspy/ScrollspyMobile.tsx';

export const NavMobileButtons = () => {
  const { navClasses } = useMenusStore().value;
  const { menuChangeAttrMobile, menuChangeNavClasses } = useMenusStore();
  const { items: scrollspyItems } = useScrollSpyStore();

  // Starts mobile menu opening sequence
  const showMobileMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    menuChangeAttrMobile(true);
    let newNavClasses = {
      ...navClasses,
      'mobile-top-out': true,
      'mobile-top-in': false,
      'mobile-top-ready': false,
      'mobile-side-in': false,
      'mobile-side-ready': false,
    };
    menuChangeNavClasses(newNavClasses);
    setTimeout(() => {
      newNavClasses = {
        ...newNavClasses,
        'mobile-top-out': false,
        'mobile-side-ready': true,
      };
      menuChangeNavClasses(newNavClasses);
    }, 200);
    setTimeout(() => {
      newNavClasses = {
        ...newNavClasses,
        'mobile-side-in': true,
      };
      menuChangeNavClasses(newNavClasses);
    }, 230);
  };

  // Starts mobile menu closing sequence
  const hideMobileMenu = useCallback(() => {
    let newNavClasses = {
      ...navClasses,
      'mobile-side-out': true,
      'mobile-side-ready': true,
      'mobile-side-in': false,
      'mobile-top-ready': false,
      'mobile-top-in': false,
      'mobile-top-out': false,
    };
    menuChangeNavClasses(newNavClasses);
    setTimeout(() => {
      newNavClasses = {
        ...newNavClasses,
        'mobile-side-ready': false,
        'mobile-side-out': false,
        'mobile-top-ready': true,
      };
      menuChangeNavClasses(newNavClasses);
    }, 200);
    setTimeout(() => {
      newNavClasses = {
        ...newNavClasses,
        'mobile-top-in': true,
        'mobile-top-ready': true,
      };
      menuChangeNavClasses(newNavClasses);
      menuChangeAttrMobile(false);
    }, 230);
  }, [menuChangeAttrMobile, menuChangeNavClasses, navClasses]);

  useEffect(() => {
    if (navClasses && navClasses['mobile-side-in']) {
      window.addEventListener('click', hideMobileMenu);
    }
    return () => {
      window.removeEventListener('click', hideMobileMenu);
    };
  }, [hideMobileMenu, navClasses]);

  return (
    <div className="mobile-buttons-container">
      {scrollspyItems && scrollspyItems.length > 0 && <ScrollspyMobile items={scrollspyItems} />}
      <a href="#/" id="mobileMenuButton" className="menu-button" onClick={showMobileMenu}>
        <MenuButton></MenuButton>
      </a>
    </div>
  );
};
