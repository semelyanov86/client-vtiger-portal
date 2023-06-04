import { axios } from '../../../lib/axios.ts';
import { OtpData } from '../types';

export const generateOtp = (): Promise<OtpData> => {
  return axios
    .get<OtpData>('/otp/generate')
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(`Error generating OTP: ${error.message}`);
    });
};
