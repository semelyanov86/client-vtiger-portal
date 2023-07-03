import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

import { Module } from '../types';

interface ModulesState {
  HelpDesk: Module;
  Project: Module;
  ProjectTask: Module;
  ServiceContract: Module;
  customModules: {
    [key: string]: Module;
  };
  setCustomModule: (value: Module, name: string) => void;
  setHelpDesk: (value: Module) => void;
  setProject: (value: Module) => void;
  setProjectTask: (value: Module) => void;
  setServiceContract: (value: Module) => void;
}

const useModulesStore = create<ModulesState>((set) => ({
  HelpDesk: {} as Module,
  Project: {} as Module,
  ProjectTask: {} as Module,
  ServiceContract: {} as Module,
  customModules: {},
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
  setServiceContract: (value: Module) =>
    set(() => ({
      ServiceContract: value,
    })),
  setCustomModule: (value: Module, name: string) =>
    set((state) => ({
      customModules: { ...state.customModules, [name]: value },
    })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Modules Store', useModulesStore);
}

export default useModulesStore;
