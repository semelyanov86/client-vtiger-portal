import { render, screen } from '@testing-library/react';
import { TableInstance } from 'react-table';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { ControlsEdit } from './ControlsEdit.tsx';

describe('ControlsEdit', async () => {
  test('should render component without errors', () => {
    const tableInstance = {
      selectedFlatRows: [],
      setIsOpenAddEditModal: () => {},
    } as unknown as TableInstance<object>;
    const { unmount } = render(<ControlsEdit tableInstance={tableInstance} />);
    expect(screen.getByTestId('edit-button-controls')).toBeInTheDocument();
    unmount();
  });
  test('should render component with disabled button', () => {
    const tableInstance = {
      selectedFlatRows: [{}, {}],
      setIsOpenAddEditModal: () => {},
    } as unknown as TableInstance<object>;
    const { unmount } = render(<ControlsEdit tableInstance={tableInstance} />);
    expect(screen.getByTestId('edit-button-controls')).toBeDisabled();
    unmount();
  });
  test('should render component with enabled button', () => {
    const tableInstance = {
      selectedFlatRows: [{}],
      setIsOpenAddEditModal: () => {},
    } as unknown as TableInstance<object>;
    const { unmount } = render(<ControlsEdit tableInstance={tableInstance} />);
    expect(screen.getByTestId('edit-button-controls')).toBeEnabled();
    unmount();
  });
  test('should call setIsOpenAddEditModal when button is clicked', () => {
    const tableInstance = {
      selectedFlatRows: [{}],
      setIsOpenAddEditModal: vi.fn(),
    } as unknown as TableInstance<object>;
    const { unmount } = render(<ControlsEdit tableInstance={tableInstance} />);
    screen.getByTestId('edit-button-controls').click();
    expect(tableInstance.setIsOpenAddEditModal).toHaveBeenCalled();
    unmount();
  });
});
