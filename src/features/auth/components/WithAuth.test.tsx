import { render, screen } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import WithAuth from './WithAuth.tsx';

describe('WithAuth', () => {
  test('should render children when user is authenticated', async () => {
    vi.mock('../../../lib/token', async () => {
      const actual = await vi.importActual('../../../lib/token');
      return {
        ...(actual as typeof WithAuth),
        getToken: () => {
          return {
            token: 'valid-token',
            timeStamp: Date.now() + 1000, // Token is not expired
          };
        },
      };
    });
    const view = render(
      <WrapToRouterAndIntl>
        <WithAuth>
          <div data-testid="content">Authenticated Content</div>
        </WithAuth>
      </WrapToRouterAndIntl>
    );

    await screen.findByTestId('content');

    expect(screen.getByTestId('content')).toBeInTheDocument();

    view.unmount();
  });
  test('redirects to login when user is not authenticated', async () => {
    vi.mock('../../../lib/token', async () => {
      const actual = await vi.importActual('../../../lib/token');
      return {
        ...(actual as typeof WithAuth),
        getToken: () => {
          return null;
        },
      };
    });

    const view = render(
      <WrapToRouterAndIntl>
        <WithAuth>
          <div data-testid="content">Authenticated Content</div>
        </WithAuth>
      </WrapToRouterAndIntl>
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();

    view.unmount();
  });
});
