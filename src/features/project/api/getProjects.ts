import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import { Project } from '../types';

export const getProjects = (query: RequestQuery): Promise<DataPaginationResponse<Project>> => {
  return axios
    .get<DataPaginationResponse<Project>>('/projects/', {
      params: {
        page: query.page,
        size: query.size,
        search: query.search,
        sort: query.sort,
      },
    })
    .then((res) => res.data);
};

export const useProjects = (query: RequestQuery) => {
  return useQuery<DataPaginationResponse<Project>, Error>({
    queryKey: ['projects', query],
    queryFn: () => getProjects(query),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('2 hours'),
    staleTime: ms('1 hour'),
    useErrorBoundary: false,
  });
};
