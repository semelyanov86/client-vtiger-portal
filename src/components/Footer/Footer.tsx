import React, { useEffect } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useCompanyStore from '../../features/company/stores/company.ts';

export const Footer = React.memo(() => {
  const { value: company } = useCompanyStore();
  useEffect(() => {
    document.documentElement.setAttribute('data-footer', 'true');
    return () => {
      document.documentElement.removeAttribute('data-footer');
    };
  }, []);

  return (
    <footer>
      <div className="footer-content">
        <Container>
          <Row>
            <Col xs="12" sm="6">
              <p className="mb-0 text-muted text-medium">
                {company.organizationname} {new Date().getFullYear()}
              </p>
            </Col>
            <Col sm="6" className="d-none d-sm-block">
              <Breadcrumb className="pt-0 pe-0 mb-0 float-end">
                <Breadcrumb.Item
                  className="mb-0 text-medium"
                  href={company.website}
                  linkProps={{ className: 'btn-link' }}
                >
                  <FormattedMessage id="layout.go-to-website" />
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
});
Footer.displayName = 'Footer';
