import { axios } from '../../../lib/axios.ts';
import { AuthUser } from '../types';

export const updateUser = (data: AuthUser): Promise<AuthUser> => {
  return axios.put('/users/my', data).then((res) => res.data);
};
