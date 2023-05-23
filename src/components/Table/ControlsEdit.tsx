import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import { TableInstance } from 'react-table';

import HelpDesk from '../../features/help-desk/types';

interface ControlsEditProps {
  tableInstance: TableInstance<HelpDesk>;
}

export const ControlsEdit = ({ tableInstance }: ControlsEditProps) => {
  const { selectedFlatRows, setIsOpenAddEditModal } = tableInstance;
  if (selectedFlatRows.length !== 1) {
    return (
      <Button
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow edit-datatable"
        disabled
      >
        <Pencil></Pencil>
      </Button>
    );
  }
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-edit">Edit</Tooltip>}>
      <Button
        onClick={() => setIsOpenAddEditModal(true)}
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow edit-datatable"
      >
        <Pencil></Pencil>
      </Button>
    </OverlayTrigger>
  );
};
