export type PaymentConfig = {
  publishableKey: string;
};

export type PaymentIntent = {
  clientSecret: string;
};

export type PaymentIntentDto = {
  currency: string;
  paymentMethodType: string;
  invoice_id: string;
  so_id: string;
  amount: number;
};

export type Payment = {
  id: number;
  stripe_payment_id: string;
  user_id: string;
  account_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: number;
  parent_id: string;
  created_at: string;
  updated_at: string;
};
