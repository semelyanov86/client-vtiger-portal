import ms from 'ms';
import { useQuery } from 'react-query';

import { axios, DataResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query.ts';
import HelpDesk from '../types';

export const getTicket = ({ ticketId }: { ticketId: string }): Promise<HelpDesk> => {
  return axios.get<DataResponse<HelpDesk>>(`/tickets/${ticketId}`).then((res) => res.data.data);
};

type QueryFnType = typeof getTicket;

type UseTicketOptions = {
  ticketId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useTicket = ({ ticketId, config }: UseTicketOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['ticket', ticketId],
    queryFn: () => getTicket({ ticketId }),
    retry: 3,
    cacheTime: ms('2 hours'),
    staleTime: ms('1 hour'),
    useErrorBoundary: false,
  });
};
