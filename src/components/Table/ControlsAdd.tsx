import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { TableInstance } from 'react-table';

import HelpDesk from '../../features/help-desk/types';

interface ControlsAddProps {
  tableInstance: TableInstance<HelpDesk>;
}

export const ControlsAdd = ({ tableInstance }: ControlsAddProps) => {
  const { toggleAllPageRowsSelected, setIsOpenAddEditModal } = tableInstance;
  const addButtonClick = () => {
    toggleAllPageRowsSelected(false);
    setIsOpenAddEditModal(true);
  };

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-add">Add</Tooltip>}>
      <Button
        onClick={addButtonClick}
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow add-datatable"
      >
        <Plus></Plus>
      </Button>
    </OverlayTrigger>
  );
};
