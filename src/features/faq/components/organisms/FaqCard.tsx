import { memo } from 'react';
import { Button, Card } from 'react-bootstrap';
import { ArrowBarRight } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

import { Faq } from '../../types';

interface FaqCardProps {
  faq: Faq;
  onSelect: (faq: Faq) => void;
}

export const FaqCard = memo(({ faq, onSelect }: FaqCardProps) => {
  return (
    <Card className="w-100 sh-20 sh-md-22 hover-img-scale-up">
      <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
        <div className="d-flex flex-column h-100 justify-content-between align-items-start">
          <div className="cta-3 text-black">{faq.question}</div>
          <Button
            variant="primary"
            className="btn-icon btn-icon-start mt-3 stretched-link"
            onClick={() => onSelect(faq)}
          >
            <ArrowBarRight />{' '}
            <span>
              <FormattedMessage id="faq.view"></FormattedMessage>
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
});

FaqCard.displayName = 'FaqCard';
