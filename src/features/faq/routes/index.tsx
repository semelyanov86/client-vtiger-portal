import { Navigate, Route, Routes } from 'react-router-dom';

import { Faqs } from './Faqs.tsx';

export const FaqsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Faqs />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
