import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { Project } from '../types';

export const getProject = ({ projectId }: { projectId: string }): Promise<Project> => {
  return axios.get<DataResponse<Project>>(`/projects/${projectId}`).then((res) => res.data.data);
};

type QueryFnType = typeof getProject;

type UseProjectOptions = {
  projectId: string;
};

export const useProject = ({ projectId }: UseProjectOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: [projectId],
    queryFn: () => getProject({ projectId }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('1 days'),
    staleTime: ms('12 hours'),
    useErrorBoundary: false,
  });
};
