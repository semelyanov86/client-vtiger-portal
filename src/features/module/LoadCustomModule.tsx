import React, { useEffect } from 'react';

import { NotifyError } from '../../components/Notifications/Notification.tsx';

import { useModule } from './api/getModule.ts';
import useModulesStore from './stores/module.ts';

interface LoadCustomModuleProps {
  moduleName: string;
}

export const LoadCustomModule: React.FC<LoadCustomModuleProps> = ({ moduleName }) => {
  const { setCustomModule } = useModulesStore();
  const { data, error } = useModule(moduleName);

  useEffect(() => {
    if (data) {
      setCustomModule(data, moduleName);
    } else if (error) {
      NotifyError(error.message);
    }
  }, [error, data, setCustomModule, moduleName]);

  return null;
};
