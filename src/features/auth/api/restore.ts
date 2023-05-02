import { axios } from '../../../lib/axios.ts';

export type RestorePasswordDTO = {
  email: string;
};

export type RestorePasswordResponse = {
  message: string;
  success: boolean;
};

export const sendPasswordResetToken = (
  data: RestorePasswordDTO
): Promise<RestorePasswordResponse> => {
  return axios.post('/users/restore', data);
};
