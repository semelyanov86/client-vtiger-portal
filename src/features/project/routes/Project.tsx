import { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { ChevronLeft } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

import { Spinner as Spinner2 } from '../../../components/Elements';
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
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink
              className="muted-link pb-1 d-inline-block hidden breadcrumb-back"
              to="/app/projects"
            >
              <ChevronLeft size={13}></ChevronLeft>
              <span className="align-middle text-small ms-1">
                <FormattedMessage id="Projects"></FormattedMessage>
              </span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col
            xs="12"
            sm="auto"
            className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3"
          >
            <StatusSwitcher statuses={statuses} project={projectQuery.data}></StatusSwitcher>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row>
        <Col xl="8" xxl="9">
          {/* Status Start */}
          <h2 className="small-title">
            <FormattedMessage id="project.detail"></FormattedMessage>
          </h2>
          <Row className="g-2 mb-5">
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Tags"
                header={<FormattedMessage id="project.id"></FormattedMessage>}
                value={projectQuery.data.id}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="ArrowClockwise"
                header={<FormattedMessage id="project.progress"></FormattedMessage>}
                value={projectQuery.data.progress}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Hammer"
                header={<FormattedMessage id="project.total_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.total_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Coin"
                header={<FormattedMessage id="project.total_hours"></FormattedMessage>}
                value={projectQuery.data.statistics.total_hours ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Alarm"
                header={<FormattedMessage id="project.open_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.open_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="XOctagon"
                header={<FormattedMessage id="project.closed_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.closed_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="BarChartFill"
                header={<FormattedMessage id="project.in_progress_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.in_progress_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Hourglass"
                header={<FormattedMessage id="project.deferred_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.deferred_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="XCircle"
                header={<FormattedMessage id="project.cancelled_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.cancelled_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="BrightnessAltLow"
                header={<FormattedMessage id="project.low_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.low_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="BrightnessLow"
                header={<FormattedMessage id="project.normal_tasks"></FormattedMessage>}
                value={projectQuery.data.statistics.normal_tasks ?? 0}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="BrightnessHigh"
                header={<FormattedMessage id="project.high_tasks"></FormattedMessage>}
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
            <FormattedMessage id="project.comments"></FormattedMessage>
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
            <FormattedMessage id="project.info"></FormattedMessage>
          </h2>
          <Card className="mb-5">
            <Card.Body className="mb-n5">
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="project.basic-info"></FormattedMessage>
                </p>
                <InfoRow
                  header={<FormattedMessage id="project.project_no"></FormattedMessage>}
                  value={projectQuery.data.project_no}
                ></InfoRow>
                <InfoRow
                  header={<FormattedMessage id="project.startdate"></FormattedMessage>}
                  value={formatToUserReadableDate(projectQuery.data.startdate)}
                ></InfoRow>
                {projectQuery.data.targetenddate != NULLABLE_DATE && (
                  <InfoRow
                    header={<FormattedMessage id="project.targetenddate"></FormattedMessage>}
                    value={formatToUserReadableDate(projectQuery.data.targetenddate)}
                  ></InfoRow>
                )}
                {projectQuery.data.actualenddate != NULLABLE_DATE && (
                  <InfoRow
                    header={<FormattedMessage id="project.actualenddate"></FormattedMessage>}
                    value={formatToUserReadableDate(projectQuery.data.actualenddate)}
                  ></InfoRow>
                )}
                <InfoRow
                  header={<FormattedMessage id="project.createdtime"></FormattedMessage>}
                  value={formatToUserReadableDate(projectQuery.data.created_time)}
                ></InfoRow>
                {projectQuery.data.projecttype && (
                  <InfoRow
                    header={<FormattedMessage id="project.projecttype"></FormattedMessage>}
                    value={
                      <FormattedMessage
                        id={'project.' + projectQuery.data.projecttype}
                      ></FormattedMessage>
                    }
                  ></InfoRow>
                )}
                <InfoRow
                  header={<FormattedMessage id="project.targetbudget"></FormattedMessage>}
                  value={projectQuery.data.targetbudget}
                ></InfoRow>
                {projectQuery.data.projecturl && (
                  <InfoRow
                    header={<FormattedMessage id="project.projecturl"></FormattedMessage>}
                    value={
                      <a href={projectQuery.data.projecturl} target="_blank" rel="noreferrer">
                        {projectQuery.data.projecturl}
                      </a>
                    }
                  ></InfoRow>
                )}
                {projectQuery.data.projectpriority && (
                  <InfoRow
                    header={<FormattedMessage id="project.projectpriority"></FormattedMessage>}
                    value={
                      <FormattedMessage
                        id={'project.' + projectQuery.data.projectpriority}
                      ></FormattedMessage>
                    }
                  ></InfoRow>
                )}
              </div>
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="project.manager"></FormattedMessage>
                </p>
                <ManagerInfo manager={managerQuery.data}></ManagerInfo>
              </div>
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="project.description"></FormattedMessage>
                </p>
                <Row className="g-0 mb-2">
                  <Col className="text-alternate">{projectQuery.data.description}</Col>
                </Row>
              </div>
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="project.documents"></FormattedMessage>
                </p>
                <Row className="g-0 mb-2">
                  <DocumentsWidget parentId={projectId} module="projects"></DocumentsWidget>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
