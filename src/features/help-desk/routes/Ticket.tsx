import { Badge, Card, Col, Dropdown, Row } from 'react-bootstrap';
import {
  Asterisk,
  Calendar,
  CalendarDate,
  Clipboard,
  Clock,
  Files,
  Tag,
} from 'react-bootstrap-icons';
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
import { StatCard } from '../components/StatCard.tsx';

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
              <FormattedMessage id="tickets.was-updated"></FormattedMessage>{' '}
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
            <h2 className="small-title">
              <FormattedMessage id="tickets.additional-information" />
            </h2>
            <Row className="g-2 mb-5">
              <StatCard
                header={<FormattedMessage id="tickets.ticketpriorities" />}
                value={<FormattedMessage id={'tickets.' + ticketQuery.data.ticketpriorities} />}
              >
                <Asterisk className="text-primary"></Asterisk>
              </StatCard>
              <StatCard
                header={<FormattedMessage id="tickets.ticketseverities" />}
                value={<FormattedMessage id={'tickets.' + ticketQuery.data.ticketseverities} />}
              >
                <Clipboard className="text-primary"></Clipboard>
              </StatCard>
              <StatCard
                header={<FormattedMessage id="tickets.modifiedtime" />}
                value={formatToUserReadableDate(ticketQuery.data.modifiedtime)}
              >
                <Calendar className="text-primary"></Calendar>
              </StatCard>
              <StatCard
                header={<FormattedMessage id="tickets.ticketcategories" />}
                value={<FormattedMessage id={'tickets.' + ticketQuery.data.ticketcategories} />}
              >
                <Files className="text-primary"></Files>
              </StatCard>
              <StatCard
                header={<FormattedMessage id="tickets.hours" />}
                value={ticketQuery.data.hours}
              >
                <Clock className="text-primary"></Clock>
              </StatCard>
              <StatCard
                header={<FormattedMessage id="tickets.days" />}
                value={ticketQuery.data.days}
              >
                <CalendarDate className="text-primary"></CalendarDate>
              </StatCard>
              <StatCard
                header={<FormattedMessage id="tickets.tags" />}
                value={
                  ticketQuery.data.tags.length > 0 && ticketQuery.data.tags[0] != '' ? (
                    ticketQuery.data.tags.map((tag) => (
                      <Badge key={tag} bg="outline-primary">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <FormattedMessage id="tickets.no-tags"></FormattedMessage>
                  )
                }
              >
                <Tag className="text-primary"></Tag>
              </StatCard>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
