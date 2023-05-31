import { Col } from 'react-bootstrap';

import { DocksBlock } from '../organisms/DocksBlock.tsx';
import { ForumsBlock } from '../organisms/ForumsBlock.tsx';
import { SubmitTicketBlock } from '../organisms/SubmitTicketBlock.tsx';

export const SidebarBlock = () => {
  return (
    <Col xl="4" xxl="3">
      <DocksBlock></DocksBlock>
      <ForumsBlock></ForumsBlock>
      <SubmitTicketBlock></SubmitTicketBlock>
    </Col>
  );
};
