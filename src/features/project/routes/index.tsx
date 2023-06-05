import { Navigate, Route, Routes } from 'react-router-dom';

import { ProjectTask } from '../../task/routes/ProjectTask.tsx';

import { Project } from './Project.tsx';
import { Projects } from './Projects.tsx';

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Projects />} />
      <Route path=":projectId" element={<Project />} />
      <Route path=":projectId/tasks/:taskId" element={<ProjectTask />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
