import classNames from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { CSSProperties } from 'react';

import { Notification } from '../types';

import { NotificationItem } from './NotificationItem.tsx';

type NotificationsDropdownMenuProps = {
  style?: CSSProperties;
  className?: string;
  labeledBy?: string;
  items: Notification[];
};

const NotificationsDropdownMenu = React.memo(
  React.forwardRef<HTMLDivElement, NotificationsDropdownMenuProps>(
    ({ style, className, labeledBy, items }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={classNames('wide notification-dropdown scroll-out', className)}
          aria-labelledby={labeledBy}
        >
          <OverlayScrollbarsComponent
            options={{
              scrollbars: { autoHide: 'leave', autoHideDelay: 600 },
              overflow: { x: 'hidden', y: 'scroll' },
            }}
            className="scroll"
          >
            <ul className="list-unstyled border-last-none">
              {items.map((item, itemIndex) => (
                <NotificationItem
                  key={`notificationItem.${itemIndex}`}
                  detail={item.description}
                  link={item.label}
                  img={'/img/profile/profile-11.webp'}
                />
              ))}
            </ul>
          </OverlayScrollbarsComponent>
        </div>
      );
    }
  )
);

NotificationsDropdownMenu.displayName = 'NotificationsDropdownMenu';

export default NotificationsDropdownMenu;
