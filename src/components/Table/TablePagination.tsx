import { Pagination } from 'react-bootstrap';
import { CaretLeft, CaretRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { TableInstance } from 'react-table';

import HelpDesk from '../../features/help-desk/types';

interface TablePaginationProps {
  tableInstance: TableInstance<HelpDesk>;
}

export const TablePagination = ({ tableInstance }: TablePaginationProps) => {
  const {
    gotoPage,
    canPreviousPage,
    pageCount,
    previousPage,
    nextPage,
    canNextPage,
    state: { pageIndex },
  } = tableInstance;

  if (pageCount <= 1) {
    return <></>;
  }

  return (
    <Pagination className="justify-content-center mb-0 mt-3">
      <Pagination.First className="shadow" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <CaretLeft></CaretLeft>
      </Pagination.First>
      <Pagination.Prev
        className="shadow"
        disabled={!canPreviousPage}
        onClick={() => previousPage()}
      >
        <ChevronLeft></ChevronLeft>
      </Pagination.Prev>
      {[...Array(pageCount)].map((_, i) => (
        <Pagination.Item
          key={`pagination${i}`}
          className="shadow"
          active={pageIndex === i}
          onClick={() => gotoPage(i)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next className="shadow" onClick={() => nextPage()} disabled={!canNextPage}>
        <ChevronRight></ChevronRight>
      </Pagination.Next>
      <Pagination.Last
        className="shadow"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        <CaretRight></CaretRight>
      </Pagination.Last>
    </Pagination>
  );
};
