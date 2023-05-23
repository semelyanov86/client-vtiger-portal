import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Recycle } from 'react-bootstrap-icons';
import { TableInstance } from 'react-table';

interface ControlsDeleteProps<T extends Record<string, string>> {
  tableInstance: TableInstance<T>;
  deleteItems: (map: string[]) => void;
}

export const ControlsDelete = <T extends Record<string, string>>({
  tableInstance,
  deleteItems,
}: ControlsDeleteProps<T>) => {
  const { selectedFlatRows } = tableInstance;
  const onClick = () => {
    deleteItems(selectedFlatRows.map((x) => x.original.id));
  };

  if (selectedFlatRows.length === 0) {
    return (
      <Button
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow delete-datatable"
        disabled
      >
        <Recycle></Recycle>
      </Button>
    );
  }
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-delete">Delete</Tooltip>}>
      <Button
        onClick={onClick}
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow delete-datatable"
      >
        <Recycle></Recycle>
      </Button>
    </OverlayTrigger>
  );
};
