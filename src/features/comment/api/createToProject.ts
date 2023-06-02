import { useMutation } from 'react-query';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios } from '../../../lib/axios.ts';
import { MutationConfig, queryClient } from '../../../lib/react-query.ts';
import { Comment, CommentDTO } from '../types';

export const createToProject = (comment: CommentDTO): Promise<Comment> => {
  return axios.post(`/projects/${comment.parentId}/comments`, comment.data).then((res) => res.data);
};

type UseCreateToProjectOptions = {
  projectId: string;
  config?: MutationConfig<typeof createToProject>;
};

export const useCreateToProjectComment = ({ config, projectId }: UseCreateToProjectOptions) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', projectId]);
      NotifySuccess('Comment Added!');
    },
    ...config,
    mutationFn: createToProject,
  });
};
