import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

import { Manager } from '../types';

interface ManagerState {
  manager: Manager;
  setManager: (value: Manager) => void;
}

const useManagerStore = create<ManagerState>((set) => ({
  manager: {
    id: '',
    user_name: '',
    first_name: '',
    last_name: '',
    email2: '',
    title: '',
    phone_work: '',
    department: '',
    description: '',
    address_city: '',
    address_state: '',
    address_postalcode: '',
    address_street: '',
    address_country: '',
  },
  setManager: (data: Manager) =>
    set(() => ({
      manager: data,
    })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Manager Store', useManagerStore);
}

export default useManagerStore;
