import { axios } from '../../../lib/axios.ts';
import { AuthUser, OtpDto } from '../types';

export const verifyOtp = (data: OtpDto): Promise<AuthUser> => {
  return axios.patch('/otp/verify', data).then((res) => res.data);
};
