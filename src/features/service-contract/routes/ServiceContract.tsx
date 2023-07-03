import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';

import { DetailPageTitle, Spinner as Spinner2 } from '../../../components/Elements';
import { Head } from '../../../components/Head';
import { DEFAULT_PATHS } from '../../../config';
import { clearRouteDelimeter } from '../../../utils/format.ts';
import { useManager } from '../../manager/api/getManager.ts';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { LoadServiceContract } from '../../module/LoadServiceContract.tsx';
import { getPicklistValues } from '../../module/services/fields.ts';
import useModulesStore from '../../module/stores/module.ts';
import { ManagerInfo } from '../../project/components/organisms/ManagerInfo.tsx';
import { ProjectStatisticsCard } from '../../project/components/organisms/ProjectStatisticsCard.tsx';
import { useServiceContract } from '../api/getServiceContract.ts';
import { StatusSwitcher } from '../organisms/StatusSwitcher.tsx';

export const ServiceContract = () => {
  const { contractId } = useParams();
  const contractQuery = useServiceContract({ contractId: contractId ?? '' });
  const [isManagerQueryEnabled, setIsManagerQueryEnabled] = useState(false);

  useEffect(() => {
    if (contractQuery.data) {
      setIsManagerQueryEnabled(true);
    }
  }, [contractQuery.data]);

  const { ServiceContract } = useModulesStore();
  const managerQuery = useManager(
    contractQuery.data?.assigned_user_id ?? '',
    isManagerQueryEnabled
  );

  if (!ServiceContract) {
    return null;
  }

  if (contractQuery.isLoading) {
    return <Spinner2></Spinner2>;
  }
  if (!contractQuery.data) {
    return null;
  }

  if (!contractId) {
    return null;
  }

  const statuses = getPicklistValues(ServiceContract, 'contract_status');

  const title = contractQuery.data.subject;

  return (
    <>
      <Head title={title} />
      <LoadServiceContract></LoadServiceContract>
      <div className="page-title-container">
        <DetailPageTitle
          title={title}
          modified={contractQuery.data.modifiedtime}
          target={{
            to: clearRouteDelimeter(DEFAULT_PATHS.SERVICE_CONTRACT) + '/' + contractId,
            text: contractId,
          }}
          parent={{
            to: clearRouteDelimeter(DEFAULT_PATHS.SERVICE_CONTRACT),
            text: 'ServiceContracts',
          }}
        >
          <StatusSwitcher statuses={statuses} contract={contractQuery.data}></StatusSwitcher>
        </DetailPageTitle>
      </div>

      <Row>
        <Col xl="8" xxl="9">
          {/* Status Start */}
          <h2 className="small-title">
            <FormattedMessage id="service-contracts.detail"></FormattedMessage>
          </h2>
          <Row className="g-2 mb-5">
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Tags"
                header={<FormattedMessage id="service-contracts.id"></FormattedMessage>}
                value={contractQuery.data.id}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="ArrowClockwise"
                header={<FormattedMessage id="service-contracts.contract_type"></FormattedMessage>}
                value={contractQuery.data.contract_type}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Hammer"
                header={<FormattedMessage id="service-contracts.tracking_unit"></FormattedMessage>}
                value={contractQuery.data.tracking_unit}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Coin"
                header={<FormattedMessage id="service-contracts.start_date"></FormattedMessage>}
                value={formatToUserReadableDate(contractQuery.data.start_date)}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Alarm"
                header={<FormattedMessage id="service-contracts.end_date"></FormattedMessage>}
                value={formatToUserReadableDate(contractQuery.data.end_date)}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="XOctagon"
                header={<FormattedMessage id="service-contracts.total_units"></FormattedMessage>}
                value={contractQuery.data.total_units}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="BarChartFill"
                header={<FormattedMessage id="service-contracts.used_units"></FormattedMessage>}
                value={contractQuery.data.used_units}
              ></ProjectStatisticsCard>
            </Col>
            <Col sm="4" md="3">
              <ProjectStatisticsCard
                icon="Hourglass"
                header={
                  <FormattedMessage id="service-contracts.contract_priority"></FormattedMessage>
                }
                value={contractQuery.data.contract_priority}
              ></ProjectStatisticsCard>
            </Col>
          </Row>
          {/* Status End */}
        </Col>

        <Col xl="4" xxl="3">
          <h2 className="small-title">
            <FormattedMessage id="service-contracts.info"></FormattedMessage>
          </h2>
          <Card className="mb-5">
            <Card.Body className="mb-n5">
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="projects.manager"></FormattedMessage>
                </p>
                <ManagerInfo manager={managerQuery.data}></ManagerInfo>
              </div>
              {/*<div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="projects.documents"></FormattedMessage>
                </p>
                <Row className="g-0 mb-2">
                  <DocumentsWidget
                    parentId={contractId}
                    module="service-contracts"
                  ></DocumentsWidget>
                  <DropzoneWidget
                    url={`service-contracts/${contractId}/documents`}
                    parentId={contractId}
                  ></DropzoneWidget>
                </Row>
              </div>*/}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
