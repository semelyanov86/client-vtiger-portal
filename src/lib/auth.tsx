import { createContext, ReactNode, useContext } from 'react';

import {
  AuthUser,
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
  RegisterCredentialsDTO,
  registerWithEmailAndPassword,
  resetPassword,
  ResetPasswordDTO,
  Token,
} from '../features/auth';
import {
  RestorePasswordDTO,
  RestorePasswordResponse,
  sendPasswordResetToken,
} from '../features/auth/api/restore.ts';
import { useUserStore } from '../stores/user.ts';

import { removeToken } from './token.ts';

interface AuthProps {
  children: ReactNode;
}

interface AuthContextType {
  user: AuthUser;
  login: (login: LoginCredentialsDTO) => Promise<Token>;
  logout: () => void;
  register: (data: RegisterCredentialsDTO) => Promise<AuthUser>;
  restore: (data: RestorePasswordDTO) => Promise<RestorePasswordResponse>;
  reset: (data: ResetPasswordDTO) => Promise<AuthUser>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider = ({ children }: AuthProps) => {
  const { value: user } = useUserStore();
  const login = (login: LoginCredentialsDTO) => {
    return loginWithEmailAndPassword(login);
  };
  const logout = () => removeToken();
  const register = (data: RegisterCredentialsDTO) => {
    return registerWithEmailAndPassword(data);
  };
  const restore = (data: RestorePasswordDTO) => {
    return sendPasswordResetToken(data);
  };
  const reset = (data: ResetPasswordDTO) => {
    return resetPassword(data);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register, restore, reset }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
