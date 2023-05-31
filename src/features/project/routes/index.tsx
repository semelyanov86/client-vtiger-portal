import { Navigate, Route, Routes } from 'react-router-dom';

import { Projects } from './Projects.tsx';

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Projects />} />
      {/*<Route path=":projectId" element={<Ticket />} />*/}
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
