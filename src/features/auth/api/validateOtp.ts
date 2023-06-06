import { axios } from '../../../lib/axios.ts';
import { AuthUser, OtpDto } from '../types';

export const validateOtp = (data: OtpDto): Promise<AuthUser> => {
  return axios.patch('/otp/validate', data).then((res) => res.data);
};
