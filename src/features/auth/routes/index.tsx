import { Route, Routes } from 'react-router-dom';

import { Forgot } from './Forgot.tsx';
import { Login } from './Login';
import { Register } from './Register';
import { Reset } from './Reset.tsx';

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
