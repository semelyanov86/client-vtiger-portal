import { ReactNode } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import { formatToUserReadableDate } from '../../../features/misc/services/Dates.ts';
import { BreadcrumbList } from '../Breadcrumbs/BreadcrumbList.tsx';
import { BreadcrumbProp } from '../index.ts';

interface DetailPageTitleProps {
  title: string;
  modified: string;
  target: BreadcrumbProp;
  parent: BreadcrumbProp;
  children: ReactNode;
}

export const DetailPageTitle = ({
  title,
  modified,
  target,
  parent,
  children,
}: DetailPageTitleProps) => {
  const { formatMessage: f } = useIntl();
  const breadcrumbs = [
    { to: 'app', text: f({ id: 'Home' }) },
    { to: parent.to, text: f({ id: parent.text }) },
    { to: target.to, text: target.text },
  ];

  return (
    <Row>
      <Col className="mb-2">
        <h1 className="mb-2 pb-0 display-4">{title}</h1>
        <div className="text-muted font-heading text-small">
          <FormattedMessage id="general.was-updated"></FormattedMessage>{' '}
          {formatToUserReadableDate(modified)}
        </div>
        <BreadcrumbList items={breadcrumbs} />
      </Col>
      <Col xs="12" sm="auto" className="d-flex align-items-center justify-content-end">
        {children}
      </Col>
    </Row>
  );
};
