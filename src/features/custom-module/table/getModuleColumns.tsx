import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { CellProps, Column } from 'react-table';

import { CUSTOM_MODULES } from '../../../config';
import { CustomModule } from '../types';
import { DisplayCellValue } from './uitypes/DisplayCellValue.tsx';

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
          <DisplayCellValue
            value={value}
            field={field}
            module={module}
            id={values.id}
          ></DisplayCellValue>
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
