import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { axios } from '../../../lib/axios.ts';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import { UpdatePasswordForm } from './UpdatePasswordForm.tsx';

describe('UpdatePasswordForm', () => {
  test('should render form with not errors', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <UpdatePasswordForm></UpdatePasswordForm>
      </WrapToRouterAndIntl>
    );

    const form = screen.getByTestId('update-password-form');
    expect(form).toBeInTheDocument();

    const oldPasswordField = screen.getByLabelText('Old Password') as HTMLInputElement;
    expect(oldPasswordField).toBeInTheDocument();
    expect(oldPasswordField.type).toBe('password');

    const confirmPasswordField = screen.getByLabelText('Confirm Password') as HTMLInputElement;
    expect(confirmPasswordField).toBeInTheDocument();
    expect(confirmPasswordField.type).toBe('password');

    const passwordField = screen.getByLabelText('Password') as HTMLInputElement;
    expect(passwordField).toBeInTheDocument();
    expect(passwordField.type).toBe('password');

    const btn = screen.getByTestId('update-password-btn');
    expect(btn).toBeInTheDocument();

    view.unmount();
  });
  test('should render form with errors', async () => {
    const view = render(
      <WrapToRouterAndIntl>
        <UpdatePasswordForm></UpdatePasswordForm>
      </WrapToRouterAndIntl>
    );

    const oldPasswordField = screen.getByLabelText('Old Password') as HTMLInputElement;
    expect(oldPasswordField).toBeInTheDocument();

    const confirmPasswordField = screen.getByLabelText('Confirm Password') as HTMLInputElement;
    expect(confirmPasswordField).toBeInTheDocument();

    const passwordField = screen.getByLabelText('Password') as HTMLInputElement;
    expect(passwordField).toBeInTheDocument();

    const btn = screen.getByTestId('update-password-btn');
    expect(btn).toBeInTheDocument();
    fireEvent.input(oldPasswordField, { target: { value: '123' } });
    fireEvent.click(btn);

    await waitFor(
      () => {
        expect(screen.getByText('Required')).toBeInTheDocument();
      },
      { timeout: 100 }
    );

    view.unmount();
  });
  test('should validate passwords match', async () => {
    const view = render(
      <WrapToRouterAndIntl>
        <UpdatePasswordForm></UpdatePasswordForm>
      </WrapToRouterAndIntl>
    );

    const oldPasswordField = screen.getByLabelText('Old Password') as HTMLInputElement;
    expect(oldPasswordField).toBeInTheDocument();

    const confirmPasswordField = screen.getByLabelText('Confirm Password') as HTMLInputElement;
    expect(confirmPasswordField).toBeInTheDocument();

    const passwordField = screen.getByLabelText('Password') as HTMLInputElement;
    expect(passwordField).toBeInTheDocument();

    const btn = screen.getByTestId('update-password-btn');
    expect(btn).toBeInTheDocument();

    fireEvent.input(oldPasswordField, { target: { value: '123234123' } });
    fireEvent.input(confirmPasswordField, { target: { value: '123124234' } });
    fireEvent.input(passwordField, { target: { value: '12344543234' } });
    fireEvent.click(btn);

    await waitFor(
      () => {
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      },
      { timeout: 100 }
    );

    view.unmount();
  });
  test('should send form successfully', async () => {
    const mockFn = vi.fn().mockReturnValue(Promise.resolve({ data: {} }));
    axios.put = mockFn;
    const view = render(
      <WrapToRouterAndIntl>
        <UpdatePasswordForm></UpdatePasswordForm>
      </WrapToRouterAndIntl>
    );

    const oldPasswordField = screen.getByLabelText('Old Password') as HTMLInputElement;
    expect(oldPasswordField).toBeInTheDocument();

    const confirmPasswordField = screen.getByLabelText('Confirm Password') as HTMLInputElement;
    expect(confirmPasswordField).toBeInTheDocument();

    const passwordField = screen.getByLabelText('Password') as HTMLInputElement;
    expect(passwordField).toBeInTheDocument();

    const btn = screen.getByTestId('update-password-btn');
    expect(btn).toBeInTheDocument();

    fireEvent.input(oldPasswordField, { target: { value: 'pass123123' } });
    fireEvent.input(confirmPasswordField, { target: { value: 'pass1231234' } });
    fireEvent.input(passwordField, { target: { value: 'pass1231234' } });
    fireEvent.click(btn);

    await waitFor(
      () => {
        expect(mockFn).toHaveBeenCalled();
      },
      { timeout: 100 }
    );

    await waitFor(
      () => {
        expect(mockFn).toHaveBeenCalledWith('/users/my', {
          old_password: 'pass123123',
          password: 'pass1231234',
          confirmPassword: 'pass1231234',
        });
      },
      { timeout: 80 }
    );

    view.unmount();
  });
});
