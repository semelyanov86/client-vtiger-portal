import { Form } from 'react-bootstrap';

interface BooleanCellProps {
  value: boolean;
}

export const BooleanCell = ({ value }: BooleanCellProps) => {
  return <Form.Check disabled checked={value} />;
};
