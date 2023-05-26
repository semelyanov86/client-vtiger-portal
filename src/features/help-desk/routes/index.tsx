import { Navigate, Route, Routes } from 'react-router-dom';

import { Ticket } from './Ticket.tsx';
import { Tickets } from './Tickets.tsx';

export const TicketsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Tickets />} />
      <Route path=":ticketId" element={<Ticket />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
