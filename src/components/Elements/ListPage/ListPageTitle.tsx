import { memo, ReactNode } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import { BreadcrumbList } from '../Breadcrumbs/BreadcrumbList.tsx';
import { BreadcrumbProp } from '../index.ts';

interface ListPageTitleProps {
  title: string | ReactNode;
  children: ReactNode;
  breadcrumb: BreadcrumbProp;
}

export const ListPageTitle = memo(({ children, title, breadcrumb }: ListPageTitleProps) => {
  const { formatMessage: f } = useIntl();

  const breadcrumbs = [
    { to: 'app', text: f({ id: 'Home' }) },
    { to: breadcrumb.to, text: f({ id: breadcrumb.text }) },
  ];

  return (
    <div className="page-title-container">
      <Row>
        <Col xs="12" md="7">
          <h1 className="mb-0 pb-0 display-4">{title}</h1>
          <BreadcrumbList items={breadcrumbs} />
        </Col>
        <Col xs="12" md="5" className="d-flex align-items-start justify-content-end">
          {children}
        </Col>
      </Row>
    </div>
  );
});

ListPageTitle.displayName = 'ListPageTitle';
