import { useCallback, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import {
  Column,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useRowState,
  useSortBy,
  useTable,
} from 'react-table';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { ButtonsAddNew } from '../../../components/Table/ButtonsAddNew.tsx';
import { ButtonsCheckAll } from '../../../components/Table/ButtonsCheckAll.tsx';
import { ControlsAdd } from '../../../components/Table/ControlsAdd.tsx';
import { ControlsEdit } from '../../../components/Table/ControlsEdit.tsx';
import { ControlsPageSize } from '../../../components/Table/ControlsPageSize.tsx';
import { ControlsSearch } from '../../../components/Table/ControlsSearch.tsx';
import { Table } from '../../../components/Table/Table.tsx';
import { TablePagination } from '../../../components/Table/TablePagination.tsx';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { convertSortingToSort } from '../../../lib/requests.ts';
import { LoadHelpDesk } from '../../module/LoadHelpDesk.tsx';
import { useTickets } from '../api/getTickets.ts';
import { getColumns } from '../table/getColumns.tsx';
import HelpDesk from '../types';

export const Tickets = () => {
  const { formatMessage: f } = useIntl();
  const title = f({ id: 'tickets.list' });
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_COUNT);

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'tickets', text: 'Tickets' },
  ];

  const columns: Column<HelpDesk>[] = useMemo(getColumns, [f]);

  const [pageCount, setPageCount] = useState(0);
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ id: 'ticket_no', desc: true });

  const { data, error, isLoading } = useTickets({
    page: page,
    size: currentPageSize,
    search: term,
    sort: convertSortingToSort(sort),
  });

  const tickets = useMemo(() => {
    if (data === undefined) {
      return [];
    }
    setPageCount(Math.ceil(data.count / data.size));
    return data.data;
  }, [data, currentPageSize, page, sort]);

  if (isLoading) {
    document.body.classList.add('spinner');
  } else {
    document.body.classList.remove('spinner');
  }

  if (error) {
    NotifyError(error.message);
  }

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const tableInstance = useTable(
    {
      columns,
      data: tickets,
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetHiddenColumns: false,
      autoResetSelectedRows: false,
      pageCount,
      initialState: {
        pageIndex: 0,
        sortBy: [sort],
        hiddenColumns: ['id'],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  const { setPageSize, gotoPage, state } = tableInstance;

  useMemo(() => {
    const sorting = state.sortBy[0];
    if (sorting) {
      setSort({
        id: sorting.id,
        desc: sorting.desc ?? false,
      });
    }
  }, [state.sortBy]);

  const onChangePage = (pageIndex: number) => {
    gotoPage(pageIndex);
    setPage(pageIndex);
  };

  const searchItem = (val: string) => {
    if (!val) {
      setTerm('');
    }
    if (val.length > 3) {
      setTerm(val || '');
    }
  };

  const onSelectPageSize = useCallback(
    (size: number) => {
      setPageSize(size);
      setCurrentPageSize(size);
    },
    [setPageSize]
  );

  return (
    <>
      <Head title={title} />
      <LoadHelpDesk></LoadHelpDesk>
      <Row>
        <Col>
          <div className="page-title-container">
            <Row>
              <Col xs="12" md="7">
                <h1 className="mb-0 pb-0 display-4">{title}</h1>
                <BreadcrumbList items={breadcrumbs} />
              </Col>
              <Col xs="12" md="5" className="d-flex align-items-start justify-content-end">
                <ButtonsAddNew tableInstance={tableInstance} />{' '}
                <ButtonsCheckAll tableInstance={tableInstance} />
              </Col>
            </Row>
          </div>

          <div>
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                  <ControlsSearch tableInstance={tableInstance} onChange={searchItem} />
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                  <ControlsAdd tableInstance={tableInstance} />{' '}
                  <ControlsEdit tableInstance={tableInstance} />{' '}
                </div>
                <div className="d-inline-block">
                  <ControlsPageSize
                    onSelectPageSize={onSelectPageSize}
                    pageSize={currentPageSize}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Table className="react-table rows" tableInstance={tableInstance} />
              </Col>
              <Col xs="12">
                <TablePagination page={page} pageCount={pageCount} gotoPage={onChangePage} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};
