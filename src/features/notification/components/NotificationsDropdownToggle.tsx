import React, { MouseEvent } from 'react';
import { Bell } from 'react-bootstrap-icons';

type NotificationsDropdownToggleProps = {
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  expanded?: boolean;
};

const NotificationsDropdownToggle = React.memo(
  React.forwardRef<HTMLAnchorElement, NotificationsDropdownToggleProps>(
    ({ onClick, expanded = false }, ref) => (
      <a
        ref={ref}
        href="#/"
        className="notification-button"
        data-toggle="dropdown"
        aria-expanded={expanded}
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          e.stopPropagation();
          onClick(e);
        }}
      >
        <div className="position-relative d-inline-flex">
          <Bell size={18}></Bell>
          <span className="position-absolute notification-dot rounded-xl" />
        </div>
      </a>
    )
  )
);

export default NotificationsDropdownToggle;
