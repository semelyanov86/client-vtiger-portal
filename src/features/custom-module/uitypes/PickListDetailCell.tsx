import { FormattedMessage } from 'react-intl';

interface PickListDetailCellProps {
  value: string;
  module: string;
}

export const PickListDetailCell = ({ value, module }: PickListDetailCellProps) => {
  return (
    <p>
      <FormattedMessage id={module + '.' + value}></FormattedMessage>
    </p>
  );
};
