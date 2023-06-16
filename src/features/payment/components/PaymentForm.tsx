import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

import { Spinner } from '../../../components/Elements';
import { usePaymentConfig } from '../api/getPaymentConfig.ts';
import { IS_PAYMENT_SUPPORTED } from '../../../config/constants.ts';

interface PaymentFormProps {
  children: ReactNode;
}

export const PaymentForm = ({ children }: PaymentFormProps) => {
  const paymentConfig = usePaymentConfig();

  if (!IS_PAYMENT_SUPPORTED) {
    return null;
  }

  if (paymentConfig.isLoading) {
    return <Spinner></Spinner>;
  }
  if (!paymentConfig.data) {
    return null;
  }
  if (!paymentConfig.data.publishableKey) {
    return null;
  }
  const stripePromise = loadStripe(paymentConfig.data.publishableKey);

  return <Elements stripe={stripePromise}>{children}</Elements>;
};
