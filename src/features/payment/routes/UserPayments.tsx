import { Row, Col, Card } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { Spinner } from '../../../components/Elements';
import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { DEFAULT_PATHS } from '../../../config';
import { useUserStore } from '../../../stores/user.ts';
import { UserSidebar } from '../../auth/components/UserSidebar.tsx';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { useUserPayments } from '../api/getPaymentsFromAccount.ts';

export const UserPayments = () => {
  const { value: user } = useUserStore();
  const paymentsQuery = useUserPayments();
  const title = 'Your payments';
  const breadcrumbs = [
    { to: DEFAULT_PATHS.DASHBOARD, text: 'Home' },
    { to: DEFAULT_PATHS.USER_PAYMENTS, text: 'Your payments' },
  ];

  if (paymentsQuery.isLoading) {
    return <Spinner></Spinner>;
  }

  if (!paymentsQuery.data) {
    return null;
  }

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
            <FormattedMessage id="payments.payments"></FormattedMessage>
          </h2>
          <Card className="mb-5">
            <Card.Body>
              <div className="mb-2 bg-transparent no-shadow d-none d-md-block g-0 sh-3">
                <Row className="g-0 h-100 align-content-center">
                  <Col
                    md="3"
                    className="d-flex align-items-center mb-2 mb-md-0 text-muted text-small"
                  >
                    <FormattedMessage id="payments.id"></FormattedMessage>
                  </Col>
                  <Col
                    xs="6"
                    md="3"
                    className="d-flex align-items-center text-alternate text-medium text-muted text-small"
                  >
                    <FormattedMessage id="payments.amount"></FormattedMessage>
                  </Col>
                  <Col
                    xs="6"
                    md="2"
                    className="d-flex align-items-center text-alternate text-medium text-muted text-small"
                  >
                    <FormattedMessage id="payments.date"></FormattedMessage>
                  </Col>
                  <Col
                    xs="8"
                    md="4"
                    className="d-flex align-items-center text-alternate text-medium justify-content-end text-muted text-small"
                  >
                    <FormattedMessage id="payments.status"></FormattedMessage>
                  </Col>
                </Row>
              </div>
              <div className="mb-5 border-last-none">
                {paymentsQuery.data.map((payment) => (
                  <Row
                    key={payment.id}
                    className="sh-md-4 g-0 h-100 align-content-center border-bottom border-separator-light pb-3 mb-3"
                  >
                    <Col
                      xs="8"
                      md="3"
                      className="d-flex flex-column justify-content-center mb-1 mb-md-0 order-1"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="payments.id"></FormattedMessage>
                      </div>
                      <div className="text-alternate">{payment.id}</div>
                    </Col>
                    <Col
                      xs="10"
                      md="3"
                      className="d-flex flex-column justify-content-center mb-1 mb-md-0 order-2"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="payments.amount"></FormattedMessage>
                      </div>
                      <div className="text-alternate">
                        {payment.amount} {payment.currency}
                      </div>
                    </Col>
                    <Col
                      xs="10"
                      md="2"
                      className="d-flex flex-column justify-content-center mb-1 mb-md-0 order-3"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="payments.date"></FormattedMessage>
                      </div>
                      <div className="text-alternate">
                        {formatToUserReadableDate(payment.created_at)}
                      </div>
                    </Col>
                    <Col
                      xs="4"
                      md="4"
                      className="d-flex flex-column justify-content-center align-items-end mb-1 mb-md-0 order-1 order-md-4"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="payments.status"></FormattedMessage>
                      </div>
                      <div className="text-alternate">
                        <FormattedMessage
                          id={'payments.status.' + payment.status}
                        ></FormattedMessage>
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
