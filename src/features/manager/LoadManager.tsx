import React, { useEffect } from 'react';

import { NotifyError } from '../../components/Notifications/Notification.tsx';
import { useUserStore } from '../../stores/user.ts';

import { useManager } from './api/getManager.ts';
import useManagerStore from './stores/manager.ts';

export const LoadManager: React.FC = () => {
  const { setManager } = useManagerStore();
  const { value } = useUserStore();
  const { data, error } = useManager(value.assigned_user_id ?? '19x1');

  useEffect(() => {
    if (data) {
      setManager(data);
    } else if (error) {
      NotifyError(error.message);
    }
  }, [error, data, setManager]);

  return null;
};
