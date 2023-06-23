import { useEffect, useState } from 'react';
import { Button, Card, Col, Dropdown, Row, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { NULLABLE_DATE } from '../../../config/constants.ts';
import { useCreateToTaskComment } from '../../comment/api/createToTask.ts';
import { useCommentsFromTask } from '../../comment/api/getFromTask.ts';
import { CommentList } from '../../comment/components/CommentList.tsx';
import { DocumentsWidget } from '../../document/components/DocumentsWidget.tsx';
import { useManager } from '../../manager/api/getManager.ts';
import { ManagerInfo } from '../../manager/components/ManagerInfo.tsx';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { LoadProjectTask } from '../../module/LoadProjectTask.tsx';
import { getPicklistValues } from '../../module/services/fields.ts';
import useModulesStore from '../../module/stores/module.ts';
import { InfoRow } from '../../project/components/molecules/InfoRow.tsx';
import { useChangeTaskStatus } from '../api/changeTaskStatus.ts';
import { useTask } from '../api/getTask.ts';
import { DropzoneWidget } from '../components/DropzoneWidget.tsx';
import { TagsList } from '../../../components/Elements/DetailPage/TagsList.tsx';

export const ProjectTask = () => {
  const { projectId, taskId } = useParams();
  const taskQuery = useTask({ projectId: projectId ?? '', taskId: taskId ?? '' });
  const [isManagerQueryEnabled, setIsManagerQueryEnabled] = useState(false);
  const { ProjectTask } = useModulesStore();
  const changeStatusMutation = useChangeTaskStatus({});
  const createCommentMutation = useCreateToTaskComment({ taskId: taskId ?? '' });
  const managerQuery = useManager(taskQuery?.data?.assigned_user_id ?? '', isManagerQueryEnabled);
  const commentsQuery = useCommentsFromTask({ taskId: taskId ?? '', projectId: projectId ?? '' });

  useEffect(() => {
    if (taskQuery.data) {
      setIsManagerQueryEnabled(true);
    }
  }, [taskQuery.data]);

  if (taskQuery.isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  const statuses = getPicklistValues(ProjectTask, 'projecttaskstatus');

  if (!taskQuery.data) {
    return (
      <p>
        <FormattedMessage id="general.no-data"></FormattedMessage>
      </p>
    );
  }
  const title = 'Project Task ' + taskQuery.data.id;
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'app/projects', text: 'Projects' },
    { to: 'app/projects/' + projectId, text: projectId ?? '' },
    { to: 'app/projects/' + projectId + '/tasks/' + taskId, text: taskId ?? '' },
  ];

  const onChangeStatus = async (status: string) => {
    await changeStatusMutation.mutateAsync({
      data: {
        projecttaskstatus: status,
      },
      id: taskId ?? '',
      parentId: projectId ?? '',
    });
  };

  return (
    <>
      <Head title={title} />
      <LoadProjectTask></LoadProjectTask>
      <Col>
        {/* Title Start */}
        <div className="page-title-container mb-3">
          <Row>
            <Col className="mb-2">
              <h1 className="mb-2 pb-0 display-4">{title}</h1>
              <div className="text-muted font-heading text-small">
                <FormattedMessage id="tasks.was-updated"></FormattedMessage>{' '}
                {formatToUserReadableDate(taskQuery.data.modifiedtime)}
              </div>
              <BreadcrumbList items={breadcrumbs} />
            </Col>
            <Col xs="12" sm="auto" className="d-flex align-items-center justify-content-end">
              <Dropdown className="ms-1 w-100 w-md-auto" align="end">
                <Dropdown.Toggle className="end w-100 w-md-auto" variant="outline-primary">
                  <FormattedMessage id="tasks.projecttaskstatus" />:{' '}
                  {taskQuery.data.projecttaskstatus}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {statuses.map((item) => (
                    <Dropdown.Item onClick={() => onChangeStatus(item.value)} key={item.value}>
                      <FormattedMessage id="tasks.projecttaskstatus" />:{' '}
                      <FormattedMessage id={'tasks.' + item.value}></FormattedMessage>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col xxl="8" className="mb-5 mb-xxl-0">
              {/* Ticket Details Start */}
              <h2 className="small-title">{taskQuery.data.projecttaskname}</h2>
              <Card className="mb-2">
                <Card.Body>
                  <div className="mb-4 pb-4 border-bottom border-separator-light">
                    <Row className="g-0 sh-sm-5 h-auto">
                      <Col className="">
                        <Row className="h-100 g-2">
                          <Col className="h-sm-100 d-flex flex-column justify-content-sm-center mb-1 mb-sm-0">
                            <div>
                              <FormattedMessage id="tickets.description"></FormattedMessage>:
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <div>
                      <div className="mt-4">{taskQuery.data.description}</div>
                    </div>
                  </div>
                  <DocumentsWidget
                    parentId={taskId}
                    module="tasks"
                    prefix={`/projects/${projectId}/`}
                  ></DocumentsWidget>
                  <DropzoneWidget
                    url={`projects/${projectId}/tasks/${taskId}/documents`}
                    parentId={taskId ?? ''}
                  ></DropzoneWidget>
                </Card.Body>
              </Card>
              <h2 className="small-title">
                <FormattedMessage id="tasks.assigned_user_id" />
              </h2>
              <ManagerInfo manager={managerQuery.data} />
              <h2 className="small-title mt-3">
                <FormattedMessage id="tickets.comments" />
              </h2>
              {commentsQuery.isLoading && <Spinner animation="border" variant="primary" />}
              {commentsQuery.data && (
                <CommentList
                  comments={commentsQuery.data.data}
                  onAddComment={createCommentMutation.mutateAsync}
                  isAddLoading={createCommentMutation.isLoading}
                  parentId={taskId ?? ''}
                  rootId={projectId ?? ''}
                ></CommentList>
              )}
              {/* Ticket Details End */}
            </Col>

            <Col xxl="4">
              {/* Activity Start */}
              <h2 className="small-title">
                <FormattedMessage id="tasks.information"></FormattedMessage>
              </h2>
              <Card className="mb-5">
                <Card.Body>
                  <div className="mb-5">
                    <p className="text-small text-muted mb-2">
                      <FormattedMessage id="tasks.basic-info"></FormattedMessage>
                    </p>
                    <InfoRow
                      header={<FormattedMessage id="tasks.projecttask_no"></FormattedMessage>}
                      value={taskQuery.data.projecttask_no}
                    ></InfoRow>
                    <InfoRow
                      header={<FormattedMessage id="tasks.startdate"></FormattedMessage>}
                      value={formatToUserReadableDate(taskQuery.data.startdate)}
                    ></InfoRow>
                    {taskQuery.data.enddate != NULLABLE_DATE && (
                      <InfoRow
                        header={<FormattedMessage id="tasks.enddate"></FormattedMessage>}
                        value={formatToUserReadableDate(taskQuery.data.enddate)}
                      ></InfoRow>
                    )}
                    <InfoRow
                      header={<FormattedMessage id="tasks.createdtime"></FormattedMessage>}
                      value={formatToUserReadableDate(taskQuery.data.createdtime)}
                    ></InfoRow>
                    {taskQuery.data.projecttasktype && (
                      <InfoRow
                        header={<FormattedMessage id="tasks.projecttasktype"></FormattedMessage>}
                        value={
                          <FormattedMessage
                            id={'tasks.' + taskQuery.data.projecttasktype}
                          ></FormattedMessage>
                        }
                      ></InfoRow>
                    )}
                    <InfoRow
                      header={<FormattedMessage id="tasks.projecttaskprogress"></FormattedMessage>}
                      value={taskQuery.data.projecttaskprogress}
                    ></InfoRow>
                    <InfoRow
                      header={<FormattedMessage id="tasks.projecttaskhours"></FormattedMessage>}
                      value={taskQuery.data.projecttaskhours}
                    ></InfoRow>
                    {taskQuery.data.projecttaskpriority && (
                      <InfoRow
                        header={
                          <FormattedMessage id="tasks.projecttaskpriority"></FormattedMessage>
                        }
                        value={
                          <FormattedMessage
                            id={'tasks.' + taskQuery.data.projecttaskpriority}
                          ></FormattedMessage>
                        }
                      ></InfoRow>
                    )}
                  </div>
                </Card.Body>
              </Card>
              {/* Activity End */}

              {/* Rate the Conversation Start */}
              <h2 className="small-title">
                <FormattedMessage id="tasks.tags"></FormattedMessage>
              </h2>
              <Card>
                <Card.Body className="mb-n3">
                  <TagsList tags={taskQuery.data.tags}></TagsList>
                </Card.Body>
              </Card>
              {/* Rate the Conversation End */}
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};
