import { Card } from 'react-bootstrap';
import { Phone, EnvelopeAt, Geo } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import useManagerStore from '../stores/manager.ts';

export const ManagerInfo = () => {
  const { manager } = useManagerStore();

  return (
    <Card>
      <Card.Body>
        <div className="mb-5">
          <p className="text-small text-muted mb-2">
            <FormattedMessage id="manager.name"></FormattedMessage>
          </p>
          <p>
            {manager.first_name} {manager.last_name}
          </p>
        </div>
        <div className="mb-5">
          <p className="text-small text-muted mb-2">
            <FormattedMessage id="manager.title"></FormattedMessage>
          </p>
          <p>{manager.title}</p>
        </div>
        <div className="mb-5">
          <p className="text-small text-muted mb-2">
            <FormattedMessage id="manager.department"></FormattedMessage>
          </p>
          <p>{manager.department}</p>
        </div>
        <div className="mb-5">
          <p className="text-small text-muted mb-2">
            <FormattedMessage id="manager.description"></FormattedMessage>
          </p>
          <p>{manager.description}</p>
        </div>
        <div className="mb-5">
          <p className="text-small text-muted mb-2">
            <FormattedMessage id="manager.contact"></FormattedMessage>
          </p>
          <NavLink to="#" className="d-block body-link mb-1">
            <Phone className="me-2" size="17" />
            <span className="align-middle">{manager.phone_work}</span>
          </NavLink>
          <NavLink to="#" className="d-block body-link mb-1">
            <EnvelopeAt className="me-2" size="17" />
            <span className="align-middle">{manager.email2}</span>
          </NavLink>
          <NavLink to="#" className="d-block body-link mb-1">
            <Geo className="me-2" size="17" />
            <span className="align-middle">
              {manager.address_postalcode}, {manager.address_street}, {manager.address_city},{' '}
              {manager.address_state}, {manager.address_country}
            </span>
          </NavLink>
        </div>
      </Card.Body>
    </Card>
  );
};
