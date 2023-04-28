import { useState, useContext, createContext, ReactNode } from 'react';

import { AuthUser } from '../features/auth';

interface AuthProps {
  children: ReactNode;
}

interface AuthContextType {
  user: AuthUser;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<AuthUser>({} as AuthUser);
  const login = (user: AuthUser) => setUser(user);
  const logout = () => setUser({} as AuthUser);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuthContext = () => useContext(AuthContext);
