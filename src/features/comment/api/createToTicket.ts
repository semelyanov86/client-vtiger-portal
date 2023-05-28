import { useMutation } from 'react-query';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios } from '../../../lib/axios.ts';
import { MutationConfig, queryClient } from '../../../lib/react-query.ts';
import { Comment, CommentDTO } from '../types';

export const createToTicket = (comment: CommentDTO): Promise<Comment> => {
  return axios.post(`/tickets/${comment.parentId}/comments`, comment.data).then((res) => res.data);
};

type UseCreateToTicketOptions = {
  ticketId: string;
  config?: MutationConfig<typeof createToTicket>;
};

export const useCreateToTicketComment = ({ config, ticketId }: UseCreateToTicketOptions) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', ticketId]);
      NotifySuccess('Comment Added!');
    },
    ...config,
    mutationFn: createToTicket,
  });
};
