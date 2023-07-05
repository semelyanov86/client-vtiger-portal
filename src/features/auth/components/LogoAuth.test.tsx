import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import { LogoAuth } from './LogoAuth.tsx';

describe('LogoAuth', async () => {
  test('should render component without errors', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <LogoAuth></LogoAuth>
      </WrapToRouterAndIntl>
    );
    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    view.unmount();
  });
});
