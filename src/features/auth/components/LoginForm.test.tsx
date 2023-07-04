import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { axios } from '../../../lib/axios.ts';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import { LoginForm } from './LoginForm.tsx';

describe('LoginForm', () => {
  test('should render form correctly', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <LoginForm onSuccess={() => {}}></LoginForm>
      </WrapToRouterAndIntl>
    );
    expect(screen.getByTestId('login-form')).toBeInTheDocument();

    view.unmount();
  });
  test('should render form with errors', async () => {
    const view = render(
      <WrapToRouterAndIntl>
        <LoginForm onSuccess={() => {}}></LoginForm>
      </WrapToRouterAndIntl>
    );
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByTestId('submit-btn');
    fireEvent.input(emailInput, { target: { value: 'test' } });
    fireEvent.input(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);
    await waitFor(
      () => {
        expect(screen.getByText('Should be a valid email address.')).toBeInTheDocument();
      },
      { timeout: 100 }
    );
    await waitFor(
      () => {
        expect(screen.getByText('Required')).toBeInTheDocument();
      },
      { timeout: 100 }
    );
    view.unmount();
  });
  test('should send form data', async () => {
    const mockFn = vi.fn().mockReturnValue(Promise.resolve({ data: {} }));
    axios.post = mockFn;
    const onSuccess = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <LoginForm onSuccess={onSuccess}></LoginForm>
      </WrapToRouterAndIntl>
    );
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByTestId('submit-btn');
    fireEvent.input(emailInput, { target: { value: 'test@mail.ru' } });
    fireEvent.input(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);
    await waitFor(
      () => {
        expect(onSuccess).toHaveBeenCalled();
      },
      { timeout: 200 }
    );
    await waitFor(
      () => {
        expect(mockFn).toHaveBeenCalledWith('/users/login', {
          email: 'test@mail.ru',
          password: '123456',
        });
      },
      { timeout: 200 }
    );
    view.unmount();
  });
});
