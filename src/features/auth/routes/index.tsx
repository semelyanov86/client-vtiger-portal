import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';
import { Reset } from './Reset.tsx';
import { Forgot } from './Forgot.tsx';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="reset" element={<Reset />} />
      <Route path="forgot" element={<Forgot />} />
    </Routes>
  );
};
