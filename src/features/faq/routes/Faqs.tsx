import { Accordion, Card, Col, Row } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { CustomAccordionToggle } from '../components/CustomAccordionToggle.tsx';
import { SidebarBlock } from '../components/templates/SidebarBlock.tsx';
import { useFaqs } from '../api/getFaqs.ts';
import { Spinner } from '../../../components/Elements';

export const Faqs = () => {
  const { formatMessage: f } = useIntl();
  const title = f({ id: 'faq.list' });
  const faqsQuery = useFaqs({
    page: 1,
    size: 100,
  });

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '/app/faqs', text: 'Faqs' },
  ];

  if (faqsQuery.isLoading) {
    return <Spinner></Spinner>;
  }

  if (!faqsQuery.data) {
    return (
      <p>
        <FormattedMessage id="faq.no-faqs"></FormattedMessage>
      </p>
    );
  }

  return (
    <>
      <Head title={title} />

      {/* Title Start */}
      <div className="page-title-container">
        <h1 className="mb-0 pb-0 display-4">{title}</h1>
        <BreadcrumbList items={breadcrumbs} />
      </div>
      {/* Title End */}

      <Row className="g-5">
        <Col xl="8" xxl="9" className="mb-5">
          {/* Content Start */}
          <Accordion className="mb-n2" defaultActiveKey="0">
            {faqsQuery.data.map((faq, index) => {
              return (
                <Card key={faq.id} className="d-flex mb-2 flex-grow-1">
                  <CustomAccordionToggle eventKey={index.toString()}>
                    {faq.question}
                  </CustomAccordionToggle>
                  <Accordion.Collapse eventKey={index.toString()}>
                    <Card.Body
                      className="pt-0"
                      dangerouslySetInnerHTML={{
                        __html: faq.faq_answer.replace('\n', '<br /> <br />'),
                      }}
                    ></Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
          {/* Content End */}
        </Col>
        <SidebarBlock></SidebarBlock>
      </Row>
    </>
  );
};
