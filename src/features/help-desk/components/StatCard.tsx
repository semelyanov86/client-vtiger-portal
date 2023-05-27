import { ReactNode } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

interface StatCardProps {
  children: ReactNode;
  header: string | ReactNode;
  value: string | ReactNode;
}

export const StatCard = ({ children, header, value }: StatCardProps) => {
  return (
    <Col sm="6">
      <Card className="sh-13 sh-lg-15 sh-xl-14">
        <Card.Body className="h-100 py-3 d-flex align-items-center">
          <Row className="g-0 align-items-center">
            <Col xs="auto" className="pe-3">
              <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                {children}
              </div>
            </Col>
            <Col>
              <div className="d-flex align-items-center lh-1-25">{header}</div>
              <div className="text-primary">{value}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};
