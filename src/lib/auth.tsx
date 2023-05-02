import { createContext, ReactNode, useContext, useState } from 'react';

import { AuthUser, RegisterCredentialsDTO, registerWithEmailAndPassword } from '../features/auth';

interface AuthProps {
  children: ReactNode;
}

interface AuthContextType {
  user: AuthUser;
  login: (user: AuthUser) => void;
  logout: () => void;
  register: (data: RegisterCredentialsDTO) => Promise<AuthUser>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<AuthUser>({} as AuthUser);
  const login = (user: AuthUser) => setUser(user);
  const logout = () => setUser({} as AuthUser);
  const register = async (data: RegisterCredentialsDTO) => {
    return await registerWithEmailAndPassword(data);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
