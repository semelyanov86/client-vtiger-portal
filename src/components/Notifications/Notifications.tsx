// import { useNotificationStore } from '../../stores/notifications';

import { Slide, ToastContainer } from 'react-toastify';

export const Notifications = () => {
  // const { notifications, dismissNotification } = useNotificationStore();

  return <ToastContainer transition={Slide} newestOnTop />;
};
