import { Button, Card } from 'react-bootstrap';
import { FileText } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

export const DocksBlock = () => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="cta-3">
          <FormattedMessage id="faq.more-details"></FormattedMessage>
        </div>
        <div className="mb-3 cta-3 text-primary">
          <FormattedMessage id="faq.read-docs"></FormattedMessage>
        </div>
        <div className="text-muted mb-4">
          <FormattedMessage id="faq.docs-content"></FormattedMessage>
        </div>
        <a href="https://itvolga.com/blog" target="_blank" rel="noreferrer">
          <Button
            variant="outline-primary"
            className="btn-icon btn-icon-start sw-15 stretched-link"
          >
            <FileText></FileText>{' '}
            <span>
              <FormattedMessage id="faq.blog"></FormattedMessage>
            </span>
          </Button>
        </a>
      </Card.Body>
    </Card>
  );
};
