import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { CellProps, Column } from 'react-table';

import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import HelpDesk from '../types';

interface getColumnsOptions {
  onEdit: (ticketId: string) => void;
}

export function getColumns({ onEdit }: getColumnsOptions): Column<HelpDesk>[] {
  return [
    {
      Header: <FormattedMessage id="tickets.ticket_no" />,
      accessor: 'ticket_no',
      sortable: true,
      headerClassName: 'text-muted text-small text-uppercase w-30',
      Cell: ({ cell: { value }, row: { values } }: CellProps<HelpDesk>) => {
        return (
          <Link to={'/app/tickets/' + values.id} className="list-item-heading body">
            {value}
          </Link>
        );
      },
    },
    {
      Header: <FormattedMessage id="tickets.ticket_title" />,
      accessor: 'ticket_title',
      sortable: true,
      headerClassName: 'text-muted text-small text-uppercase w-10',
      Cell: ({ cell: { value }, row: { values } }: CellProps<HelpDesk>) => {
        return (
          <Link to={'/app/tickets/' + values.id} className="list-item-heading body">
            {value}
          </Link>
        );
      },
    },
    {
      Header: <FormattedMessage id="tickets.ticketstatus" />,
      accessor: 'ticketstatus',
      sortable: true,
      Cell: ({ cell: { value } }: CellProps<HelpDesk>) => {
        return <FormattedMessage id={'tickets.' + value}></FormattedMessage>;
      },
      headerClassName: 'text-muted text-small text-uppercase w-10',
    },
    {
      Header: <FormattedMessage id="tickets.createdtime" />,
      accessor: 'createdtime',
      sortable: true,
      headerClassName: 'text-muted text-small text-uppercase w-20',
      Cell: ({ cell: { value } }: CellProps<HelpDesk>) => {
        return formatToUserReadableDate(value);
        return value;
      },
    },
    {
      Header: <FormattedMessage id="tickets.ticketcategories" />,
      accessor: 'ticketcategories',
      sortable: true,
      headerClassName: 'text-muted text-small text-uppercase w-10',
    },
    {
      Header: '',
      accessor: 'id',
      sortable: false,
      headerClassName: 'empty w-10',
      Cell: ({ cell: { value } }: CellProps<HelpDesk>) => {
        return (
          <Button variant="warning" onClick={() => onEdit(value)}>
            <FormattedMessage id="general.edit" />
          </Button>
        );
      },
    },
  ];
}
