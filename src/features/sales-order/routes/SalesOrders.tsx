import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { Search, XCircle } from 'react-bootstrap-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { Spinner } from '../../../components/Elements';
import { ListPageTitle } from '../../../components/Elements/ListPage/ListPageTitle.tsx';
import { Head } from '../../../components/Head';
import SearchInput from '../../../components/Table/Atoms/SearchInput.tsx';
import { ControlsPageSize } from '../../../components/Table/ControlsPageSize.tsx';
import { TablePagination } from '../../../components/Table/TablePagination.tsx';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { getSortingValue } from '../../../utils/sorting.ts';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { useSalesOrders } from '../api/getSalesOrders.ts';

const HEADER_CONTENT_CLASSES = ['d-flex', 'flex-column', 'pe-1', 'justify-content-center'];

const ROW_TABLE_CLASSES = ['d-flex', 'flex-column', 'justify-content-center', 'mb-2', 'mb-md-0'];

const ROW_TABLE_FIELD_CLASSES = ['text-muted', 'text-small', 'd-md-none'];

export const SalesOrders = () => {
  const { formatMessage: f } = useIntl();
  const title = f({ id: 'so.list' });
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_COUNT);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [sort, setSort] = useState('-salesorder_no');

  const query = {
    page: page,
    size: currentPageSize,
    search: searchFilter,
    sort: sort,
  };

  const soQuery = useSalesOrders(query);

  const onChangePage = useCallback(
    (pageIndex: number) => {
      setPage(pageIndex);
    },
    [page]
  );

  useMemo(() => {
    if (!soQuery.data) {
      return;
    }
    setPageCount(Math.ceil(soQuery.data.count / soQuery.data.size));
  }, [soQuery.data]);

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

  if (soQuery.isLoading) {
    return <Spinner></Spinner>;
  }

  if (!soQuery.data) {
    return <FormattedMessage id="general.no-data"></FormattedMessage>;
  }

  return (
    <>
      <Head title={title} />

      <Col>
        <ListPageTitle title={title} breadcrumb={{ to: 'app/sales-orders', text: 'Sales Orders' }}>
          <></>
        </ListPageTitle>

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
              onClick={() => setSort(getSortingValue('salesorder_no', sort))}
            >
              <div className={headerClasses('salesorder_no')}>
                <FormattedMessage id="so.salesorder_no"></FormattedMessage>
              </div>
            </Col>
            <Col
              md="5"
              className={classNames(...HEADER_CONTENT_CLASSES)}
              onClick={() => setSort(getSortingValue('subject', sort))}
            >
              <div className={headerClasses('subject')}>
                <FormattedMessage id="so.subject"></FormattedMessage>
              </div>
            </Col>
            <Col
              md="2"
              xs="6"
              className={classNames(...HEADER_CONTENT_CLASSES)}
              onClick={() => setSort(getSortingValue('hdnGrandTotal', sort))}
            >
              <div className="text-muted text-small cursor-pointer sort">
                <FormattedMessage id="so.hdnGrandTotal"></FormattedMessage>
              </div>
            </Col>
            <Col md="2" className={classNames(...HEADER_CONTENT_CLASSES)}>
              <div className={headerClasses('createdtime')}>
                <FormattedMessage id="so.createdtime"></FormattedMessage>
              </div>
            </Col>
            <Col
              md="2"
              className={classNames(...HEADER_CONTENT_CLASSES, 'text-end')}
              onClick={() => setSort(getSortingValue('sostatus', sort))}
            >
              <div className={headerClasses('sostatus')}>
                <FormattedMessage id="so.sostatus"></FormattedMessage>
              </div>
            </Col>
          </Row>
          {/* List Header End */}

          {/* List Items Start */}
          {soQuery.data.data.map((order) => {
            return (
              <Card key={order.id} className="hover-border-primary mb-2">
                <Card.Body className="pt-0 pb-0 sh-22 sh-md-7">
                  <Row className="g-0 h-100 align-content-center cursor-default">
                    <Col
                      xs="6"
                      md="1"
                      className={classNames(
                        ...ROW_TABLE_CLASSES,
                        'order-1',
                        'order-md-1',
                        'h-md-100'
                      )}
                    >
                      <div className={classNames(...ROW_TABLE_FIELD_CLASSES)}>
                        <FormattedMessage id="so.salesorder_no"></FormattedMessage>
                      </div>
                      <NavLink
                        to={'/app/sales-orders/' + order.id}
                        className={classNames(
                          'stretched-link h-100 d-flex body-link align-items-center',
                          {
                            'fw-bold': order.sostatus == 'Created',
                          }
                        )}
                      >
                        {order.salesorder_no}
                      </NavLink>
                    </Col>
                    <Col
                      xs="6"
                      md="5"
                      className={classNames(...ROW_TABLE_CLASSES, 'order-3', 'order-md-2')}
                    >
                      <div className={classNames(...ROW_TABLE_FIELD_CLASSES)}>
                        <FormattedMessage id="so.subject"></FormattedMessage>
                      </div>
                      <div
                        className={classNames('text-body', {
                          'fw-bold': order.sostatus == 'Created',
                        })}
                      >
                        {order.subject}
                      </div>
                    </Col>
                    <Col
                      xs="12"
                      md="2"
                      className={classNames(...ROW_TABLE_CLASSES, 'order-3', 'order-md-2')}
                    >
                      <div className={classNames(...ROW_TABLE_FIELD_CLASSES)}>
                        <FormattedMessage id="so.hdnGrandTotal"></FormattedMessage>
                      </div>
                      <div
                        className={classNames('text-body', {
                          'fw-bold': order.sostatus == 'Created',
                        })}
                      >
                        {order.hdnGrandTotal}
                      </div>
                    </Col>
                    <Col
                      xs="12"
                      md="2"
                      className={classNames(...ROW_TABLE_CLASSES, 'order-4', 'order-md-3')}
                    >
                      <div className={classNames(...ROW_TABLE_FIELD_CLASSES)}>
                        <FormattedMessage id="so.createdtime"></FormattedMessage>
                      </div>
                      <div className="text-body">{formatToUserReadableDate(order.createdtime)}</div>
                    </Col>
                    <Col
                      xs="6"
                      md="2"
                      className={classNames(
                        ...ROW_TABLE_CLASSES,
                        'order-2',
                        'order-md-5',
                        'align-items-end'
                      )}
                    >
                      <div className={classNames(...ROW_TABLE_FIELD_CLASSES)}>
                        <FormattedMessage id="so.sostatus"></FormattedMessage>
                      </div>
                      <div>
                        <Badge bg="outline-primary">
                          <FormattedMessage id={'so.' + order.sostatus} />
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
