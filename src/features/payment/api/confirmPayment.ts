import { PaymentIntent } from '@stripe/stripe-js';

import { axios, DataResponse } from '../../../lib/axios.ts';

export const confirmPayment = (intent: PaymentIntent): Promise<PaymentIntent> => {
  return axios
    .post<DataResponse<PaymentIntent>>('/payments/confirm', intent)
    .then((res) => res.data.data);
};
