import { Link } from 'react-router-dom';

interface StringCellProps {
  value: string;
  id: string;
  module: string;
}

export const StringCell = ({ value, id, module }: StringCellProps) => {
  return (
    <Link to={'/app/custom/' + module + '/' + id} className="list-item-heading body">
      {value}
    </Link>
  );
};
