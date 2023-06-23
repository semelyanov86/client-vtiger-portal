import { TagsList } from '../../../../components/Elements/DetailPage/TagsList.tsx';

interface TagsCellProps {
  value: string[];
}

export const TagsCell = ({ value }: TagsCellProps) => {
  if (value[0] == '') {
    return null;
  }
  return (
    <>
      <TagsList tags={value}></TagsList>
    </>
  );
};
