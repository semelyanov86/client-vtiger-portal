import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { ProjectTask } from '../types';

export const getTask = ({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}): Promise<ProjectTask> => {
  return axios
    .get<DataResponse<ProjectTask>>(`/projects/${projectId}/tasks/${taskId}`)
    .then((res) => res.data.data);
};

type QueryFnType = typeof getTask;

type UseTaskOptions = {
  projectId: string;
  taskId: string;
};

export const useTask = ({ projectId, taskId }: UseTaskOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: [taskId],
    queryFn: () => getTask({ projectId, taskId }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('1 days'),
    staleTime: ms('12 hours'),
    useErrorBoundary: false,
  });
};
