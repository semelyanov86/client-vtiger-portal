import classNames from 'classnames';
import { Card } from 'react-bootstrap';
import { CalendarDate, EnvelopeAt, Phone } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { AuthUser } from '../types';

import { SideBlockHeader } from './molecules/SideBlockHeader.tsx';

interface UserSidebarProps {
  user: AuthUser;
}

export const UserAbout = ({ user }: UserSidebarProps) => {
  let registerDate = new Date();
  if (user.created_at) {
    registerDate = new Date(user.created_at);
  }
  const navLinkClasses = ['d-block', 'body-link', 'mb-1'];

  return (
    <Card>
      <Card.Body>
        <div className="mb-5">
          <SideBlockHeader>
            <FormattedMessage id="user.department"></FormattedMessage>
          </SideBlockHeader>
          <p>{user.department}</p>
        </div>
        <div className="mb-5">
          <SideBlockHeader>
            <FormattedMessage id="user.description"></FormattedMessage>
          </SideBlockHeader>
          <p>{user.description}</p>
        </div>
        <div className="mb-5">
          <SideBlockHeader>
            <FormattedMessage id="manager.contact"></FormattedMessage>
          </SideBlockHeader>
          <NavLink to="#" className={classNames(navLinkClasses)}>
            <CalendarDate className="me-2" size="17" />
            <span className="align-middle">
              {new Intl.DateTimeFormat('en-US').format(registerDate)}
            </span>
          </NavLink>
          <NavLink to="#" className={classNames(navLinkClasses)}>
            <EnvelopeAt className="me-2" size="17" />
            <span className="align-middle">{user.email}</span>
          </NavLink>
          <NavLink to="#" className={classNames(navLinkClasses)}>
            <Phone className="me-2" size="17" />
            <span className="align-middle">{user.phone}</span>
          </NavLink>
        </div>
      </Card.Body>
    </Card>
  );
};
