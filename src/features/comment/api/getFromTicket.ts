import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { Comment } from '../types';

export const getCommentsFromTicket = ({
  ticketId,
}: {
  ticketId: string;
}): Promise<DataPaginationResponse<Comment>> => {
  return axios
    .get<DataPaginationResponse<Comment>>(`/tickets/${ticketId}/comments`)
    .then((res) => res.data);
};

type QueryFnType = typeof getCommentsFromTicket;

type UseCommentsOptions = {
  ticketId: string;
};

export const useCommentsFromTicket = ({ ticketId }: UseCommentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['comments', ticketId],
    queryFn: () => getCommentsFromTicket({ ticketId }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    useErrorBoundary: false,
  });
};
