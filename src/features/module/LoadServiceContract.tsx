import React, { useEffect } from 'react';

import { NotifyError } from '../../components/Notifications/Notification.tsx';

import { useModule } from './api/getModule.ts';
import useModulesStore from './stores/module.ts';

export const LoadServiceContract: React.FC = () => {
  const { setServiceContract } = useModulesStore();
  const { data, error } = useModule('ServiceContracts');

  useEffect(() => {
    if (data) {
      setServiceContract(data);
    } else if (error) {
      NotifyError(error.message);
    }
  }, [error, data, setServiceContract]);

  return null;
};
