import { fireEvent, render, screen } from '@testing-library/react';
import { TableInstance } from 'react-table';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { Table } from './Table.tsx';

describe('Table', () => {
  const tableInstance = {
    getTableProps: vi.fn(),
    headerGroups: [
      {
        getHeaderGroupProps: vi.fn(),
        headers: [
          {
            getHeaderProps: vi.fn(),
            getSortByToggleProps: vi.fn(),
            headerClassName: 'header-class',
            isSortedDesc: false,
            isSorted: false,
            sortable: true,
            render: vi.fn(() => 'Header 1'),
          },
          // Add more header objects as needed for your test
        ],
      },
    ],
    page: [
      {
        getRowProps: vi.fn(),
        cells: [
          {
            getCellProps: vi.fn(),
            column: {
              id: 'ticket_no',
            },
            render: vi.fn(() => 'Cell 1'),
          },
        ],
        toggleRowSelected: vi.fn(),
      },
    ],
    getTableBodyProps: vi.fn(),
    prepareRow: vi.fn(),
    toggleAllPageRowsSelected: vi.fn(),
    setIsOpenAddEditModal: vi.fn(),
    toggleRowSelected: vi.fn(),
  } as unknown as TableInstance<any>;
  test('renders the table correctly', () => {
    render(<Table tableInstance={tableInstance} />);

    const headerElement = screen.getByText('Header 1');
    expect(headerElement).toBeInTheDocument();

    const cellElement = screen.getByText('Cell 1');
    expect(cellElement).toBeInTheDocument();
  });

  test('handles click event correctly', () => {
    render(<Table tableInstance={tableInstance} />);

    const cellElement = screen.getByText('Cell 1');
    fireEvent.click(cellElement);

    expect(tableInstance.toggleAllPageRowsSelected).toHaveBeenCalledWith(false);
    expect(tableInstance.page[0].toggleRowSelected).toHaveBeenCalled();
    expect(tableInstance.setIsOpenAddEditModal).toHaveBeenCalledWith(true);
  });

  test('handles keydown event correctly', () => {
    render(<Table tableInstance={tableInstance} />);

    const cellElement = screen.getByText('Cell 1');
    fireEvent.keyDown(cellElement, { key: 'Enter', code: 'Enter' });

    expect(tableInstance.toggleAllPageRowsSelected).toHaveBeenCalledWith(false);
    expect(tableInstance.page[0].toggleRowSelected).toHaveBeenCalled();
    expect(tableInstance.setIsOpenAddEditModal).toHaveBeenCalledWith(true);
  });
  test('renders row correctly', () => {
    render(<Table tableInstance={tableInstance} />);

    const rowElement = screen.getByRole('row', { name: 'Cell 1' });
    expect(rowElement).toBeInTheDocument();
  });
});
