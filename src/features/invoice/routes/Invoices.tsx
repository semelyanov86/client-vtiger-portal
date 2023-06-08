import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { Badge, Card, Col, Form, Row } from 'react-bootstrap';
import { Search, XCircle } from 'react-bootstrap-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { Spinner } from '../../../components/Elements';
import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { ControlsPageSize } from '../../../components/Table/ControlsPageSize.tsx';
import { TablePagination } from '../../../components/Table/TablePagination.tsx';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { getSortingValue } from '../../../utils/sorting.ts';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { useInvoices } from '../api/getInvoices.ts';
import SearchInput from '../../../components/Table/Atoms/SearchInput.tsx';

export const Invoices = () => {
  const { formatMessage: f } = useIntl();
  const title = f({ id: 'invoices.list' });
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_COUNT);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [sort, setSort] = useState('-invoice_no');

  const query = {
    page: page,
    size: currentPageSize,
    search: searchFilter,
    sort: sort,
  };

  const invoicesQuery = useInvoices(query);
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '/app/invoices', text: 'Invoices' },
  ];

  const onChangePage = useCallback(
    (pageIndex: number) => {
      setPage(pageIndex);
    },
    [page]
  );

  useMemo(() => {
    if (!invoicesQuery.data) {
      return;
    }
    setPageCount(Math.ceil(invoicesQuery.data.count / invoicesQuery.data.size));
  }, [invoicesQuery.data]);

  const headerClasses = useCallback(
    (column: string) => {
      return classNames('text-muted text-small cursor-pointer sort', {
        asc: column == sort,
        desc: '-' + column == sort,
      });
    },
    [sort]
  );

  const onSelectPageSize = useCallback(
    (size: number) => {
      setCurrentPageSize(size);
    },
    [setCurrentPageSize]
  );

  if (invoicesQuery.isLoading) {
    return <Spinner></Spinner>;
  }

  if (!invoicesQuery.data) {
    return <p>No projects available</p>;
  }

  return (
    <>
      <Head title={title} />

      <Col>
        {/* Title Start */}
        <div className="page-title-container mb-3">
          <Row>
            <Col className="mb-2">
              <h1 className="mb-2 pb-0 display-4">{title}</h1>
              <BreadcrumbList items={breadcrumbs} />
            </Col>
            <Col xs="12" sm="auto" className="d-flex align-items-center justify-content-end"></Col>
          </Row>
        </div>
        {/* Title End */}

        <Row className="mb-3">
          <Col md="5" lg="3" xxl="2" className="mb-1">
            {/* Search Start */}
            <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
              <SearchInput searchFilter={searchFilter} setSearchFilter={setSearchFilter} />

              <span className="search-magnifier-icon">
                <Search></Search>
              </span>
              <span className="search-delete-icon d-none">
                <XCircle></XCircle>
              </span>
            </div>
            {/* Search End */}
          </Col>
          <Col md="7" lg="9" xxl="10" className="mb-1 text-end">
            {/* Length Start */}
            <ControlsPageSize onSelectPageSize={onSelectPageSize} pageSize={currentPageSize} />
            {/* Length End */}
          </Col>
        </Row>

        <div className="mb-5">
          {/* List Header Start */}
          <Row className="g-0 h-100 align-content-center d-none d-md-flex ps-5 pe-5 mb-2 custom-sort">
            <Col
              md="1"
              className="d-flex flex-column mb-lg-0 pe-3 d-flex"
              onClick={() => setSort(getSortingValue('invoice_no', sort))}
            >
              <div className={headerClasses('invoice_no')}>
                <FormattedMessage id="invoices.invoice_no"></FormattedMessage>
              </div>
            </Col>
            <Col
              md="5"
              className="d-flex flex-column pe-1 justify-content-center"
              onClick={() => setSort(getSortingValue('subject', sort))}
            >
              <div className={headerClasses('subject')}>
                <FormattedMessage id="invoices.subject"></FormattedMessage>
              </div>
            </Col>
            <Col
              md="2"
              xs="6"
              className="d-flex flex-column pe-1 justify-content-center"
              onClick={() => setSort(getSortingValue('hdnGrandTotal', sort))}
            >
              <div className="text-muted text-small cursor-pointer sort">
                <FormattedMessage id="invoices.hdnGrandTotal"></FormattedMessage>
              </div>
            </Col>
            <Col
              md="2"
              className="d-flex flex-column pe-1 justify-content-center"
              onClick={() => setSort(getSortingValue('invoicedate', sort))}
            >
              <div className={headerClasses('invoicedate')}>
                <FormattedMessage id="invoices.invoicedate"></FormattedMessage>
              </div>
            </Col>
            <Col
              md="2"
              className="d-flex flex-column pe-1 justify-content-end text-end"
              onClick={() => setSort(getSortingValue('invoicestatus', sort))}
            >
              <div className={headerClasses('invoicestatus')}>
                <FormattedMessage id="invoices.invoicestatus"></FormattedMessage>
              </div>
            </Col>
          </Row>
          {/* List Header End */}

          {/* List Items Start */}
          {invoicesQuery.data.data.map((invoice) => {
            return (
              <Card key={invoice.id} className="hover-border-primary mb-2">
                <Card.Body className="pt-0 pb-0 sh-22 sh-md-7">
                  <Row className="g-0 h-100 align-content-center cursor-default">
                    <Col
                      xs="6"
                      md="1"
                      className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 "
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="invoices.invoice_no"></FormattedMessage>
                      </div>
                      <NavLink
                        to={'/app/invoices/' + invoice.id}
                        className={classNames(
                          'stretched-link h-100 d-flex body-link align-items-center',
                          {
                            'fw-bold': invoice.invoicestatus == 'Created',
                          }
                        )}
                      >
                        {invoice.invoice_no}
                      </NavLink>
                    </Col>
                    <Col
                      xs="6"
                      md="5"
                      className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="invoices.subject"></FormattedMessage>
                      </div>
                      <div
                        className={classNames('text-body', {
                          'fw-bold': invoice.invoicestatus == 'Created',
                        })}
                      >
                        {invoice.subject}
                      </div>
                    </Col>
                    <Col
                      xs="12"
                      md="2"
                      className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="invoices.hdnGrandTotal"></FormattedMessage>
                      </div>
                      <div
                        className={classNames('text-body', {
                          'fw-bold': invoice.invoicestatus == 'Created',
                        })}
                      >
                        {invoice.hdnGrandTotal}
                      </div>
                    </Col>
                    <Col
                      xs="12"
                      md="2"
                      className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="invoices.invoicedate"></FormattedMessage>
                      </div>
                      <div className="text-body">
                        {formatToUserReadableDate(invoice.invoicedate)}
                      </div>
                    </Col>
                    <Col
                      xs="6"
                      md="2"
                      className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 order-md-5"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="invoices.invoicestatus"></FormattedMessage>
                      </div>
                      <div>
                        <Badge bg="outline-primary">
                          <FormattedMessage id={'invoices.' + invoice.invoicestatus} />
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}

          {/* List Items End */}
        </div>
        {/* Pagination Start */}
        <div className="d-flex justify-content-center">
          <TablePagination
            page={page}
            pageCount={pageCount}
            gotoPage={onChangePage}
          ></TablePagination>
        </div>
        {/* Pagination End */}
      </Col>
    </>
  );
};
