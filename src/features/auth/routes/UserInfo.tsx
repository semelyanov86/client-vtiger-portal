import { Button, Row, Col } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { useUserStore } from '../../../stores/user.ts';
import { UserSidebar } from '../components/UserSidebar.tsx';

import { UserAbout } from './UserAbout.tsx';
import { ManagerInfo } from '../../manager/components/ManagerInfo.tsx';
import { LoadManager } from '../../manager/LoadManager.tsx';

export const UserInfo = () => {
  const { value: user } = useUserStore();
  const title = 'Your profile: ' + user.firstname + ' ' + user.lastname;
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '/auth/info', text: 'Profile' },
  ];

  return (
    <>
      <Head title={title} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">{'ID: ' + user.crmid}</h1>
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col md="5" className="d-flex align-items-start justify-content-end">
            <Button
              variant="outline-primary"
              className="btn-icon btn-icon-start btn-icon w-100 w-md-auto ms-1"
            >
              <PencilSquare /> <span>Edit</span>
            </Button>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}
      <LoadManager></LoadManager>
      <Row className="g-5">
        <Col xl="4" xxl="3">
          <h2 className="small-title">
            <FormattedMessage id="menu.profile" />
          </h2>
          <UserSidebar user={user}></UserSidebar>
        </Col>
        <Col xl="8" xxl="9">
          {/* About Start */}
          <h2 className="small-title">
            <FormattedMessage id="user.about"></FormattedMessage>
          </h2>
          <UserAbout user={user}></UserAbout>
          {/* About End */}
          <h2 className="small-title mt-2">
            <FormattedMessage id="manager.info"></FormattedMessage>
          </h2>
          <ManagerInfo></ManagerInfo>
        </Col>
      </Row>
    </>
  );
};
