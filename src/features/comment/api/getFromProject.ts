import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { Comment } from '../types';

export const getCommentsFromProject = ({
  projectId,
}: {
  projectId: string;
}): Promise<DataPaginationResponse<Comment>> => {
  return axios
    .get<DataPaginationResponse<Comment>>(`/projects/${projectId}/comments`)
    .then((res) => res.data);
};

type QueryFnType = typeof getCommentsFromProject;

type UseCommentsOptions = {
  projectId: string;
};

export const useCommentsFromProject = ({ projectId }: UseCommentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['comments', projectId],
    queryFn: () => getCommentsFromProject({ projectId }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    useErrorBoundary: false,
  });
};
