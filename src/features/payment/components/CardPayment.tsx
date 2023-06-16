import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { useUserStore } from '../../../stores/user.ts';
import { confirmPayment } from '../api/confirmPayment.ts';
import { createPaymentIntent } from '../api/createPaymentIntent.ts';
import { PaymentIntentDto } from '../types';

export const CardPayment = ({
  currency,
  paymentMethodType,
  invoice_id,
  so_id,
  amount,
}: PaymentIntentDto) => {
  const stripe = useStripe();
  const elements = useElements();
  const { value } = useUserStore();
  const [notActive, setNotActive] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();
    setNotActive(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      NotifyError('Stripe.js has not yet loaded.');
      return;
    }

    createPaymentIntent({
      amount: amount,
      currency: currency,
      invoice_id: invoice_id,
      paymentMethodType: paymentMethodType,
      so_id: so_id,
    })
      .then((res) => {
        const clientSecret = res.clientSecret;

        stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement) as StripeCardElement,
              billing_details: {
                name: value.lastname + ' ' + value.firstname,
              },
            },
          })
          .then((paymentIntent) => {
            if (paymentIntent.paymentIntent) {
              confirmPayment(paymentIntent.paymentIntent).catch((error) =>
                NotifyError('can not confirm payment: ' + error.message)
              );
            }
            NotifySuccess(`Payment ${paymentIntent.paymentIntent?.status} for order ${so_id}`);
            setNotActive(false);
          })
          .catch((error) => {
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
            NotifyError(error.message);
            setNotActive(false);
          });
      })
      .catch((error) => {
        // Show error to your customer (e.g., insufficient funds)
        NotifyError(error.message);
        return;
      });
  };

  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
      <p className="lead mb-3">
        <FormattedMessage id="payments.pay-now"></FormattedMessage>
      </p>
      <CardElement id="card"></CardElement>
      <Button type="submit" variant="success" className="mb-1 mt-3" disabled={notActive}>
        {notActive ? (
          <FormattedMessage id="payments.processing"></FormattedMessage>
        ) : (
          <FormattedMessage id="payments.make-payment"></FormattedMessage>
        )}
      </Button>
    </Form>
  );
};
