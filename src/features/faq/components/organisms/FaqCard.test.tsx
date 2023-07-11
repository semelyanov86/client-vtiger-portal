import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../../../lib/tests.tsx';
import { Faq } from '../../types';

import { FaqCard } from './FaqCard.tsx';

describe('FaqCard', () => {
  test('should render the faq question and triggers onSelect event', () => {
    const faq = {
      id: '1',
      question: 'How to use this feature?',
      faq_answer: 'Lorem ipsum dolor sit amet.',
      assigned_user_id: '1',
    } as Faq;
    const onSelectMock = vi.fn();

    const view = render(
      <WrapToRouterAndIntl>
        <FaqCard faq={faq} onSelect={onSelectMock}></FaqCard>
      </WrapToRouterAndIntl>
    );

    const faqQuestion = screen.getByText('How to use this feature?');
    const viewButton = screen.getByRole('button', { name: 'View' });

    expect(faqQuestion).toBeInTheDocument();

    fireEvent.click(viewButton);

    expect(onSelectMock).toHaveBeenCalledWith(faq);
    view.unmount();
  });
});
