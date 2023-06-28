import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../lib/tests.tsx';

import { NavUserMenuContent } from './NavUserMenuContent.tsx';

describe('NavUserMenuContent', async () => {
  test('should render without errors', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <NavUserMenuContent></NavUserMenuContent>
      </WrapToRouterAndIntl>
    );
    expect(screen.getAllByRole('list')[0]).toBeInTheDocument();
    view.unmount();
  });
  test('navigates to user info page on link click', async () => {
    const history = createMemoryHistory();

    render(
      <WrapToRouterAndIntl>
        <NavUserMenuContent></NavUserMenuContent>
      </WrapToRouterAndIntl>
    );
    const link = screen.getByText('User Info');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/');
  });
  test('navigates by logout click', async () => {
    const history = createMemoryHistory();

    render(
      <WrapToRouterAndIntl>
        <NavUserMenuContent></NavUserMenuContent>
      </WrapToRouterAndIntl>
    );
    const link = screen.getByText('Logout');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/');
  });
});
