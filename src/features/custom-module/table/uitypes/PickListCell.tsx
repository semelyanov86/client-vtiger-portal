import { FormattedMessage } from 'react-intl';

interface PickListCellProps {
  value: string;
  module: string;
}

export const PickListCell = ({ value, module }: PickListCellProps) => {
  return (
    <>
      <FormattedMessage id={module + '.' + value}></FormattedMessage>
    </>
  );
};
