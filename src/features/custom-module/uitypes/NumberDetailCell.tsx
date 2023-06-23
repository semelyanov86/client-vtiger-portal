interface NumberDetailCellProps {
  value: number;
}

export const NumberDetailCell = ({ value }: NumberDetailCellProps) => {
  return <p>{value}</p>;
};
