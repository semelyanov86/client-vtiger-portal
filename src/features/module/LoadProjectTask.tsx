import React, { useEffect } from 'react';

import { NotifyError } from '../../components/Notifications/Notification.tsx';

import { useModule } from './api/getModule.ts';
import useModulesStore from './stores/module.ts';

export const LoadProjectTask: React.FC = () => {
  const { setProject } = useModulesStore();
  const { data, error } = useModule('ProjectTask');

  useEffect(() => {
    if (data) {
      setProject(data);
    } else if (error) {
      NotifyError(error.message);
    }
  }, [error, data, setProject]);

  return null;
};
