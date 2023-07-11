import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../../../lib/tests.tsx';

import { TextareaDisplay } from './TextareaDisplay.tsx';

describe('TextareaDisplay', () => {
  test('should render the label and value', () => {
    const props = {
      value: 'Lorem ipsum dolor sit amet.',
      name: 'description',
    };
    const view = render(
      <WrapToRouterAndIntl>
        <TextareaDisplay {...props}></TextareaDisplay>
      </WrapToRouterAndIntl>
    );
    const label = screen.getByText('Description:');
    const value = screen.getByText('Lorem ipsum dolor sit amet.');

    expect(label).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    view.unmount();
  });
});
