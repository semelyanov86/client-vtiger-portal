import { create } from 'zustand';

export interface Layouts {
  showingNavMenu: string;
  layoutShowingNavMenu: (value: string) => void;
}

export const useLayoutsStore = create<Layouts>((set) => ({
  showingNavMenu: '',
  layoutShowingNavMenu: (value: string) =>
    set(() => ({
      showingNavMenu: value,
    })),
}));
