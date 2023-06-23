interface StringDetailCellProps {
  value: string;
}

export const StringDetailCell = ({ value }: StringDetailCellProps) => {
  return <p>{value == '' ? '--' : value}</p>;
};
