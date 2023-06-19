import ms from 'ms';
import { useQuery } from 'react-query';

import { axios } from '../../../lib/axios.ts';
import { UserSettings } from '../types';

export const getUserSettings = (): Promise<UserSettings> => {
  return axios.get<UserSettings>('/users/settings').then((res) => res.data);
};

export const useUserSettings = () => {
  return useQuery<UserSettings, Error>({
    queryKey: ['user-settings'],
    queryFn: () => getUserSettings(),
    retry: 3,
    cacheTime: ms('3 days'),
    staleTime: ms('2 days'),
    useErrorBoundary: false,
  });
};
