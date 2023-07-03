import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../lib/tests.tsx';

import { ButtonsAddNew } from './ButtonsAddNew.tsx';

describe('ButtonsAddNew', () => {
  test('should render button without errors', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <ButtonsAddNew onClick={() => {}} />
      </WrapToRouterAndIntl>
    );
    expect(screen.getByTestId('add-new-button')).toBeInTheDocument();
    view.unmount();
  });
  test('should render button with text', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <ButtonsAddNew onClick={() => {}} />
      </WrapToRouterAndIntl>
    );
    expect(screen.getByText('Add New')).toBeInTheDocument();
    view.unmount();
  });
  test('should run onClick function', () => {
    let clicked = false;
    const view = render(
      <WrapToRouterAndIntl>
        <ButtonsAddNew onClick={() => (clicked = true)} />
      </WrapToRouterAndIntl>
    );
    screen.getByTestId('add-new-button').click();
    expect(clicked).toBe(true);
    view.unmount();
  });
});
