import { Card, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { NULLABLE_DATE } from '../../../config/constants.ts';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { useProgressProjectsTasks } from '../api/getFromProgressProjects.ts';

export const ProgressTasks = () => {
  const tasksQuery = useProgressProjectsTasks();
  if (tasksQuery.isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  if (!tasksQuery.data) {
    return (
      <p>
        <FormattedMessage id="general.no-data"></FormattedMessage>
      </p>
    );
  }

  return (
    <Card className="h-100-card">
      <Card.Body className="mb-n2 h-100">
        {tasksQuery.data.map((task) => (
          <div key={task.id} className="mb-2">
            <label className="form-check w-100 checked-line-through checked-opacity-75">
              <input
                type="checkbox"
                className="form-check-input"
                checked={
                  task.projecttaskstatus == 'Closed' || task.projecttaskstatus == 'Completed'
                }
                readOnly={true}
              />
              <span className="form-check-label d-block">
                <span>{task.projecttaskname}</span>
                <span className="text-muted d-block text-small mt-0">
                  {task.startdate == NULLABLE_DATE
                    ? formatToUserReadableDate(task.createdtime)
                    : formatToUserReadableDate(task.startdate)}
                </span>
              </span>
            </label>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};
