import { Card, Col, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { Comment, CommentDTO } from '../types';

import { AddCommentForm } from './AddCommentForm.tsx';

interface CommentListProps {
  comments: Comment[];
  onAddComment: (comment: CommentDTO) => void;
  parentId: string;
  isAddLoading: boolean;
}

export const CommentList = ({
  comments,
  onAddComment,
  parentId,
  isAddLoading,
}: CommentListProps) => {
  return (
    <Card>
      <Card.Body>
        {comments.length < 1 ? (
          <p>
            <FormattedMessage id="comments.no-data"></FormattedMessage>
          </p>
        ) : (
          <>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="d-flex align-items-center border-bottom border-separator-light pb-3 mt-3"
              >
                <Row className="g-0 w-100">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      {comment.author.imagecontent ? (
                        <img
                          src={'data:image/png;base64, ' + comment.author.imagecontent}
                          className="img-fluid rounded-xl"
                          alt="thumb"
                        />
                      ) : (
                        <img
                          src="/img/profile/profile-5.webp"
                          className="img-fluid rounded-xl"
                          alt="thumb"
                        />
                      )}
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <NavLink to="#">
                      {comment.author.firstname} {comment.author.lastname}
                    </NavLink>
                    <div className="text-muted text-small mb-2">
                      {formatToUserReadableDate(comment.createdtime)}
                    </div>
                    <div className="text-medium text-alternate lh-1-25">
                      {comment.commentcontent}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        )}
        <AddCommentForm
          onAddComment={onAddComment}
          parentId={parentId}
          isLoading={isAddLoading}
        ></AddCommentForm>
      </Card.Body>
    </Card>
  );
};
