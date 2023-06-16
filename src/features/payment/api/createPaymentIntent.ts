import { axios, DataResponse } from '../../../lib/axios.ts';
import { PaymentIntent, PaymentIntentDto } from '../types';

export const createPaymentIntent = (intent: PaymentIntentDto): Promise<PaymentIntent> => {
  return axios
    .post<DataResponse<PaymentIntent>>('/payments/create-payment-intent', intent)
    .then((res) => res.data.data);
};
