import { useMutation } from 'react-query';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios } from '../../../lib/axios.ts';
import { MutationConfig, queryClient } from '../../../lib/react-query.ts';
import { Comment, CommentDTO } from '../types';

export const createToTask = (comment: CommentDTO): Promise<Comment> => {
  return axios
    .post(`/projects/${comment.rootId}/tasks/${comment.parentId}/comments`, comment.data)
    .then((res) => res.data);
};

type UseCreateToTaskOptions = {
  taskId: string;
  config?: MutationConfig<typeof createToTask>;
};

export const useCreateToTaskComment = ({ config, taskId }: UseCreateToTaskOptions) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', taskId]);
      NotifySuccess('Comment Added!');
    },
    ...config,
    mutationFn: createToTask,
  });
};
