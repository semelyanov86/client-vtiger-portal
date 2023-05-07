import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

import { Company } from '../types';

interface CompanyState {
  value: Company;
  setCompany: (value: Company) => void;
}

const useCompanyStore = create<CompanyState>((set) => ({
  value: {
    id: '',
    organizationname: '',
    address: '',
    city: '',
    state: '',
    country: '',
    code: '',
    phone: '',
    fax: '',
    website: '',
    logoname: '',
    logo: '',
    vatid: '',
  },
  setCompany: (data: Company) =>
    set(() => ({
      value: data,
    })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Company Store', useCompanyStore);
}

export default useCompanyStore;
