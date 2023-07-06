import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import { AddCommentForm } from './AddCommentForm.tsx';

describe('AddCommentForm', () => {
  test('should render form successfully', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <AddCommentForm onAddComment={() => {}} parentId="12x45" isLoading={false}></AddCommentForm>
      </WrapToRouterAndIntl>
    );
    const form = screen.getByTestId('comment-form');
    const contentField = screen.getByPlaceholderText('Add a comment') as HTMLInputElement;

    expect(form).toBeInTheDocument();
    expect(contentField).toBeInTheDocument();
    expect(contentField.value).toBe('');

    view.unmount();
  });
  test('should validate content field', async () => {
    const onAdd = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <AddCommentForm onAddComment={onAdd} parentId="12x45" isLoading={false}></AddCommentForm>
      </WrapToRouterAndIntl>
    );

    const contentField = screen.getByPlaceholderText('Add a comment') as HTMLInputElement;
    const submitBtn = screen.getByTestId('comment-form-submit');
    fireEvent.change(contentField, { target: { value: 'a' } });
    fireEvent.click(submitBtn);

    await waitFor(
      () => {
        expect(screen.getByText('Comment content is required')).toBeInTheDocument();
      },
      { timeout: 150 }
    );

    await waitFor(
      () => {
        expect(onAdd).not.toHaveBeenCalled();
      },
      { timeout: 100 }
    );
    view.unmount();
  });
  test('should call onAddComment when submit form successfully', async () => {
    const onAdd = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <AddCommentForm onAddComment={onAdd} parentId="12x45" isLoading={false}></AddCommentForm>
      </WrapToRouterAndIntl>
    );

    const contentField = screen.getByPlaceholderText('Add a comment') as HTMLInputElement;
    const submitBtn = screen.getByTestId('comment-form-submit');
    fireEvent.change(contentField, { target: { value: 'abcde' } });
    fireEvent.click(submitBtn);

    await waitFor(
      () => {
        expect(onAdd).toHaveBeenCalled();
      },
      { timeout: 100 }
    );
    await waitFor(
      () => {
        expect(onAdd).toHaveBeenCalledWith({
          data: {
            commentcontent: 'abcde',
          },
          parentId: '12x45',
          rootId: '',
        });
      },
      { timeout: 100 }
    );
    view.unmount();
  });
  test('should reset form when submit successfully', async () => {
    const onAdd = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <AddCommentForm onAddComment={onAdd} parentId="12x45" isLoading={false}></AddCommentForm>
      </WrapToRouterAndIntl>
    );

    const contentField = screen.getByPlaceholderText('Add a comment') as HTMLInputElement;
    const submitBtn = screen.getByTestId('comment-form-submit');
    fireEvent.change(contentField, { target: { value: 'abcde' } });
    fireEvent.click(submitBtn);

    await waitFor(
      () => {
        expect(contentField.value).toBe('');
      },
      { timeout: 100 }
    );
    view.unmount();
  });
  test('should disable submit button when loading', async () => {
    const onAdd = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <AddCommentForm onAddComment={onAdd} parentId="12x45" isLoading={true}></AddCommentForm>
      </WrapToRouterAndIntl>
    );

    const submitBtn = screen.getByTestId('comment-form-submit') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
    expect(screen.getByText('Sending')).toBeInTheDocument();
    view.unmount();
  });
});
