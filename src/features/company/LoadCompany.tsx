import { useEffect } from 'react';

import { NotifyError } from '../../components/Notifications/Notification.tsx';

import { useCompany } from './api/getCompany.ts';
import useCompanyStore from './stores/company.ts';

export const LoadCompany: React.FC = () => {
  const { data, error } = useCompany();
  const { setCompany } = useCompanyStore();

  useEffect(() => {
    if (data) {
      setCompany(data);
    } else if (error) {
      NotifyError(error.message);
    }
  }, [error, data, setCompany]);

  return null;
};
