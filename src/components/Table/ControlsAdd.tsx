import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';
import { TableInstance } from 'react-table';

interface ControlsAddProps<T extends object> {
  tableInstance: TableInstance<T>;
}

export const ControlsAdd = <T extends object>({ tableInstance }: ControlsAddProps<T>) => {
  const { toggleAllPageRowsSelected, setIsOpenAddEditModal } = tableInstance;
  const addButtonClick = () => {
    toggleAllPageRowsSelected(false);
    setIsOpenAddEditModal(true);
  };

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="tooltip-top-add">
          <FormattedMessage id="general.add"></FormattedMessage>
        </Tooltip>
      }
    >
      <Button
        onClick={addButtonClick}
        variant="foreground-alternate"
        className="btn-icon btn-icon-only shadow add-datatable"
        data-testid="add-button-controls"
      >
        <Plus></Plus>
      </Button>
    </OverlayTrigger>
  );
};
