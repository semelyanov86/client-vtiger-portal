import { useState } from 'react';
import { Button, Col, Modal, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { useStarredFaqs } from '../../api/getStarred.ts';
import { Faq } from '../../types';
import { FaqCard } from '../organisms/FaqCard.tsx';

export const ExtendKnowledge = () => {
  const faqsQuery = useStarredFaqs();
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);

  if (faqsQuery.isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  if (!faqsQuery.data) {
    return (
      <p>
        <FormattedMessage id="general.no-data"></FormattedMessage>
      </p>
    );
  }
  return (
    <>
      {faqsQuery.data.map((faq) => (
        <Col key={faq.id} md="4" className="mb-5">
          <FaqCard faq={faq} onSelect={() => setSelectedFaq(faq)} />
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
