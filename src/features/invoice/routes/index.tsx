import { Navigate, Route, Routes } from 'react-router-dom';

import { Invoices } from './Invoices.tsx';

export const InvoiceRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Invoices />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
