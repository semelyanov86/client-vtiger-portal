import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { Send } from 'react-bootstrap-icons';
import { FieldValues, useForm } from 'react-hook-form';
import * as z from 'zod';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { CommentDTO } from '../types';

interface AddCommentFormProps {
  onAddComment: (comment: CommentDTO) => void;
  parentId: string;
  isLoading: boolean;
}

const schema = z.object({
  commentcontent: z.string().min(3, 'Comment content is required'),
});

type FormData = z.infer<typeof schema>;

export const AddCommentForm = ({ onAddComment, parentId }: AddCommentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      await onAddComment({
        data: {
          commentcontent: data.commentcontent,
        },
        parentId: parentId,
      });
      reset();
      setValue('commentcontent', '');
    } catch (e: any) {
      NotifyError(e.message);
    }
  };

  return (
    <div className="input-group mt-5">
      <InputGroup className="mb-3">
        <FormControl placeholder="Add a comment" {...register('commentcontent')} />
        {errors.commentcontent && (
          <div className="d-block invalid-tooltip">{errors.commentcontent.message}</div>
        )}
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="outline-primary"
          className="btn-icon btn-icon-end"
        >
          <span>Send</span>
          <Send></Send>
        </Button>
      </InputGroup>
    </div>
  );
};
