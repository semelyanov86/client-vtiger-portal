import { useEffect } from 'react';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { useUserStore } from '../../../stores/user.ts';
import { useUser } from '../api/getUser.ts';

export const LoadUser = () => {
  const { data, error, isError } = useUser();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (data) {
      setUser(data);
    } else if (isError && error) {
      NotifyError(error.message);
    }
  }, [error, data, setUser, isError]);

  return null;
};
