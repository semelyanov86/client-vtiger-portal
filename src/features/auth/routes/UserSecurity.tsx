import { Col, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { useUserStore } from '../../../stores/user.ts';
import { TwoFactorCard } from '../components/TwoFactorCard.tsx';
import { UpdatePasswordForm } from '../components/UpdatePasswordForm.tsx';
import { UserSidebar } from '../components/UserSidebar.tsx';

export const UserSecurity = () => {
  const { value: user } = useUserStore();
  const title = 'Profile security settings';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '/app/auth/info', text: 'Profile' },
    { to: '/app/auth/security', text: 'Security' },
  ];

  return (
    <>
      <Head title={title} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">
              <FormattedMessage id="user.security-settings"></FormattedMessage>
            </h1>
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          {/* Title End */}
        </Row>
      </div>
      <Row className="g-5">
        <Col xl="4" xxl="3">
          <h2 className="small-title">
            <FormattedMessage id="menu.profile" />
          </h2>
          <UserSidebar user={user}></UserSidebar>
        </Col>
        <Col xl="8" xxl="9">
          <h2 className="small-title">
            <FormattedMessage id="user.update-password"></FormattedMessage>
          </h2>
          <UpdatePasswordForm></UpdatePasswordForm>
          <h2 className="small-title">
            <FormattedMessage id="otp.tfa"></FormattedMessage>
          </h2>
          <TwoFactorCard></TwoFactorCard>
        </Col>
      </Row>
    </>
  );
};
