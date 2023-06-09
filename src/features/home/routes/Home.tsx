import { Col, Row, Spinner } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { SUPPORTED_MODULES } from '../../../config';
import { AllUsersWidget } from '../../auth/components/AllUsersWidget.tsx';
import { CompanyWidget } from '../../company/components/CompanyWidget.tsx';
import { MyDocuments } from '../../document/widgets/MyDocuments.tsx';
import { ExtendKnowledge } from '../../faq/components/templates/ExtendKnowledge.tsx';
import { LeadForm } from '../../leads/widgets/LeadForm.tsx';
import { useStatistics } from '../../statistic/api/getStatistics.ts';
import { InvoiceStatistics } from '../../statistic/components/InvoiceStatistics.tsx';
import { TicketStatistics } from '../../statistic/components/TicketStatistics.tsx';
import { ProgressTasks } from '../../task/widgets/ProgressTasks.tsx';
import { ProductWidget } from '../widgets/ProductWidget.tsx';

export const Home = () => {
  const title = 'Dashboard';
  const { formatMessage: f } = useIntl();
  const statisticQuery = useStatistics();

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'app', text: 'Dashboard' },
  ];

  return (
    <>
      <Head title={title} />

      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          {/* Title End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row>
        <Col xl="6">
          {SUPPORTED_MODULES.includes('Contacts') && (
            <>
              <h2 className="small-title">{f({ id: 'latestRegistration' })}</h2>
              <AllUsersWidget></AllUsersWidget>
            </>
          )}
          {/* Stats Start */}
          <h2 className="small-title mt-3">
            <FormattedMessage id="stat.ticket-stat"></FormattedMessage>
          </h2>
          {statisticQuery.isLoading ? (
            <Spinner animation="border" variant="primary"></Spinner>
          ) : (
            <TicketStatistics stat={statisticQuery.data}></TicketStatistics>
          )}
          {/* Stats End */}
        </Col>

        {/* Products Start */}
        <ProductWidget></ProductWidget>
        {/* Products End */}
      </Row>

      <Row>
        {/* Tasks Start */}
        {SUPPORTED_MODULES.includes('Project') && (
          <Col lg="6" className="mb-5">
            <h2 className="small-title">
              <FormattedMessage id="projects.progress-tasks" />
            </h2>
            <ProgressTasks></ProgressTasks>
          </Col>
        )}

        {/* Tasks End */}

        {/* Invoice Statistics */}
        <Col lg="6" className="mb-5">
          <h2 className="small-title">
            <FormattedMessage id="stat.invoice-stat"></FormattedMessage>
          </h2>
          {statisticQuery.isLoading ? (
            <Spinner animation="border" variant="primary"></Spinner>
          ) : (
            <InvoiceStatistics stat={statisticQuery.data}></InvoiceStatistics>
          )}
          <CompanyWidget></CompanyWidget>
        </Col>
        {/* Categories End */}
      </Row>

      {/* Extend Your Knowledge Start */}
      {SUPPORTED_MODULES.includes('Faq') && (
        <Row>
          <h2 className="small-title">
            <FormattedMessage id="faq.extend-knowledge"></FormattedMessage>
          </h2>
          <ExtendKnowledge></ExtendKnowledge>
        </Row>
      )}
      {/* Extend Your Knowledge End */}
      <Row>
        {SUPPORTED_MODULES.includes('Lead') && (
          <Col lg="4" className="mb-5">
            <h2 className="small-title">
              <FormattedMessage id="leads.recommend"></FormattedMessage>
            </h2>
            <LeadForm></LeadForm>
          </Col>
        )}
        {SUPPORTED_MODULES.includes('Documents') && (
          <Col lg="8" className="mb-5">
            <h2 className="small-title">
              <FormattedMessage id="stat.your-docs"></FormattedMessage>
            </h2>
            <MyDocuments></MyDocuments>
          </Col>
        )}
      </Row>
    </>
  );
};
