import { useMutation } from 'react-query';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios } from '../../../lib/axios.ts';
import { queryClient } from '../../../lib/react-query.ts';
import { AuthUser } from '../types';

export type ChangeUserSettingsDTO = {
  data: {
    field: string;
    value: boolean;
  };
};

export const changeUserSettings = ({ data }: ChangeUserSettingsDTO): Promise<AuthUser> => {
  return axios
    .patch<AuthUser>('/users/settings', { [data.field]: data.value })
    .then((res) => res.data);
};

export const useChangeSettings = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries(['user-settings']);
      NotifySuccess('Settings was updated!');
    },
    mutationFn: changeUserSettings,
  });
};
