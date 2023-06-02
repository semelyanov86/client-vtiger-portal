import { Col, Row, Spinner } from 'react-bootstrap';
import { Briefcase, EnvelopeAt, PersonCircle, PhoneFill, PinFill } from 'react-bootstrap-icons';

import { Manager } from '../../../manager/types';

interface ManagerInfoProps {
  manager: Manager | undefined;
}

export const ManagerInfo = ({ manager }: ManagerInfoProps) => {
  if (!manager) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }

  return (
    <>
      <Row className="g-0 mb-2">
        <Col xs="auto">
          <div className="sw-3 me-1">
            <PersonCircle size="17" className="text-primary"></PersonCircle>
          </div>
        </Col>
        <Col className="text-alternate">
          {manager.first_name} {manager.last_name}
        </Col>
      </Row>
      <Row className="g-0 mb-2">
        <Col xs="auto">
          <div className="sw-3 me-1">
            <Briefcase size="17" className="text-primary"></Briefcase>
          </div>
        </Col>
        <Col className="text-alternate">{manager.title}</Col>
      </Row>
      <Row className="g-0 mb-2">
        <Col xs="auto">
          <div className="sw-3 me-1">
            <PinFill size="17" className="text-primary"></PinFill>
          </div>
        </Col>
        <Col className="text-alternate">
          {manager.address_street && (
            <span>
              {manager.address_postalcode}, {manager.address_country}, {manager.address_city},{' '}
              {manager.address_street}
            </span>
          )}
        </Col>
      </Row>
      <Row className="g-0 mb-2">
        <Col xs="auto">
          <div className="sw-3 me-1">
            <PhoneFill size="17" className="text-primary"></PhoneFill>
          </div>
        </Col>
        <Col className="text-alternate">{manager.phone_work}</Col>
      </Row>
      <Row className="g-0 mb-2">
        <Col xs="auto">
          <div className="sw-3 me-1">
            <EnvelopeAt size="17" className="text-primary"></EnvelopeAt>
          </div>
        </Col>
        <Col className="text-alternate">{manager.email2}</Col>
      </Row>
    </>
  );
};
