import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../lib/tests.tsx';

import { ControlsPageSize } from './ControlsPageSize.tsx';

describe('ControlsPageSize', () => {
  test('should render without errors', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <ControlsPageSize onSelectPageSize={() => {}} pageSize={10}></ControlsPageSize>
      </WrapToRouterAndIntl>
    );
    expect(screen.getByTestId('controls-page-size')).toBeInTheDocument();
    view.unmount();
  });
});
