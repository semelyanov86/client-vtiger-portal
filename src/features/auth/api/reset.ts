import { axios } from '../../../lib/axios.ts';
import { AuthUser } from '../types';

export type ResetPasswordDTO = {
  token: string;
  password: string;
};

export const resetPassword = (data: ResetPasswordDTO): Promise<AuthUser> => {
  return axios.put('/users/password', data);
};
