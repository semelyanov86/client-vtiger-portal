interface AmountDetailCellProps {
  value: number;
}

export const AmountDetailCell = ({ value }: AmountDetailCellProps) => {
  return <p>{value}</p>;
};
