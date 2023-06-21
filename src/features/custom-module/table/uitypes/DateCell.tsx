import { formatToUserReadableDate } from '../../../misc/services/Dates.ts';

interface DateCellProps {
  value: string;
}

export const DateCell = ({ value }: DateCellProps) => {
  return <>{formatToUserReadableDate(value)}</>;
};
