import React, { useEffect } from 'react';

import { NotifyError } from '../../components/Notifications/Notification.tsx';

import { useModule } from './api/getModule.ts';
import useModulesStore from './stores/module.ts';

export const LoadHelpDesk: React.FC = () => {
  const { setHelpDesk } = useModulesStore();
  const { data, error } = useModule('HelpDesk');

  useEffect(() => {
    if (data) {
      setHelpDesk(data);
    } else if (error) {
      NotifyError(error.message);
    }
  }, [error, data, setHelpDesk]);

  return null;
};
