import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

import { Module } from '../types';

interface ModulesState {
  HelpDesk: Module;
  setHelpDesk: (value: Module) => void;
}

const useModulesStore = create<ModulesState>((set) => ({
  HelpDesk: {} as Module,
  setHelpDesk: (value: Module) =>
    set(() => ({
      HelpDesk: value,
    })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Modules Store', useModulesStore);
}

export default useModulesStore;
