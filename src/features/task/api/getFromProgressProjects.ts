import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { ProjectTask } from '../types';

export const getFromProgressProjects = (): Promise<ProjectTask[]> => {
  return axios
    .get<DataPaginationResponse<ProjectTask>>('/statistics/tasks')
    .then((res) => res.data.data);
};

type QueryFnType = typeof getFromProgressProjects;

export const useProgressProjectsTasks = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['progress-tasks'],
    queryFn: () => getFromProgressProjects(),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    useErrorBoundary: false,
  });
};
