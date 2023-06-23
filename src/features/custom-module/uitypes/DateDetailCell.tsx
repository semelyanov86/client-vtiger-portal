import { formatToUserReadableDate } from '../../misc/services/Dates.ts';

interface DateDetailCellProps {
  value: string;
}

export const DateDetailCell = ({ value }: DateDetailCellProps) => {
  return <>{formatToUserReadableDate(value)}</>;
};
