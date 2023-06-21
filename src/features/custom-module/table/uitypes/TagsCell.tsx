import { Badge } from 'react-bootstrap';

interface TagsCellProps {
  value: string[];
}

export const TagsCell = ({ value }: TagsCellProps) => {
  if (value[0] == '') {
    return null;
  }
  return (
    <>
      {value.map((text) => (
        <>
          <Badge bg="quaternary" className="text-uppercase">
            {text}
          </Badge>{' '}
        </>
      ))}
    </>
  );
};
