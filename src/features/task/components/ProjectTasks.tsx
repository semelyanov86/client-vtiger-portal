import { Badge, Card, Col, Row, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { DEFAULT_PATHS } from '../../../config';
import { ListEntities } from '../../misc/components/ListEntities.tsx';
import { Project } from '../../project/types';
import { useTasksFromProject } from '../api/getFromProject.ts';
import { ProjectTask } from '../types';

interface ProjectTasksProps {
  project: Project;
}

export const ProjectTasks = ({ project }: ProjectTasksProps) => {
  const tasksQuery = useTasksFromProject({ projectId: project.id });
  if (tasksQuery.isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  if (!tasksQuery.data || tasksQuery.data.data.length < 1) {
    return (
      <p>
        <FormattedMessage id="general.no-data"></FormattedMessage>
      </p>
    );
  }

  return (
    <ListEntities
      entities={tasksQuery.data.data}
      headerExtractor={(task: ProjectTask) => task.projecttask_no}
      statusExtractor={(task: ProjectTask) => task.projecttaskstatus}
      renderEntity={(task: ProjectTask) => (
        <Card key={task.id} className="mb-2 sh-11 sh-md-8">
          <Card.Body className="pt-0 pb-0 h-100">
            <Row className="g-0 h-100 align-content-center">
              <Col md="3" className="d-flex align-items-center mb-2 mb-md-0">
                <NavLink
                  to={`${DEFAULT_PATHS.PROJECT}/${project.id}/tasks/${task.id}`}
                  className="body-link text-truncate stretched-link"
                >
                  {task.projecttask_no}
                </NavLink>
              </Col>
              <Col
                xs="5"
                md="4"
                className="d-flex align-items-center text-medium justify-content-start justify-content-md-center text-muted"
              >
                {task.projecttaskname}
              </Col>
              <Col
                xs="5"
                md="3"
                className="d-flex align-items-center justify-content-center text-muted"
              >
                {task.projecttasktype}
              </Col>
              <Col
                xs="2"
                md="2"
                className="d-flex align-items-center text-muted text-medium mb-1 mb-md-0 justify-content-end"
              >
                <Badge bg="outline-primary" className="py-1 px-3 text-small lh-1-5">
                  {task.projecttaskstatus}
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    ></ListEntities>
  );
};
