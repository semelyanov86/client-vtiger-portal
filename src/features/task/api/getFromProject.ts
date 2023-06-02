import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { ProjectTask } from '../types';

export const getTasksFromProject = ({
  projectId,
}: {
  projectId: string;
}): Promise<DataPaginationResponse<ProjectTask>> => {
  return axios
    .get<DataPaginationResponse<ProjectTask>>(`/projects/${projectId}/tasks`)
    .then((res) => res.data);
};

type QueryFnType = typeof getTasksFromProject;

type UseTasksOptions = {
  projectId: string;
};

export const useTasksFromProject = ({ projectId }: UseTasksOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasksFromProject({ projectId }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    useErrorBoundary: false,
  });
};
