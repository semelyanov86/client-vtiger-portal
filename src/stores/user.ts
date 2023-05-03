import { create } from 'zustand';

import { AuthUser } from '../features/auth';

interface User {
  value: AuthUser;
  setUser: (value: AuthUser) => void;
}

export const useUserStore = create<User>((set) => ({
  value: {} as AuthUser,
  setUser: (data: AuthUser) =>
    set(() => ({
      value: data,
    })),
}));
