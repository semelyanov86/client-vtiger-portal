import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { useAllUsers } from '../api/allUsers.ts';

export const AllUsersWidget = () => {
  const usersQuery = useAllUsers();

  if (usersQuery.isLoading) {
    return <Spinner animation="border" variant="primary" data-testid="spinner"></Spinner>;
  }
  if (!usersQuery.data || usersQuery.data.length < 1) {
    return (
      <p data-testid="no-data-message">
        <FormattedMessage id="general.no-data"></FormattedMessage>
      </p>
    );
  }
  return (
    <Card className="h-50-card mb-n2">
      <Card.Body>
        {usersQuery.data.map((user) => (
          <Row key={user.crmid} className="g-0 sh-10 sh-sm-7 mb-2">
            <Col xs="auto">
              {user.imagecontent ? (
                <img
                  src={'data:image/png;base64, ' + user.imagecontent}
                  className="card-img rounded-xl sh-6 sw-6"
                  alt="thumb"
                />
              ) : (
                <img
                  src="/img/profile/profile-11.webp"
                  className="card-img rounded-xl sh-6 sw-6"
                  alt="thumb"
                />
              )}
            </Col>
            <Col>
              <div className="d-flex flex-column flex-sm-row ps-4 h-100 align-items-sm-center justify-content-sm-between">
                <div className="d-flex flex-column mb-2 mb-sm-0">
                  <div>
                    {user.firstname} {user.lastname}
                  </div>
                  <div className="text-small text-muted">{user.title}</div>
                </div>
                <div className="d-flex">{user.email}</div>
              </div>
            </Col>
          </Row>
        ))}
      </Card.Body>
    </Card>
  );
};
