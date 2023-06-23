import { useMutation } from 'react-query';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios } from '../../../lib/axios.ts';
import { MutationConfig, queryClient } from '../../../lib/react-query.ts';
import { Comment, CommentDTO } from '../types';

export const createToCustomModule = (comment: CommentDTO): Promise<Comment> => {
  return axios
    .post(`/custom-modules/${comment.parentModule}/${comment.parentId}/comments`, comment.data)
    .then((res) => res.data);
};

type UseCreateToCustomModuleOptions = {
  entityId: string;
  module: string;
  config?: MutationConfig<typeof createToCustomModule>;
};

export const useCreateToCustomModuleComment = ({
  config,
  entityId,
  module,
}: UseCreateToCustomModuleOptions) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', entityId, module]);
      NotifySuccess('Comment Added!');
    },
    ...config,
    mutationFn: createToCustomModule,
  });
};
