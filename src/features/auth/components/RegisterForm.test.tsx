import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { axios } from '../../../lib/axios.ts';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import { RegisterForm } from './RegisterForm.tsx';

describe('RegisterForm', async () => {
  test('should render form correctly', () => {
    const onSuccess = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <RegisterForm onSuccess={onSuccess}></RegisterForm>
      </WrapToRouterAndIntl>
    );
    const element = screen.getByText('Welcome,');
    expect(element).toBeInTheDocument();

    view.unmount();
  });
  test('all register fields exists', () => {
    const onSuccess = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <RegisterForm onSuccess={onSuccess}></RegisterForm>
      </WrapToRouterAndIntl>
    );

    const email = screen.getByPlaceholderText('Email');
    expect(email).toBeInTheDocument();

    const code = screen.getByPlaceholderText('Code');
    expect(code).toBeInTheDocument();

    const password = screen.getByPlaceholderText('Password') as HTMLInputElement;
    expect(password).toBeInTheDocument();
    expect(password.type).toBe('password');

    const passwordConfirm = screen.getByPlaceholderText('Confirm Password') as HTMLInputElement;
    expect(passwordConfirm).toBeInTheDocument();
    expect(passwordConfirm.type).toBe('password');

    const btn = screen.getByRole('button', { name: 'Signup' });
    expect(btn).toBeInTheDocument();

    const terms = screen.getByTestId('terms');
    expect(terms).toBeInTheDocument();

    view.unmount();
  });
  test('sends correct data to registration endpoint', async () => {
    const onSuccess = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <RegisterForm onSuccess={onSuccess}></RegisterForm>
      </WrapToRouterAndIntl>
    );

    const email = screen.getByPlaceholderText('Email');
    const code = screen.getByPlaceholderText('Code');
    const password = screen.getByPlaceholderText('Password');
    const passwordConfirm = screen.getByPlaceholderText('Confirm Password');
    const terms = screen.getByTestId('terms');
    const btn = screen.getByRole('button', { name: 'Signup' });

    await userEvent.type(email, 'test@mail.ru');
    await userEvent.type(code, '12456');
    await userEvent.type(password, 'password123');
    await userEvent.type(passwordConfirm, 'password123');
    await userEvent.click(terms);

    const mockFn = vi.fn().mockReturnValue(Promise.resolve({ data: {} }));
    axios.post = mockFn;

    await userEvent.click(btn);
    expect(mockFn).toBeCalledTimes(1);

    const firstCallMock = mockFn.mock.calls[0];
    const body = firstCallMock[1];
    expect(body).toEqual({
      email: 'test@mail.ru',
      code: '12456',
      password: 'password123',
      confirmPassword: 'password123',
      terms: true,
    });
    expect(onSuccess).toBeCalledTimes(1);
    view.unmount();
  });
  test('data do not send if terms not accepted', async () => {
    const onSuccess = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <RegisterForm onSuccess={onSuccess}></RegisterForm>
      </WrapToRouterAndIntl>
    );

    const email = screen.getByPlaceholderText('Email');
    const code = screen.getByPlaceholderText('Code');
    const password = screen.getByPlaceholderText('Password');
    const passwordConfirm = screen.getByPlaceholderText('Confirm Password');
    const btn = screen.getByRole('button', { name: 'Signup' });

    await userEvent.type(email, 'test@mail.ru');
    await userEvent.type(code, '12456');
    await userEvent.type(password, 'password123');
    await userEvent.type(passwordConfirm, 'password123');

    const mockFn = vi.fn().mockReturnValue(Promise.resolve({ data: {} }));
    axios.post = mockFn;

    await userEvent.click(btn);
    expect(mockFn).toBeCalledTimes(0);

    expect(onSuccess).toBeCalledTimes(0);
    view.unmount();
  });
});
