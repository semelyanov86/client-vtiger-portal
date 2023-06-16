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
