import { Navigate, Route, Routes } from 'react-router-dom';

import { Entities } from './Entities.tsx';
import { Entity } from './Entity.tsx';

export const CustomModuleRoutes = () => {
  return (
    <Routes>
      <Route path=":moduleName" element={<Entities />} />
      <Route path=":moduleName/:id" element={<Entity />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
