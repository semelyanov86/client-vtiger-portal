import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { Search, XCircle } from 'react-bootstrap-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { ListPageTitle, Spinner } from '../../../components/Elements';
import { Head } from '../../../components/Head';
import SearchInput from '../../../components/Table/Atoms/SearchInput.tsx';
import { ControlsPageSize } from '../../../components/Table/ControlsPageSize.tsx';
import { TablePagination } from '../../../components/Table/TablePagination.tsx';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { DataPaginationResponse } from '../../../lib/axios.ts';
import { clearRouteDelimeter } from '../../../utils/format.ts';
import { getSortingValue } from '../../../utils/sorting.ts';
import { formatToUserReadableDate } from '../services/Dates.ts';
import { Entity } from '../types/entity.ts';

const ROW_TABLE_CLASSES = ['d-flex', 'flex-column', 'justify-content-center', 'mb-2', 'mb-md-0'];

const ROW_TABLE_FIELD_CLASSES = ['text-muted', 'text-small', 'd-md-none'];

interface TableCardProps<T> {
  entities: DataPaginationResponse<T> | undefined;
  isLoading: boolean;
  module: string;
  route: string;
  moduleName: string;
  initialQuery: QueryRequest;
  onChangeQuery: (query: QueryRequest) => void;
  headers: HeadersData<T>[];
  isEntityBold: (entity: T) => boolean;
}

export interface QueryRequest {
  page: number;
  size: number;
  search: string;
  sort: string;
}

export interface HeadersData<T> {
  header: keyof T;
  md: number;
  xs: number;
  type: 'string' | 'date' | 'badge' | 'translatable';
}

export const TableCard = <T extends Entity>({
  entities,
  isLoading,
  module,
  initialQuery,
  onChangeQuery,
  route,
  moduleName,
  headers,
  isEntityBold,
}: TableCardProps<T>) => {
  const { formatMessage: f } = useIntl();
  const title = f({ id: module + '.list' });
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_COUNT);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [sort, setSort] = useState(initialQuery.sort);

  const onChangePage = useCallback(
    (pageIndex: number) => {
      initialQuery.page = pageIndex;
      setPage(pageIndex);
      onChangeQuery(initialQuery);
    },
    // eslint-disable-next-line
    [page]
  );

  useEffect(() => {
    if (entities) {
      setPageCount(Math.ceil(entities.count / entities.size));
      const initialQuery2: QueryRequest = { ...initialQuery };
      initialQuery2.size = entities.size;
      onChangeQuery(initialQuery2);
    }
    // eslint-disable-next-line
  }, [entities, onChangeQuery]);

  const headerClasses = useCallback(
    (column: string) => {
      return classNames('text-muted text-small cursor-pointer sort', {
        asc: column == sort,
        desc: '-' + column == sort,
      });
    },
    [sort]
  );

  const setSearchValue = useCallback(
    (value: string) => {
      const initialQuery2: QueryRequest = { ...initialQuery };
      initialQuery2.search = value;
      setSearchFilter(value);
      onChangeQuery(initialQuery2);
    },
    [initialQuery, onChangeQuery]
  );

  const setSortValue = useCallback(
    (value: string) => {
      const initialQuery2: QueryRequest = { ...initialQuery };
      initialQuery2.sort = value;
      setSort(value);
      onChangeQuery(initialQuery2);
    },
    [initialQuery, onChangeQuery]
  );

  const onSelectPageSize = useCallback(
    (size: number) => {
      setCurrentPageSize(size);
    },
    [setCurrentPageSize]
  );

  const generateRowContent = (entity: T, header: HeadersData<T>) => {
    if (header.type === 'date') {
      return formatToUserReadableDate(String(entity[header.header]));
    }
    if (header.type === 'badge') {
      return (
        <Badge bg="outline-primary">
          <FormattedMessage id={module + '.' + entity[header.header]} />
        </Badge>
      );
    }
    if (header.type === 'translatable') {
      return <FormattedMessage id={module + '.' + entity[header.header]} />;
    }
    return String(entity[header.header]);
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (!entities || !entities.data || entities.data.length < 1) {
    return <FormattedMessage id="general.no-data"></FormattedMessage>;
  }

  return (
    <>
      <Head title={title} />

      <Col>
        <ListPageTitle
          title={title}
          breadcrumb={{
            to: clearRouteDelimeter(route),
            text: moduleName,
          }}
        >
          <></>
        </ListPageTitle>

        <Row className="mb-3">
          <Col md="5" lg="3" xxl="2" className="mb-1">
            {/* Search Start */}
            <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
              <SearchInput searchFilter={searchFilter} setSearchFilter={setSearchValue} />

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

        <div className="mb-5" data-testid="main-table">
          {/* List Header Start */}
          <Row className="g-0 h-100 align-content-center d-none d-md-flex ps-5 pe-5 mb-2 custom-sort">
            {headers.map((header) => (
              <Col
                key={String(header.header)}
                md={header.md}
                xs={header.xs}
                className="d-flex flex-column mb-lg-0 pe-3 d-flex"
                onClick={() => setSortValue(getSortingValue(String(header.header), sort))}
              >
                <div className={headerClasses(String(header.header))}>
                  <FormattedMessage id={module + '.' + String(header.header)}></FormattedMessage>
                </div>
              </Col>
            ))}
          </Row>
          {/* List Header End */}

          {/* List Items Start */}
          {entities.data.map((entity) => {
            return (
              <Card key={entity.id} className="hover-border-primary mb-2">
                <Card.Body className="pt-0 pb-0 sh-md-7">
                  <Row className="g-0 h-100 align-content-center cursor-default">
                    {headers.map((header) => (
                      <Col
                        key={entity.id + String(header.header)}
                        xs={header.xs}
                        md={header.md}
                        className={classNames(
                          ...ROW_TABLE_CLASSES,
                          'order-1',
                          'order-md-1',
                          'h-md-100'
                        )}
                      >
                        <div className={classNames(...ROW_TABLE_FIELD_CLASSES)}>
                          <FormattedMessage
                            id={module + '.' + String(header.header)}
                          ></FormattedMessage>
                        </div>
                        <NavLink
                          to={route + '/' + entity.id}
                          className={classNames(
                            'stretched-link h-100 d-flex body-link align-items-center',
                            {
                              'fw-bold': isEntityBold(entity),
                            }
                          )}
                        >
                          {generateRowContent(entity, header)}
                        </NavLink>
                      </Col>
                    ))}
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
