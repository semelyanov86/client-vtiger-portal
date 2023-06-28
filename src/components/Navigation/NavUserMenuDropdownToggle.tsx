import React from 'react';
import { PersonFill } from 'react-bootstrap-icons';

import { AuthUser } from '../../features/auth';

interface NavUserMenuDropdownToggleProps {
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  expanded?: boolean;
  user?: AuthUser;
}

export const NavUserMenuDropdownToggle = React.memo(
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
          <PersonFill size={17} color="primary" data-testid="user-icon" />
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
