import { useQuery } from 'react-query';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query.ts';
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
  config?: QueryConfig<QueryFnType>;
};

export const useCommentsFromTicket = ({ ticketId, config }: UseCommentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['comments', ticketId],
    queryFn: () => getCommentsFromTicket({ ticketId }),
    ...config,
  });
};
