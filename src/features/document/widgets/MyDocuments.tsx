import { Row, Col, Form, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FileArrowDown, X } from 'react-bootstrap-icons';

export const MyDocuments = () => {
  return (
    <div className="mb-5">
      {/* List Header Start */}
      <Row className="g-0 h-100 align-content-center d-none d-md-flex ps-4 pe-3 mb-2 custom-sort">
        <Col md="6" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
          <div className="text-muted text-small cursor-pointer sort">NAME</div>
        </Col>
        <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">DATE</div>
        </Col>
        <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">SIZE</div>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}

      <Card className={`mb-2`}>
        <Card.Body className="py-0 ps-4 pe-3 sh-14 sh-md-6">
          <Row className="g-0 h-100 align-content-center cursor-default">
            <Col
              xs="11"
              md="6"
              className="d-flex flex-column justify-content-center mb-1 mb-md-0 h-md-100 position-relative"
            >
              <NavLink to="#" onClick={() => {}} className="stretched-link body-link">
                <FileArrowDown className="me-2 text-alternate" size="17"></FileArrowDown>{' '}
                <span className="ps-1 align-middle">234523_4236.webp</span>
              </NavLink>
            </Col>
            <Col md="2" className="d-flex flex-column justify-content-center order-4 ms-5 ms-md-0">
              <div className="text-alternate">192.8 KB</div>
            </Col>
            <Col md="3" className="d-flex flex-column justify-content-center order-3 ms-5 ms-md-0">
              <div className="text-alternate">12.04.2021</div>
            </Col>
            <Col
              xs="1"
              md="1"
              className="d-flex flex-column justify-content-center align-items-md-end order-2 text-end order-md-last"
            >
              <X></X>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* List Items End */}
    </div>
  );
};
