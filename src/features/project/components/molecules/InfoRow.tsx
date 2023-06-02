import { Col, Row } from 'react-bootstrap';
import { ReactNode } from 'react';

interface InfoRowProps {
  header: string | ReactNode;
  value: string | ReactNode;
}

export const InfoRow = ({ header, value }: InfoRowProps) => {
  return (
    <Row className="g-0 mb-2">
      <Col xs="auto">
        <div className="me-2">{header}:</div>
      </Col>
      <Col className="text-alternate">{value}</Col>
    </Row>
  );
};
