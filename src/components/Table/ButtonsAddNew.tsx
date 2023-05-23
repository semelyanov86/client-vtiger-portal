import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { TableInstance } from 'react-table';

import HelpDesk from '../../features/help-desk/types';

interface ButtonsAddNewProps {
  tableInstance: TableInstance<HelpDesk>;
}

export const ButtonsAddNew = ({ tableInstance }: ButtonsAddNewProps) => {
  const { toggleAllPageRowsSelected, setIsOpenAddEditModal } = tableInstance;

  const addButtonClick = () => {
    toggleAllPageRowsSelected(false);
    setIsOpenAddEditModal(true);
  };
  return (
    <Button
      variant="outline-primary"
      className="btn-icon btn-icon-start w-100 w-md-auto add-datatable"
      onClick={addButtonClick}
    >
      <Plus></Plus> <span>Add New</span>
    </Button>
  );
};
