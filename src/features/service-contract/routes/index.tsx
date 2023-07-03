import { Navigate, Route, Routes } from 'react-router-dom';

import { ServiceContract } from './ServiceContract.tsx';
import { ServiceContracts } from './ServiceContracts.tsx';

export const ServiceContractRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ServiceContracts />} />
      <Route path=":contractId" element={<ServiceContract />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
