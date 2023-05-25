import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { CellProps, Column } from 'react-table';

import HelpDesk from '../types';

export function getColumns(): Column<HelpDesk>[] {
  return [
    {
      Header: <FormattedMessage id="tickets.ticket_no" />,
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
      Header: <FormattedMessage id="tickets.ticket_title" />,
      accessor: 'ticket_title',
      sortable: true,
      headerClassName: 'text-muted text-small text-uppercase w-10',
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
        const date = new Date(value);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, add 1 and pad with '0' if needed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
      Header: 'Actions',
      accessor: 'id',
      sortable: false,
      headerClassName: 'empty w-10',
      Cell: () => (
        <Button>
          <FormattedMessage id="general.edit" />
        </Button>
      ),
    },
  ];
}
