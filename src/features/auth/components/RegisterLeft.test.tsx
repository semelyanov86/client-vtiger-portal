import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import { RegisterLeft } from './RegisterLeft.tsx';

describe('RegisterLeft', async () => {
  test('should render component without errors', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <RegisterLeft></RegisterLeft>
      </WrapToRouterAndIntl>
    );
    const h1s = screen.getAllByRole('heading');
    expect(h1s.length).toEqual(2);
    const paragraf = screen.getByTestId('register-paragraf');
    expect(paragraf).toBeInTheDocument();
    expect(paragraf).toHaveClass('h6');

    view.unmount();
  });
});
