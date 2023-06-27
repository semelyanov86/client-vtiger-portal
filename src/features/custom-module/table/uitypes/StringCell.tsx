import { Link } from 'react-router-dom';

import { DEFAULT_PATHS } from '../../../../config';

interface StringCellProps {
  value: string;
  id: string;
  module: string;
}

export const StringCell = ({ value, id, module }: StringCellProps) => {
  return (
    <Link
      to={DEFAULT_PATHS.CUSTOM_MODULES + '/' + module + '/' + id}
      className="list-item-heading body"
    >
      {value}
    </Link>
  );
};
