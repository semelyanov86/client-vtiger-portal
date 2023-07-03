import { render, screen } from '@testing-library/react';
import { TableInstance } from 'react-table';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { ControlsSearch } from './ControlsSearch.tsx';

describe('ControlsSearch', async () => {
  test('should render component successfully without value', () => {
    const tableInstance = {
      state: {
        globalFilter: '',
      },
    } as unknown as TableInstance<any>;
    const view = render(<ControlsSearch tableInstance={tableInstance} onChange={() => {}} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    view.unmount();
  });
  test('should render component successfully with value', () => {
    const tableInstance = {
      state: {
        globalFilter: 'test',
      },
    } as unknown as TableInstance<any>;
    const view = render(<ControlsSearch tableInstance={tableInstance} onChange={() => {}} />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('test');
    view.unmount();
  });
  test('should render component successfully with value and click on delete icon', async () => {
    const tableInstance = {
      state: {
        globalFilter: 'test',
      },
    } as unknown as TableInstance<any>;
    const view = render(<ControlsSearch tableInstance={tableInstance} onChange={() => {}} />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    const deleteIcon = screen.getByTestId('search-delete-icon');
    expect(deleteIcon).toBeInTheDocument();
    await deleteIcon.click();
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('');

    view.unmount();
  });
});
