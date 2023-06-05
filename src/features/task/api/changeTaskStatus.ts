import { useMutation } from 'react-query';

import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios } from '../../../lib/axios.ts';
import { queryClient } from '../../../lib/react-query.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import { ProjectTask } from '../types';

export type ChangeTaskStatusDTO = {
  data: {
    projecttaskstatus: string;
  };
  id: string;
  parentId: string;
};

export const changeTaskStatus = ({
  data,
  id,
  parentId,
}: ChangeTaskStatusDTO): Promise<ProjectTask> => {
  return axios
    .patch<ProjectTask>(`/projects/${parentId}/tickets/${id}`, data)
    .then((res) => res.data);
};

type UseChangeTaskStatusOptions = {
  query?: RequestQuery | undefined;
};

export const useChangeTaskStatus = ({ query }: UseChangeTaskStatusOptions) => {
  return useMutation<ProjectTask, Error, ChangeTaskStatusDTO, unknown>({
    onSuccess: (data: ProjectTask) => {
      queryClient.refetchQueries(['task', data.id]);
      if (query) {
        queryClient.invalidateQueries({ queryKey: ['tasks', data.projectid] });
      }
      NotifySuccess('Task status changed to ' + data.projecttaskstatus);
    },
    mutationFn: changeTaskStatus,
    useErrorBoundary: false,
    retry: 2,
    onError: (error) => {
      NotifyError(error.message);
    },
  });
};
