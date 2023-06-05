import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

import { Module } from '../types';

interface ModulesState {
  HelpDesk: Module;
  Project: Module;
  ProjectTask: Module;
  setHelpDesk: (value: Module) => void;
  setProject: (value: Module) => void;
  setProjectTask: (value: Module) => void;
}

const useModulesStore = create<ModulesState>((set) => ({
  HelpDesk: {} as Module,
  Project: {} as Module,
  ProjectTask: {} as Module,
  setHelpDesk: (value: Module) =>
    set(() => ({
      HelpDesk: value,
    })),
  setProject: (value: Module) =>
    set(() => ({
      Project: value,
    })),
  setProjectTask: (value: Module) =>
    set(() => ({
      ProjectTask: value,
    })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Modules Store', useModulesStore);
}

export default useModulesStore;
