import { ReactNode } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Glide } from '../../../../components/Elements/Carousel/Glide.tsx';

interface StatCardProps {
  children: ReactNode;
  helper: string | ReactNode;
  header: string | ReactNode;
  value: string | number;
}

export const StatCard = ({ children, helper, header, value }: StatCardProps) => {
  return (
    <Glide.Item>
      <Card className="sh-20 hover-border-primary mb-5">
        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top">{helper}</Tooltip>}>
          <Card.Body className="p-4 text-center align-items-center d-flex flex-column justify-content-between">
            <div className="d-flex sh-5 sw-5 bg-gradient-light mb-3 align-items-center justify-content-center rounded-xl">
              {children}
            </div>
            <p className="mb-0 lh-1">{header}</p>
            <p className="cta-3 mb-0 text-primary">{value}</p>
          </Card.Body>
        </OverlayTrigger>
      </Card>
    </Glide.Item>
  );
};
