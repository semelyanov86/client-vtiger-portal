import { Badge } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

interface TagsListProps {
  tags: string[];
}

export const TagsList = ({ tags }: TagsListProps) => {
  if (tags.length > 0 && tags[0] != '') {
    return (
      <>
        {tags.map((tag) => (
          <Badge key={tag} bg="outline-primary" data-testid="tagTest">
            {tag}
          </Badge>
        ))}
      </>
    );
  }
  return (
    <>
      <p>
        <FormattedMessage id="general.no-tags"></FormattedMessage>
      </p>
    </>
  );
};
