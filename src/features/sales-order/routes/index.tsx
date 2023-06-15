import { Navigate, Route, Routes } from 'react-router-dom';

import { SalesOrder } from './SalesOrder.tsx';
import { SalesOrders } from './SalesOrders.tsx';

export const SalesOrderRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<SalesOrders />} />
      <Route path=":salesOrderId" element={<SalesOrder />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
