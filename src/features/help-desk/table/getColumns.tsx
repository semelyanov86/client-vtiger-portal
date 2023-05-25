import { Badge, Button } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { CellProps, Column } from 'react-table';

import HelpDesk from '../types';

export function getColumns(): Column<HelpDesk>[] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { formatMessage: f } = useIntl();

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
}
