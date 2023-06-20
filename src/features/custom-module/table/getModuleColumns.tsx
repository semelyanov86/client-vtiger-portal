import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { CellProps, Column } from 'react-table';

import { CUSTOM_MODULES } from '../../../config';
import { CustomModule } from '../types';

interface getColumnsOptions {
  onEdit: (ticketId: string) => void;
  module: string;
}

export function getModuleColumns({ onEdit, module }: getColumnsOptions): Column<CustomModule>[] {
  const result = CUSTOM_MODULES[module].list_fields.map((field) => {
    return {
      Header: <FormattedMessage id={module + '.' + field} />,
      accessor: field,
      sortable: true,
      headerClassName: 'text-muted text-small text-uppercase w-30',
      Cell: ({ cell: { value }, row: { values } }: CellProps<CustomModule>) => {
        return (
          <Link to={'/app/' + module + '/' + values.id} className="list-item-heading body">
            {value}
          </Link>
        );
      },
    };
  });
  result.push({
    Header: <FormattedMessage id={'general.action'} />,
    accessor: 'id',
    sortable: false,
    headerClassName: 'empty w-10',
    Cell: ({ cell: { value } }: CellProps<CustomModule>) => {
      return (
        <Button variant="warning" onClick={() => onEdit(value)}>
          <FormattedMessage id="general.edit" />
        </Button>
      );
    },
  });
  return result;
}
