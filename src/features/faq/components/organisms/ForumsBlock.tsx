import { Button, Card } from 'react-bootstrap';
import { Diagram2 } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

import { FORUM_URL } from '../../../../config/constants.ts';

export const ForumsBlock = () => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="cta-3">
          <FormattedMessage id="faq.specific-issue"></FormattedMessage>
        </div>
        <div className="mb-3 cta-3 text-primary">
          <FormattedMessage id="faq.check-forum"></FormattedMessage>
        </div>
        <div className="text-muted mb-4">
          <FormattedMessage id="faq.forum-text"></FormattedMessage>
        </div>
        <a href={FORUM_URL} target="_blank" rel="noreferrer">
          <Button
            variant="outline-primary"
            className="btn-icon btn-icon-start sw-15 stretched-link"
          >
            <Diagram2></Diagram2>{' '}
            <span>
              <FormattedMessage id="faq.forums"></FormattedMessage>
            </span>
          </Button>
        </a>
      </Card.Body>
    </Card>
  );
};
