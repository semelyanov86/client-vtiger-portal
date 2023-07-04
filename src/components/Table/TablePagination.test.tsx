import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { TablePagination } from './TablePagination.tsx';

describe('TablePagination', () => {
  const gotoPageMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render the pagination correctly', () => {
    const page = 1;
    const pageCount = 5;

    const { unmount } = render(
      <TablePagination page={page} pageCount={pageCount} gotoPage={gotoPageMock} />
    );

    const paginationItems = screen.getAllByRole('button');
    expect(paginationItems).toHaveLength(pageCount + 1);

    const activePageItem = screen.getByText(page.toString());
    expect(activePageItem).toHaveClass('page-link');
    unmount();
  });
  test('handles click on pagination items correctly', () => {
    const page = 1;
    const pageCount = 5;

    const { unmount } = render(
      <TablePagination page={page} pageCount={pageCount} gotoPage={gotoPageMock} />
    );

    const paginationItem = screen.getByText('3');
    fireEvent.click(paginationItem);

    expect(gotoPageMock).toHaveBeenCalledWith(3);
    unmount();
  });

  test('handles click on "First" button correctly', () => {
    const page = 3;
    const pageCount = 5;

    const { unmount } = render(
      <TablePagination page={page} pageCount={pageCount} gotoPage={gotoPageMock} />
    );

    const firstButton = screen.getByText('First');
    fireEvent.click(firstButton);

    expect(gotoPageMock).toHaveBeenCalledWith(1);
    unmount();
  });

  test('handles click on "Prev" button correctly', () => {
    const page = 3;
    const pageCount = 5;

    const { unmount } = render(
      <TablePagination page={page} pageCount={pageCount} gotoPage={gotoPageMock} />
    );

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    expect(gotoPageMock).toHaveBeenCalledWith(2);
    unmount();
  });

  test('handles click on "Next" button correctly', () => {
    const page = 3;
    const pageCount = 5;

    const { unmount } = render(
      <TablePagination page={page} pageCount={pageCount} gotoPage={gotoPageMock} />
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(gotoPageMock).toHaveBeenCalledWith(4);
    unmount();
  });

  test('handles click on "Last" button correctly', () => {
    const page = 3;
    const pageCount = 5;

    const { unmount } = render(
      <TablePagination page={page} pageCount={pageCount} gotoPage={gotoPageMock} />
    );

    const lastButton = screen.getByText('Last');
    fireEvent.click(lastButton);

    expect(gotoPageMock).toHaveBeenCalledWith(pageCount - 1);
    unmount();
  });

  test('disables "First" and "Prev" buttons when on the first page', () => {
    const page = 1;
    const pageCount = 5;

    const { unmount } = render(
      <TablePagination page={page} pageCount={pageCount} gotoPage={gotoPageMock} />
    );

    const firstButton = screen.getByText('First');
    const prevButton = screen.getByText('Previous');

    expect(firstButton).toHaveClass('visually-hidden');
    expect(prevButton).toHaveClass('visually-hidden');
    unmount();
  });

  test('disables "Next" and "Last" buttons when on the last page', () => {
    const page = 5;
    const pageCount = 5;

    const { unmount } = render(
      <TablePagination page={page} pageCount={pageCount} gotoPage={gotoPageMock} />
    );

    const nextButton = screen.getByText('Next');
    const lastButton = screen.getByText('Last');

    expect(nextButton).toHaveClass('visually-hidden');
    expect(lastButton).toHaveClass('visually-hidden');
    unmount();
  });
});
