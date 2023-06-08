import { Navigate, Route, Routes } from 'react-router-dom';

import { Invoice } from './Invoice.tsx';
import { Invoices } from './Invoices.tsx';

export const InvoiceRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Invoices />} />
      <Route path=":invoiceId" element={<Invoice />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
