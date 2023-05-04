import { create } from 'zustand';

export type ScrollSpyItems = {
  id: string;
  text: string;
  subs?: ScrollSpyItems[];
};

interface ScrollSpyStore {
  items: ScrollSpyItems[];
  setScrollSpyItems: (items: ScrollSpyItems[]) => void;
}

export const useScrollSpyStore = create<ScrollSpyStore>((set) => ({
  items: [],
  setScrollSpyItems: (items: ScrollSpyItems[]) =>
    set(() => ({
      items: items,
    })),
}));
