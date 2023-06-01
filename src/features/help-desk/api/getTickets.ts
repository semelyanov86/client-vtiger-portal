import ms from 'ms';
import { useQuery } from 'react-query';

import { axios } from '../../../lib/axios';
import { RequestQuery } from '../../misc/types/query.ts';
import HelpDesk from '../types';

interface HelpDeskResult {
  data: HelpDesk[];
  count: number;
  page: number;
  size: number;
}

export const getTickets = (query: RequestQuery): Promise<HelpDeskResult> => {
  return axios
    .get<HelpDeskResult>('/tickets/', {
      params: {
        page: query.page,
        size: query.size,
        search: query.search,
        sort: query.sort,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const useTickets = (query: RequestQuery) => {
  return useQuery<HelpDeskResult, Error>({
    queryKey: ['tickets', query],
    queryFn: () => getTickets(query),
    retry: 3,
    cacheTime: ms('5 minutes'),
    staleTime: ms('3 minutes'),
    useErrorBoundary: false,
  });
};
