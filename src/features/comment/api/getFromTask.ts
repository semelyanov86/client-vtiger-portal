import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { Comment } from '../types';

export const getCommentsFromTask = ({
  taskId,
  projectId,
}: {
  taskId: string;
  projectId: string;
}): Promise<DataPaginationResponse<Comment>> => {
  return axios
    .get<DataPaginationResponse<Comment>>(`/projects/${projectId}/tasks/${taskId}/comments`)
    .then((res) => res.data);
};

type QueryFnType = typeof getCommentsFromTask;

type UseCommentsOptions = {
  taskId: string;
  projectId: string;
};

export const useCommentsFromTask = ({ taskId, projectId }: UseCommentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['comments', taskId],
    queryFn: () => getCommentsFromTask({ taskId, projectId }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    useErrorBoundary: false,
  });
};
