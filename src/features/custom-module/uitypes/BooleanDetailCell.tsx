import { Form } from 'react-bootstrap';

interface BooleanDetailCellProps {
  value: boolean;
}

export const BooleanDetailCell = ({ value }: BooleanDetailCellProps) => {
  return <Form.Check disabled checked={value} />;
};
