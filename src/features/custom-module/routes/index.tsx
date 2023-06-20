import { Navigate, Route, Routes } from 'react-router-dom';

import { Entities } from './Entities.tsx';

export const CustomModuleRoutes = () => {
  return (
    <Routes>
      <Route path=":moduleName" element={<Entities />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
