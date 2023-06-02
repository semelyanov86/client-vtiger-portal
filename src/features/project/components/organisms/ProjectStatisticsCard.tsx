import { ReactNode } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import * as icons from 'react-bootstrap-icons';

interface ProjectStatisticsCardProps {
  icon: keyof typeof icons;
  header: string | ReactNode;
  value: string | number;
}

export const ProjectStatisticsCard = ({ icon, header, value }: ProjectStatisticsCardProps) => {
  // eslint-disable-next-line import/namespace
  const BootstrapIcon = icons[icon ?? 'House'];

  return (
    <Card className="sh-13 sh-lg-15 sh-xl-14">
      <Card.Body className="h-100 py-3 d-flex align-items-center">
        <Row className="g-0 align-items-center">
          <Col xs="auto" className="pe-3">
            <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
              <BootstrapIcon className="text-primary"></BootstrapIcon>
            </div>
          </Col>
          <Col>
            <div className="d-flex align-items-center lh-1-25">{header}</div>
            <div className="text-primary">{value}</div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
