import { Row, Col, Card, Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { Spinner } from '../../../components/Elements';
import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { useUserStore } from '../../../stores/user.ts';
import { useChangeSettings } from '../api/changeSettings.ts';
import { useUserSettings } from '../api/getUserSettings.ts';
import { UserSidebar } from '../components/UserSidebar.tsx';

export const UserSettings = () => {
  const { value: user } = useUserStore();
  const settingsQuery = useUserSettings();
  const mutationQuery = useChangeSettings();
  const title = 'Your preferences';
  const breadcrumbs = [
    { to: '/app', text: 'Home' },
    { to: '/app/user/settings', text: 'Profile Settings' },
  ];

  if (settingsQuery.isLoading) {
    return <Spinner></Spinner>;
  }

  if (!settingsQuery.data) {
    return null;
  }

  const onChange = async (field: string, value: boolean) => {
    try {
      await mutationQuery.mutateAsync({
        data: {
          field: field,
          value: value,
        },
      });
    } catch (e: any) {
      NotifyError(e.message);
    }
  };

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
          <Col md="5" className="d-flex align-items-start justify-content-end"></Col>
          {/* Top Buttons End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}
      <Row className="g-5">
        <Col xl="4" xxl="3">
          <h2 className="small-title">
            <FormattedMessage id="menu.profile" />
          </h2>
          <UserSidebar user={user}></UserSidebar>
        </Col>
        <Col xl="8" xxl="9">
          <h2 className="small-title">
            <FormattedMessage id="user-settings.settings"></FormattedMessage>
          </h2>
          <Card className="mb-5">
            <Card.Body>
              <Form className="d-flex flex-column">
                {Object.keys(settingsQuery.data).map((key, index) => (
                  <div key={index} className="mb-3 filled custom-control-container">
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={key}
                        defaultChecked={settingsQuery.data[key]}
                        onChange={(e) => onChange(key, e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="securityCheck">
                        <FormattedMessage id={'user-settings.' + key}></FormattedMessage>
                      </label>
                    </div>
                  </div>
                ))}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
