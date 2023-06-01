import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { useServices } from '../api/getServices.ts';

export const ServicesListWidget = () => {
  const servicesQuery = useServices({
    page: 1,
    size: 5,
    search: '',
    sort: '',
    discontinued: true,
  });
  if (servicesQuery.isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  if (!servicesQuery.data) {
    return (
      <p>
        <FormattedMessage id="general.no-data"></FormattedMessage>
      </p>
    );
  }
  return (
    <>
      {servicesQuery.data.data.map((service) => (
        <Card key={service.id} className="mb-2" id="introSecond">
          <Row className="g-0 sh-12">
            <Col className="d-flex align-items-center justify-content-md-start ms-4" xs="auto">
              {service.service_no}
            </Col>
            <Col>
              <Card.Body className="pt-0 pb-0 h-100">
                <Row className="g-0 h-100 align-content-center">
                  <Col md="7" className="d-flex flex-column mb-2 mb-md-0">
                    <NavLink to={service.website}>{service.servicename}</NavLink>
                    <div className="text-small text-muted text-truncate">{service.description}</div>
                  </Col>
                  <Col md="5" className="d-flex align-items-center justify-content-md-end">
                    {service.unit_price} {service.currency.currency_symbol}
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};
