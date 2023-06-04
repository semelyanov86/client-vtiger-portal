import { ToggleMetadata } from '@restart/ui/Dropdown';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import React, { CSSProperties, useEffect } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { Question, File, Gear, Lock, PersonFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

import { MENU_PLACEMENT } from '../../config/constants.ts';
import { AuthUser } from '../../features/auth';
import { useAuthContext } from '../../lib/auth.tsx';
import { useLayoutsStore } from '../../stores/layouts.ts';
import { useMenusStore } from '../../stores/menus.ts';
import { useSettingsStore } from '../../stores/settings.ts';
import { FormattedMessage } from 'react-intl';

const MENU_NAME = 'NavUserMenu';

export const NavUserMenu = () => {
  const {
    placementStatus: { view: placement },
    behaviourStatus: { behaviourHtmlData },
    attrMobile,
    attrMenuAnimate,
  } = useMenusStore().value;

  const { user } = useAuthContext();
  const { color } = useSettingsStore().value;
  const { showingNavMenu, layoutShowingNavMenu } = useLayoutsStore();

  const onToggle = (status: boolean, event: ToggleMetadata) => {
    if (event && event.originalEvent && event.originalEvent.stopPropagation)
      event.originalEvent.stopPropagation();
    layoutShowingNavMenu(status ? MENU_NAME : '');
  };

  useEffect(() => {
    layoutShowingNavMenu('');
  }, [attrMenuAnimate, behaviourHtmlData, attrMobile, color, layoutShowingNavMenu]);

  if (!user) {
    return <></>;
  }
  return (
    <Dropdown
      as="div"
      bsPrefix="user-container d-flex"
      onToggle={onToggle}
      show={showingNavMenu === MENU_NAME}
      drop="down"
    >
      <Dropdown.Toggle as={NavUserMenuDropdownToggle} user={user} />
      <Dropdown.Menu
        as={NavUserMenuDropdownMenu}
        className="dropdown-menu dropdown-menu-end user-menu wide"
        popperConfig={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: () => {
                  if (placement === MENU_PLACEMENT.Horizontal) {
                    return [0, 7];
                  }
                  if (window.innerWidth < 768) {
                    return [-84, 7];
                  }

                  return [-78, 7];
                },
              },
            },
          ],
        }}
      />
    </Dropdown>
  );
};

const NavUserMenuContent = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const onLogout = () => {
    logout();
    navigate('/auth/login');
  };
  return (
    <div>
      <Row className="mb-3 ms-0 me-0">
        <Col xs="12" className="ps-1 mb-2">
          <div className="text-extra-small text-primary">ACCOUNT</div>
        </Col>
        <Col xs="6" className="ps-1 pe-1">
          <ul className="list-unstyled">
            <li>
              <NavLink to="/app/user/info">
                <FormattedMessage id="user.info"></FormattedMessage>
              </NavLink>
            </li>
            <li>
              <a href="#/!">Preferences</a>
            </li>
          </ul>
        </Col>
        <Col xs="6" className="ps-1 pe-1">
          <ul className="list-unstyled">
            <li>
              <NavLink to="/app/user/security">
                <FormattedMessage id="otp.header"></FormattedMessage>
              </NavLink>
            </li>
            <li>
              <a href="#/!">Billing</a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="mb-1 ms-0 me-0">
        <Col xs="12" className="p-1 mb-3 pt-3">
          <div className="separator-light" />
        </Col>
        <Col xs="6" className="ps-1 pe-1">
          <ul className="list-unstyled">
            <li>
              <a href="#/!">
                <Question size={17} /> <span className="align-middle">Help</span>
              </a>
            </li>
            <li>
              <a href="#/!">
                <File size={17} /> <span className="align-middle">Docs</span>
              </a>
            </li>
          </ul>
        </Col>
        <Col xs="6" className="pe-1 ps-1">
          <ul className="list-unstyled">
            <li>
              <a href="#/!">
                <Gear size={17} /> <span className="align-middle">Settings</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={onLogout}>
                <Lock size={17} /> <span className="align-middle">Logout</span>
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

interface NavUserMenuDropdownToggleProps {
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  expanded?: boolean;
  user?: AuthUser;
}

const NavUserMenuDropdownToggle = React.memo(
  React.forwardRef<HTMLAnchorElement, NavUserMenuDropdownToggleProps>(
    ({ onClick, expanded = false, user = {} as AuthUser }, ref) => (
      <a
        href="#/!"
        ref={ref}
        className="d-flex user position-relative"
        data-toggle="dropdown"
        aria-expanded={expanded}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick(e);
        }}
      >
        {user.imagecontent ? (
          <img
            className="profile"
            alt={user.firstname + ' ' + user.lastname + ' Image'}
            src={'data:image/png;base64, ' + user.imagecontent}
          />
        ) : (
          <PersonFill size={17} color="primary" />
        )}
        <div className="name ms-2">
          {user.lastname && user.lastname != 'undefined'
            ? user.firstname + ' ' + user.lastname
            : ''}
        </div>
      </a>
    )
  )
);

interface NavUserMenuDropdownMenuProps {
  style?: CSSProperties;
  className?: string;
}

const NavUserMenuDropdownMenu = React.memo(
  React.forwardRef<HTMLDivElement, NavUserMenuDropdownMenuProps>(({ style, className }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={classNames('dropdown-menu dropdown-menu-end user-menu wide', className)}
      >
        <NavUserMenuContent />
      </div>
    );
  })
);

NavUserMenuDropdownMenu.displayName = 'NavUserMenuDropdownMenu';
