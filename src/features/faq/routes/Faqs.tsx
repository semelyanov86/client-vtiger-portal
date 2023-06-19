import { Accordion, Card, Col, Row } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import { Spinner } from '../../../components/Elements';
import { ListPageTitle } from '../../../components/Elements/ListPage/ListPageTitle.tsx';
import { Head } from '../../../components/Head';
import { useFaqs } from '../api/getFaqs.ts';
import { CustomAccordionToggle } from '../components/CustomAccordionToggle.tsx';
import { SidebarBlock } from '../components/templates/SidebarBlock.tsx';

export const Faqs = () => {
  const { formatMessage: f } = useIntl();
  const title = f({ id: 'faq.list' });
  const faqsQuery = useFaqs({
    page: 1,
    size: 100,
  });
  const [searchParams] = useSearchParams();

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

  const calcDefaultKey = (): string => {
    if (!faqsQuery.data || faqsQuery.data.length < 1) {
      return '0';
    }
    if (!searchParams.get('crmid')) {
      return '0';
    }
    const res = faqsQuery.data.findIndex((faq) => faq.id === searchParams.get('crmid'));
    if (res < 1) {
      return '0';
    }
    return res.toString();
  };

  return (
    <>
      <Head title={title} />

      <ListPageTitle title={title} breadcrumb={{ to: 'app/faqs', text: 'Faqs' }}>
        <></>
      </ListPageTitle>

      <Row className="g-5">
        <Col xl="8" xxl="9" className="mb-5">
          {/* Content Start */}
          <Accordion className="mb-n2" defaultActiveKey={calcDefaultKey()}>
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
