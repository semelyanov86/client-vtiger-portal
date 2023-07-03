import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import { TableInstance } from 'react-table';

interface ControlsEditProps<T extends object> {
  tableInstance: TableInstance<T>;
}

export const ControlsEdit = <T extends object>({ tableInstance }: ControlsEditProps<T>) => {
  const { selectedFlatRows, setIsOpenAddEditModal } = tableInstance;
  if (selectedFlatRows.length !== 1) {
    return (
      <Button
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow edit-datatable"
        data-testid="edit-button-controls"
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
        data-testid="edit-button-controls"
      >
        <Pencil></Pencil>
      </Button>
    </OverlayTrigger>
  );
};
