import { Slide, ToastContainer } from 'react-toastify';

export const Notifications = () => {
  return (
    <ToastContainer
      transition={Slide}
      newestOnTop
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      rtl={false}
      pauseOnHover
      theme="light"
    />
  );
};
