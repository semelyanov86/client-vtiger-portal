import { Button, Card, Col, Modal, Spinner } from 'react-bootstrap';
import { ArrowBarRight } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

import { useStarredFaqs } from '../../api/getStarred.ts';
import { useState } from 'react';
import { Faq } from '../../types';

export const ExtendKnowledge = () => {
  const faqsQuery = useStarredFaqs();
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);

  if (faqsQuery.isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  if (!faqsQuery.data) {
    return <p>No faqs available</p>;
  }
  return (
    <>
      {faqsQuery.data.map((faq) => (
        <Col key={faq.id} md="4" className="mb-5">
          <Card className="w-100 sh-20 sh-md-22 hover-img-scale-up">
            <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
              <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                <div className="cta-3 text-black">{faq.question}</div>
                <Button
                  variant="primary"
                  className="btn-icon btn-icon-start mt-3 stretched-link"
                  onClick={() => setSelectedFaq(faq)}
                >
                  <ArrowBarRight />{' '}
                  <span>
                    <FormattedMessage id="faq.view"></FormattedMessage>
                  </span>
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      ))}
      <Modal show={selectedFaq != null} onHide={() => setSelectedFaq(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFaq?.question}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          dangerouslySetInnerHTML={{
            __html: selectedFaq?.faq_answer.replace('\n', '<br /> <br />') ?? '',
          }}
        ></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedFaq(null)}>
            <FormattedMessage id="faq.close"></FormattedMessage>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
