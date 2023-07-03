import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

interface ButtonsAddNewProps {
  onClick: () => void;
}

export const ButtonsAddNew = ({ onClick }: ButtonsAddNewProps) => {
  return (
    <Button
      variant="outline-primary"
      className="btn-icon btn-icon-start w-100 w-md-auto add-datatable"
      onClick={onClick}
      data-testid={'add-new-button'}
    >
      <Plus></Plus>{' '}
      <span>
        <FormattedMessage id="general.add-new"></FormattedMessage>
      </span>
    </Button>
  );
};
