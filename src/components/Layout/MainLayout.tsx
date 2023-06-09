import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import { LoadUser } from '../../features/auth/components/LoadUser.tsx';
import { LoadCompany } from '../../features/company/LoadCompany.tsx';
import useLayout from '../../hooks/useLayout.ts';
import { Footer } from '../Footer/Footer.tsx';
import Nav from '../Navigation/Nav.tsx';
import { SidebarMenu } from '../Navigation/sidebar-menu/SidebarMenu.tsx';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = React.memo<MainLayoutProps>(({ children }: MainLayoutProps) => {
  useLayout();

  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.click();
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <LoadCompany />
      <LoadUser />
      <Nav />
      <main>
        <Container>
          <Row className="h-100">
            <SidebarMenu />
            <Col className="h-100" id="contentArea">
              {children}
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
});

MainLayout.displayName = 'MainLayout';
