import { Button, Card } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';

import { DEFAULT_PATHS } from '../../../../config';

export const SubmitTicketBlock = () => {
  const navigate = useNavigate();

  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="cta-3">
          <FormattedMessage id="faq.look-support"></FormattedMessage>
        </div>
        <div className="mb-3 cta-3 text-primary">
          <FormattedMessage id="faq.submit-ticket"></FormattedMessage>
        </div>
        <div className="text-muted mb-4">
          <FormattedMessage id="faq.ticket-content"></FormattedMessage>
        </div>
        <Button
          variant="outline-primary"
          className="btn-icon btn-icon-start sw-15 stretched-link"
          onClick={() => navigate(DEFAULT_PATHS.HELPDESK)}
        >
          <QuestionCircle></QuestionCircle>{' '}
          <span>
            <FormattedMessage id="faq.support"></FormattedMessage>
          </span>
        </Button>
      </Card.Body>
    </Card>
  );
};
