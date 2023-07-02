import { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';

import { Spinner as Spinner2, DetailPageTitle } from '../../../components/Elements';
import { Head } from '../../../components/Head';
import { NULLABLE_DATE } from '../../../config/constants.ts';
import { useCreateToProjectComment } from '../../comment/api/createToProject.ts';
import { useCommentsFromProject } from '../../comment/api/getFromProject.ts';
import { CommentList } from '../../comment/components/CommentList.tsx';
import { DocumentsWidget } from '../../document/components/DocumentsWidget.tsx';
import { useManager } from '../../manager/api/getManager.ts';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { LoadProject } from '../../module/LoadProject.tsx';
import { getPicklistValues } from '../../module/services/fields.ts';
import useModulesStore from '../../module/stores/module.ts';
import { DropzoneWidget } from '../../task/components/DropzoneWidget.tsx';
import { ProjectTasks } from '../../task/components/ProjectTasks.tsx';
import { useProject } from '../api/getProject.ts';
import { InfoRow } from '../components/molecules/InfoRow.tsx';
import { ManagerInfo } from '../components/organisms/ManagerInfo.tsx';
import { ProjectStatisticsCard } from '../components/organisms/ProjectStatisticsCard.tsx';
import { StatusSwitcher } from '../components/organisms/StatusSwitcher.tsx';

export const Project = () => {
  const { projectId } = useParams();
  const projectQuery = useProject({ projectId: projectId ?? '' });
  const [isManagerQueryEnabled, setIsManagerQueryEnabled] = useState(false);
  const commentsQuery = useCommentsFromProject({ projectId: projectId ?? '' });
  const createCommentMutation = useCreateToProjectComment({ projectId: projectId ?? '' });

  useEffect(() => {
    if (projectQuery.data) {
      setIsManagerQueryEnabled(true);
    }
  }, [projectQuery.data]);

  const { Project } = useModulesStore();
  const managerQuery = useManager(projectQuery.data?.assigned_user_id ?? '', isManagerQueryEnabled);

  if (!Project) {
    return null;
  }

  if (projectQuery.isLoading) {
    return <Spinner2></Spinner2>;
  }
  if (!projectQuery.data) {
    return null;
  }

  const statuses = getPicklistValues(Project, 'projectstatus');

  const title = projectQuery.data.projectname;

  return (
    <>
      <Head title={title} />
      <LoadProject></LoadProject>
      <div className="page-title-container">
        <DetailPageTitle
          title={title}
          modified={projectQuery.data.modified_time}
          target={{ to: 'app/projects/' + projectId, text: projectId ?? '' }}
          parent={{ to: 'app/projects', text: 'Projects' }}
        >
          <StatusSwitcher statuses={statuses} project={projectQuery.data}></StatusSwitcher>
        </DetailPageTitle>
      </div>

      <Row>
        <Col xl="8" xxl="9">
          {/* Status Start */}
          <h2 className="small-title">
            <FormattedMessage id="projects.detail"></FormattedMessage>
          </h2>
          <Row className="g-2 mb-5">
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Tags"
                header={<FormattedMessage id="projects.id"></FormattedMessage>}
                value={projectQuery.data.id}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="ArrowClockwise"
                header={<FormattedMessage id="projects.progress"></FormattedMessage>}
                value={projectQuery.data.progress}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Hammer"
                header={<FormattedMessage id="projects.total_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.total_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Coin"
                header={<FormattedMessage id="projects.total_hours"></FormattedMessage>}
                value={projectQuery.data.statistics.total_hours ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Alarm"
                header={<FormattedMessage id="projects.open_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.open_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="XOctagon"
                header={<FormattedMessage id="projects.closed_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.closed_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="BarChartFill"
                header={<FormattedMessage id="projects.in_progress_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.in_progress_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Hourglass"
                header={<FormattedMessage id="projects.deferred_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.deferred_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="XCircle"
                header={<FormattedMessage id="projects.cancelled_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.cancelled_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="BrightnessAltLow"
                header={<FormattedMessage id="projects.low_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.low_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="BrightnessLow"
                header={<FormattedMessage id="projects.normal_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.normal_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="BrightnessHigh"
                header={<FormattedMessage id="projects.high_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.high_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
          </Row>
          {/* Status End */}

          {/* Cart Start */}
          <h2 className="small-title">
            <FormattedMessage id="tasks.tasks"></FormattedMessage>
          </h2>
          {projectQuery.data && (
            <div className="scroll-out">
              <ProjectTasks project={projectQuery.data}></ProjectTasks>
            </div>
          )}
          {/* Cart End */}

          {/* Activity Start */}
          <h2 className="small-title mt-5">
            <FormattedMessage id="projects.comments"></FormattedMessage>
          </h2>
          {commentsQuery.isLoading && <Spinner animation="border" variant="primary" />}
          {commentsQuery.data && (
            <CommentList
              comments={commentsQuery.data.data}
              onAddComment={createCommentMutation.mutateAsync}
              isAddLoading={createCommentMutation.isLoading}
              parentId={projectId ?? ''}
            ></CommentList>
          )}
          {/* Activity End */}
        </Col>

        <Col xl="4" xxl="3">
          <h2 className="small-title">
            <FormattedMessage id="projects.info"></FormattedMessage>
          </h2>
          <Card className="mb-5">
            <Card.Body className="mb-n5">
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="projects.basic-info"></FormattedMessage>
                </p>
                <InfoRow
                  header={<FormattedMessage id="projects.project_no"></FormattedMessage>}
                  value={projectQuery.data.project_no}
                ></InfoRow>
                <InfoRow
                  header={<FormattedMessage id="projects.startdate"></FormattedMessage>}
                  value={formatToUserReadableDate(projectQuery.data.startdate)}
                ></InfoRow>
                {projectQuery.data.targetenddate != NULLABLE_DATE && (
                  <InfoRow
                    header={<FormattedMessage id="projects.targetenddate"></FormattedMessage>}
                    value={formatToUserReadableDate(projectQuery.data.targetenddate)}
                  ></InfoRow>
                )}
                {projectQuery.data.actualenddate != NULLABLE_DATE && (
                  <InfoRow
                    header={<FormattedMessage id="projects.actualenddate"></FormattedMessage>}
                    value={formatToUserReadableDate(projectQuery.data.actualenddate)}
                  ></InfoRow>
                )}
                <InfoRow
                  header={<FormattedMessage id="projects.createdtime"></FormattedMessage>}
                  value={formatToUserReadableDate(projectQuery.data.created_time)}
                ></InfoRow>
                {projectQuery.data.projecttype && (
                  <InfoRow
                    header={<FormattedMessage id="projects.projecttype"></FormattedMessage>}
                    value={
                      <FormattedMessage
                        id={'projects.' + projectQuery.data.projecttype}
                      ></FormattedMessage>
                    }
                  ></InfoRow>
                )}
                <InfoRow
                  header={<FormattedMessage id="projects.targetbudget"></FormattedMessage>}
                  value={projectQuery.data.targetbudget}
                ></InfoRow>
                {projectQuery.data.projecturl && (
                  <InfoRow
                    header={<FormattedMessage id="projects.projecturl"></FormattedMessage>}
                    value={
                      <a href={projectQuery.data.projecturl} target="_blank" rel="noreferrer">
                        {projectQuery.data.projecturl}
                      </a>
                    }
                  ></InfoRow>
                )}
                {projectQuery.data.projectpriority && (
                  <InfoRow
                    header={<FormattedMessage id="projects.projectpriority"></FormattedMessage>}
                    value={
                      <FormattedMessage
                        id={'projects.' + projectQuery.data.projectpriority}
                      ></FormattedMessage>
                    }
                  ></InfoRow>
                )}
              </div>
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="projects.manager"></FormattedMessage>
                </p>
                <ManagerInfo manager={managerQuery.data}></ManagerInfo>
              </div>
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="projects.description"></FormattedMessage>
                </p>
                <Row className="g-0 mb-2">
                  <Col className="text-alternate">{projectQuery.data.description}</Col>
                </Row>
              </div>
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="projects.documents"></FormattedMessage>
                </p>
                <Row className="g-0 mb-2">
                  <DocumentsWidget parentId={projectId} module="projects"></DocumentsWidget>
                  <DropzoneWidget
                    url={`projects/${projectId}/documents`}
                    parentId={projectId ?? ''}
                  ></DropzoneWidget>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
