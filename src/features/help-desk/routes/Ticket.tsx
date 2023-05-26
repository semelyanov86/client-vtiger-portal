import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import { Calendar, Clipboard, ShieldPlus, Tag } from 'react-bootstrap-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router';

import { Spinner } from '../../../components/Elements';
import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { LoadHelpDesk } from '../../module/LoadHelpDesk.tsx';
import { getPicklistValues } from '../../module/services/fields.ts';
import useModulesStore from '../../module/stores/module.ts';
import { useTicket } from '../api/getTicket.ts';

export const Ticket = () => {
  const { ticketId } = useParams();
  const ticketQuery = useTicket({ ticketId: ticketId ?? '' });
  const { formatMessage: f } = useIntl();
  const { HelpDesk } = useModulesStore();

  if (!HelpDesk) {
    return null;
  }
  const statuses = getPicklistValues(HelpDesk, 'ticketstatus');

  if (ticketQuery.isLoading) {
    return <Spinner></Spinner>;
  }

  const title = f({ id: 'tickets.detail' }) + ' ' + ticketId;

  if (!ticketQuery.data) {
    return null;
  }

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '/app/tickets', text: 'Tickets' },
    { to: '/app/tickets/' + ticketId, text: ticketId ?? '' },
  ];

  return (
    <>
      <Head title={title} />
      <LoadHelpDesk></LoadHelpDesk>
      <div className="page-title-container">
        <Row>
          <Col className="mb-2">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            <div className="text-muted font-heading text-small">
              <FormattedMessage id="tickets.was-updated"></FormattedMessage> +{' '}
              {formatToUserReadableDate(ticketQuery.data.modifiedtime)}
            </div>
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          <Col xs="12" sm="auto" className="d-flex align-items-center justify-content-end">
            <Dropdown className="ms-1 w-100 w-md-auto" align="end">
              <Dropdown.Toggle className="end w-100 w-md-auto" variant="outline-primary">
                <FormattedMessage id="tickets.ticketstatus" />: {ticketQuery.data.ticketstatus}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {statuses.map((item) => (
                  <Dropdown.Item key={item.value}>
                    <FormattedMessage id="tickets.ticketstatus" />:{' '}
                    <FormattedMessage id={'tickets.' + item.value}></FormattedMessage>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col className="mb-5 mb-xxl-0">
            <h2 className="small-title">{ticketQuery.data.ticket_title}</h2>
            <Card className="mb-2">
              <Card.Body>
                <div className="mb-4 pb-4 border-bottom border-separator-light">
                  <Row className="g-0 sh-sm-5 h-auto">
                    <Col className="">
                      <Row className="h-100 g-2">
                        <Col className="h-sm-100 d-flex flex-column justify-content-sm-center mb-1 mb-sm-0">
                          <div>
                            <FormattedMessage id="tickets.description"></FormattedMessage>:
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div>
                    <div className="mt-4">{ticketQuery.data.description}</div>
                  </div>
                </div>
                <div className="mb-4 pb-4">
                  <Row className="g-0 sh-sm-5 h-auto">
                    <Col className="">
                      <Row className="h-100 g-2">
                        <Col className="h-sm-100 d-flex flex-column justify-content-sm-center mb-1 mb-sm-0">
                          <div>
                            <FormattedMessage id="tickets.solution"></FormattedMessage>:
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div>
                    <div className="mt-4">{ticketQuery.data.solution}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="g-2 mb-5">
          <Col>
            <h2 className="small-title">Additional Information</h2>
            <Row className="g-2 mb-5">
              <Col sm="6">
                <Card className="sh-13 sh-lg-15 sh-xl-14">
                  <Card.Body className="h-100 py-3 d-flex align-items-center">
                    <Row className="g-0 align-items-center">
                      <Col xs="auto" className="pe-3">
                        <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                          <Tag className="text-primary"></Tag>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex align-items-center lh-1-25">Order Id</div>
                        <div className="text-primary">2241</div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="6">
                <Card className="sh-13 sh-lg-15 sh-xl-14">
                  <Card.Body className="h-100 py-3 d-flex align-items-center">
                    <Row className="g-0 align-items-center">
                      <Col xs="auto" className="pe-3">
                        <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                          <Clipboard className="text-primary"></Clipboard>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex align-items-center lh-1-25">Order Status</div>
                        <div className="text-primary">Delivered</div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="6">
                <Card className="sh-13 sh-lg-15 sh-xl-14">
                  <Card.Body className="h-100 py-3 d-flex align-items-center">
                    <Row className="g-0 align-items-center">
                      <Col xs="auto" className="pe-3">
                        <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                          <Calendar className="text-primary"></Calendar>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex align-items-center lh-1-25">Delivery Date</div>
                        <div className="text-primary">17.11.2020</div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="6">
                <Card className="sh-13 sh-lg-15 sh-xl-14">
                  <Card.Body className="h-100 py-3 d-flex align-items-center">
                    <Row className="g-0 align-items-center">
                      <Col xs="auto" className="pe-3">
                        <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                          <ShieldPlus className="text-primary"></ShieldPlus>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex align-items-center lh-1-25">Tracking Code</div>
                        <div className="text-primary">US4244290109</div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
