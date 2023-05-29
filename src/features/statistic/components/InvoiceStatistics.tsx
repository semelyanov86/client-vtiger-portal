import { Col, Row, Spinner } from 'react-bootstrap';
import { Alarm, AlarmFill, BagCheck, Receipt } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

import { StatCardBig } from './organisms/StatCardBig.tsx';

interface InvoiceStatisticsProps {
  stat: Statistics | undefined;
}

export const InvoiceStatistics = ({ stat }: InvoiceStatisticsProps) => {
  if (!stat) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  return (
    <Row className="g-2">
      <Col sm="6">
        <StatCardBig
          header={<FormattedMessage id="stat.invoices.total" />}
          value={stat.invoices.total_qty + ' (' + stat.invoices.total_sum.toFixed(2) + ')'}
        >
          <Receipt className="text-white"></Receipt>
        </StatCardBig>
      </Col>
      <Col sm="6">
        <StatCardBig
          header={<FormattedMessage id="stat.invoices.open" />}
          value={stat.invoices.open_qty + ' (' + stat.invoices.open_sum.toFixed(2) + ')'}
        >
          <Alarm className="text-white"></Alarm>
        </StatCardBig>
      </Col>
      <Col sm="6">
        <StatCardBig
          header={<FormattedMessage id="stat.invoices.paid" />}
          value={stat.invoices.paid_qty + ' (' + stat.invoices.paid_sum.toFixed(2) + ')'}
        >
          <BagCheck className="text-white"></BagCheck>
        </StatCardBig>
      </Col>
      <Col sm="6">
        <StatCardBig
          header={<FormattedMessage id="stat.tasks.in-progress" />}
          value={
            stat.tasks['In Progress'] + ' (' + stat.tasks['In Progress-hours'].toFixed(2) + ')'
          }
        >
          <AlarmFill className="text-white"></AlarmFill>
        </StatCardBig>
      </Col>
    </Row>
  );
};
