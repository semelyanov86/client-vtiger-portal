import { ReactNode } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

interface StatCardBigProps {
  children: ReactNode;
  header: string | ReactNode;
  value: string | number;
}

export const StatCardBig = ({ children, header, value }: StatCardBigProps) => {
  return (
    <Card className="sh-11 hover-scale-up cursor-pointer">
      <Card.Body className="h-100 py-3 align-items-center">
        <Row className="g-0 h-100 align-items-center">
          <Col xs="auto" className="pe-3">
            <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
              {children}
            </div>
          </Col>
          <Col>
            <Row className="gx-2 d-flex align-content-center">
              <Col xs="12" className="col-12 d-flex">
                <div className="d-flex align-items-center lh-1-25">{header}</div>
              </Col>
              <Col xl="auto" className="col-12">
                <div className="cta-2 text-primary">{value}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
