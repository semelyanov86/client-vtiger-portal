import { createContext, ReactNode, useContext, useState } from 'react';

import {
  AuthUser,
  RegisterCredentialsDTO,
  registerWithEmailAndPassword,
  resetPassword,
  ResetPasswordDTO,
} from '../features/auth';
import {
  RestorePasswordDTO,
  RestorePasswordResponse,
  sendPasswordResetToken,
} from '../features/auth/api/restore.ts';

interface AuthProps {
  children: ReactNode;
}

interface AuthContextType {
  user: AuthUser;
  login: (user: AuthUser) => void;
  logout: () => void;
  register: (data: RegisterCredentialsDTO) => Promise<AuthUser>;
  restore: (data: RestorePasswordDTO) => Promise<RestorePasswordResponse>;
  reset: (data: ResetPasswordDTO) => Promise<AuthUser>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<AuthUser>({} as AuthUser);
  const login = (user: AuthUser) => setUser(user);
  const logout = () => setUser({} as AuthUser);
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
