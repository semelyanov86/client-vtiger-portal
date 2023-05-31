import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { Project } from '../types';
import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import ms from 'ms';
import { useQuery } from 'react-query';

export interface ProjectQuery {
  page: number;
  size: number;
  search: string;
  sort: string;
}

export const getProjects = (query: ProjectQuery): Promise<DataPaginationResponse<Project>> => {
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

export const useProjects = (query: ProjectQuery) => {
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
