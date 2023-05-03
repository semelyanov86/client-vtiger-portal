import { axios } from '../../../lib/axios';
import { Token } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<Token> => {
  return axios.post('/users/login', data);
};
