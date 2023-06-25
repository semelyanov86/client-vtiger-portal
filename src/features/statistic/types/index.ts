// eslint-disable-next-line
type Statistics = {
  tickets: {
    total: number;
    Open: number;
    'In Progress': number;
    'Wait For Response': number;
    Closed: number;
    'Open-hours': number;
    'Open-days': number;
    'In Progress-hours': number;
    'In Progress-days': number;
    'Wait For Response-hours': number;
    'Wait For Response-days': number;
    'Closed-Hours': number;
    'Closed-Days': number;
  };
  projects: {
    total: number;
    open: number;
    open_hours: number;
    closed: number;
    closed_hours: number;
  };
  tasks: {
    total: number;
    open: number;
    'open-hours': number;
    'In Progress': number;
    'In Progress-hours': number;
    Completed: number;
    'Completed-hours': number;
  };
  invoices: {
    total_qty: number;
    total_sum: number;
    open_qty: number;
    open_sum: number;
    paid_qty: number;
    paid_sum: number;
  };
};
