import { Card } from 'react-bootstrap';
import { CalendarDate, EnvelopeAt } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { AuthUser } from '../types';

interface UserSidebarProps {
  user: AuthUser;
}

export const UserAbout = ({ user }: UserSidebarProps) => {
  const registerDate = new Date(user.created_at);
  return (
    <Card>
      <Card.Body>
        <div className="mb-5">
          <p className="text-small text-muted mb-2">
            <FormattedMessage id="user.department"></FormattedMessage>
          </p>
          <p>{user.department}</p>
        </div>
        <div className="mb-5">
          <p className="text-small text-muted mb-2">
            <FormattedMessage id="user.description"></FormattedMessage>
          </p>
          <p>{user.description}</p>
        </div>
        <div className="mb-5">
          <p className="text-small text-muted mb-2">CONTACT</p>
          <NavLink to="#" className="d-block body-link mb-1">
            <CalendarDate className="me-2" size="17" />
            <span className="align-middle">
              {new Intl.DateTimeFormat('en-US').format(registerDate)}
            </span>
          </NavLink>
          <NavLink to="#" className="d-block body-link mb-1">
            <EnvelopeAt className="me-2" size="17" />
            <span className="align-middle">{user.email}</span>
          </NavLink>
        </div>
      </Card.Body>
    </Card>
  );
};
