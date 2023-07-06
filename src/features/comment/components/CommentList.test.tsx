import { render, screen } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';
import { Comment } from '../types';

import { CommentList } from './CommentList.tsx';

describe('CommentList', () => {
  const comments = [
    {
      id: '1',
      author: {
        firstname: 'John',
        lastname: 'Doe',
        imagecontent: 'base64-image',
      },
      createdtime: '2022-01-01T00:00:00Z',
      commentcontent: 'This is a comment',
    },
  ] as unknown as Comment[];

  const addComment = vi.fn();
  test('should render no data message when comments array is empty', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <CommentList
          comments={[]}
          onAddComment={addComment}
          parentId="12x11"
          isAddLoading={false}
        />
      </WrapToRouterAndIntl>
    );

    const noDataMessage = screen.getByText('No comments available');

    expect(noDataMessage).toBeInTheDocument();

    view.unmount();
  });
  test('renders comments', () => {
    render(
      <WrapToRouterAndIntl>
        <CommentList
          comments={comments}
          onAddComment={addComment}
          parentId="parent-id"
          isAddLoading={false}
        />
      </WrapToRouterAndIntl>
    );

    const commentAuthor = screen.getByText('John Doe');
    const commentContent = screen.getByText('This is a comment');

    expect(commentAuthor).toBeInTheDocument();
    expect(commentContent).toBeInTheDocument();
  });

  test('renders default profile image when author image is not provided', () => {
    const commentWithoutImage = {
      id: '1',
      author: {
        firstname: 'John',
        lastname: 'Doe',
      },
      createdtime: '2022-01-01T00:00:00Z',
      commentcontent: 'This is a comment',
    } as Comment;

    render(
      <WrapToRouterAndIntl>
        <CommentList
          comments={[commentWithoutImage]}
          onAddComment={addComment}
          parentId="parent-id"
          isAddLoading={false}
        />
      </WrapToRouterAndIntl>
    );

    const defaultProfileImage = screen.getByAltText('John');
    expect(defaultProfileImage).toHaveAttribute('src', '/img/profile/profile-11.webp');
  });
});
