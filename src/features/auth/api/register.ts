import { axios } from '../../../lib/axios';
import { AuthUser } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  code: string;
};

export const registerWithEmailAndPassword = (data: RegisterCredentialsDTO): Promise<AuthUser> => {
  return axios.post('/users/', data);
};
