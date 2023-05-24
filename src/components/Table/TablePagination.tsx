import { Pagination } from 'react-bootstrap';
import { CaretLeft, CaretRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

interface TablePaginationProps {
  page: number;
  pageCount: number;
  gotoPage: (page: number) => void;
}

export const TablePagination = ({ page, pageCount, gotoPage }: TablePaginationProps) => {
  if (pageCount <= 1) {
    return <></>;
  }

  const canPreviousPage = () => page > 1;

  const canNextPage = () => page < pageCount;

  return (
    <Pagination className="justify-content-center mb-0 mt-3">
      <Pagination.First
        className="shadow"
        onClick={() => gotoPage(1)}
        disabled={!canPreviousPage()}
      >
        <CaretLeft></CaretLeft>
      </Pagination.First>
      <Pagination.Prev
        className="shadow"
        disabled={!canPreviousPage()}
        onClick={() => gotoPage(page - 1)}
      >
        <ChevronLeft></ChevronLeft>
      </Pagination.Prev>
      {[...Array(pageCount)].map((_, i) => (
        <Pagination.Item
          key={`pagination${i}`}
          className="shadow"
          active={page === i + 1}
          onClick={() => gotoPage(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        className="shadow"
        onClick={() => gotoPage(page + 1)}
        disabled={!canNextPage()}
      >
        <ChevronRight></ChevronRight>
      </Pagination.Next>
      <Pagination.Last
        className="shadow"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage()}
      >
        <CaretRight></CaretRight>
      </Pagination.Last>
    </Pagination>
  );
};
