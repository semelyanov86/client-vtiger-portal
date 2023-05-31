import { ReactNode } from 'react';
import { Button, Card, useAccordionButton } from 'react-bootstrap';

interface CustomAccordionToggleProps {
  children: ReactNode;
  eventKey: string;
}

export const CustomAccordionToggle = ({ children, eventKey }: CustomAccordionToggleProps) => {
  const decoratedOnClick = useAccordionButton(eventKey, () => {});
  return (
    <Card.Body className="py-4" onClick={decoratedOnClick} role="button">
      <Button variant="link" className="list-item-heading p-0">
        {children}
      </Button>
    </Card.Body>
  );
};
