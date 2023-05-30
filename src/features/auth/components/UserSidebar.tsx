import { Card } from 'react-bootstrap';
import { Geo } from 'react-bootstrap-icons';

import { AuthUser } from '../types';

interface UserSidebarProps {
  user: AuthUser;
}

export const UserSidebar = ({ user }: UserSidebarProps) => {
  let image = (
    <img src="/img/profile/profile-11.webp" className="img-fluid rounded-xl" alt={user.lastname} />
  );
  if (user.imagecontent) {
    image = (
      <img
        src={'data:image/png;base64, ' + user.imagecontent}
        className="img-fluid rounded-xl"
        alt={user.lastname}
      />
    );
  }
  return (
    <Card className="mb-5">
      <Card.Body>
        <div className="d-flex align-items-center flex-column mb-4">
          <div className="d-flex align-items-center flex-column">
            <div className="sw-13 position-relative mb-3">{image}</div>
            <div className="h5 mb-0">{user.lastname + ' ' + user.firstname}</div>
            <div className="text-muted">{user.title}</div>
            <div className="text-muted">
              <Geo className="me-1"></Geo>
              <span className="align-middle">
                {user.mailingcity}, {user.mailingcountry}
              </span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
