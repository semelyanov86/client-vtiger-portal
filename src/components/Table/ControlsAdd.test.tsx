import { render, screen } from '@testing-library/react';
import { TableInstance } from 'react-table';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../lib/tests.tsx';

import { ControlsAdd } from './ControlsAdd.tsx';

describe('ControlsAdd', async () => {
  test('should render component without errors', () => {
    const tableInstance = {
      toggleAllPageRowsSelected: () => {},
      setIsOpenAddEditModal: () => {},
    } as unknown as TableInstance<any>;
    const view = render(
      <WrapToRouterAndIntl>
        <ControlsAdd tableInstance={tableInstance}></ControlsAdd>
      </WrapToRouterAndIntl>
    );
    expect(screen.getByTestId('add-button-controls')).toBeInTheDocument();

    view.unmount();
  });
  test('should call toggleAllPageRowsSelected and setIsOpenAddEditModal when click on add button', () => {
    const tableInstance = {
      toggleAllPageRowsSelected: vi.fn(),
      setIsOpenAddEditModal: vi.fn(),
    } as unknown as TableInstance<any>;
    const view = render(
      <WrapToRouterAndIntl>
        <ControlsAdd tableInstance={tableInstance}></ControlsAdd>
      </WrapToRouterAndIntl>
    );
    expect(screen.getByTestId('add-button-controls')).toBeInTheDocument();
    screen.getByTestId('add-button-controls').click();
    expect(tableInstance.toggleAllPageRowsSelected).toHaveBeenCalledWith(false);
    expect(tableInstance.setIsOpenAddEditModal).toHaveBeenCalledWith(true);

    view.unmount();
  });
});
