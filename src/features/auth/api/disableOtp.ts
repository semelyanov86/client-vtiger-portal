import { axios } from '../../../lib/axios.ts';
import { AuthUser, OtpDto } from '../types';

export const disableOtp = (data: OtpDto): Promise<AuthUser> => {
  return axios.patch('/otp/disable', data).then((res) => res.data);
};
