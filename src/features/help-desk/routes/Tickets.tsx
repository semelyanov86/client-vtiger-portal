import { useMemo, useState } from 'react';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  CellProps,
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
import { ButtonsAddNew } from '../../../components/Table/ButtonsAddNew.tsx';
import { ButtonsCheckAll } from '../../../components/Table/ButtonsCheckAll.tsx';
import { ControlsAdd } from '../../../components/Table/ControlsAdd.tsx';
import { ControlsEdit } from '../../../components/Table/ControlsEdit.tsx';
import { ControlsPageSize } from '../../../components/Table/ControlsPageSize.tsx';
import { ControlsSearch } from '../../../components/Table/ControlsSearch.tsx';
import { Table } from '../../../components/Table/Table.tsx';
import { TablePagination } from '../../../components/Table/TablePagination.tsx';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { useTickets } from '../api/getTickets.ts';
import HelpDesk from '../types';
import { NotifyError } from '../../../components/Notifications/Notification.tsx';

export const Tickets = () => {
  const { formatMessage: f } = useIntl();
  const title = f({ id: 'tickets.list' });

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'tickets', text: 'Tickets' },
  ];

  const columns: Column<HelpDesk>[] = useMemo(() => {
    return [
      {
        Header: f({ id: 'tickets.ticket_no' }),
        accessor: 'ticket_no',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
        Cell: ({ cell: { value } }: CellProps<HelpDesk>) => {
          return (
            <a
              className="list-item-heading body"
              href="#!"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {value}
            </a>
          );
        },
      },
      {
        Header: f({ id: 'tickets.ticket_title' }),
        accessor: 'ticket_title',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: f({ id: 'tickets.ticketstatus' }),
        accessor: 'ticketstatus',
        sortable: true,
        Cell: ({ cell: { value } }: CellProps<HelpDesk>) => {
          return <FormattedMessage id={'tickets.' + value}></FormattedMessage>;
        },
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: f({ id: 'tickets.createdtime' }),
        accessor: 'createdtime',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-20',
      },
      {
        Header: f({ id: 'tickets.tags' }),
        accessor: 'tags',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell: { value } }: CellProps<HelpDesk>) => {
          return <Badge bg="outline-primary">{value}</Badge>;
        },
      },
      {
        Header: 'Actions',
        accessor: 'id',
        sortable: false,
        headerClassName: 'empty w-10',
        Cell: () => <Button>Edit</Button>,
      },
    ];
  }, [f]);

  const [pageCount, setPageCount] = useState(0);
  const [term, setTerm] = useState('');

  const { data, error, isLoading } = useTickets({
    page: 1,
    size: DEFAULT_PAGE_COUNT,
    search: term,
  });

  const tickets = useMemo(() => {
    if (data === undefined) {
      return [];
    }
    setPageCount(Math.ceil(data.count / data.size));
    return data.data;
  }, [data]);

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
        sortBy: [{ id: 'ticket_no', desc: false }],
        hiddenColumns: ['id'],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  const searchItem = (val: string) => {
    if (val.length > 3) {
      setTerm(val || '');
    }
  };

  return (
    <>
      <Head title={title} />

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
                  <ControlsPageSize tableInstance={tableInstance} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Table className="react-table rows" tableInstance={tableInstance} />
              </Col>
              <Col xs="12">
                <TablePagination tableInstance={tableInstance} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};
