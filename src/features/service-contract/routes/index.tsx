import { Navigate, Route, Routes } from 'react-router-dom';

import { ServiceContracts } from './ServiceContracts.tsx';

export const ServiceContractRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ServiceContracts />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
