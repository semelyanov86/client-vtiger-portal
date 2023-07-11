import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { CustomAccordionToggle } from './CustomAccordionToggle.tsx';

describe('CustomAccordionToggle', () => {
  test('should renders the children and triggers onClick event', () => {
    const eventKey = '1';

    const view = render(
      <CustomAccordionToggle eventKey={eventKey}>
        <span>Toggle Content</span>
      </CustomAccordionToggle>
    );

    const toggleContent = screen.getByText('Toggle Content');

    expect(toggleContent).toBeInTheDocument();

    fireEvent.click(toggleContent);

    view.unmount();
  });
});
