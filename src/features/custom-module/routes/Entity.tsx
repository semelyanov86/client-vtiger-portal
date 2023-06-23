import { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';

import { DetailPageTitle, Spinner } from '../../../components/Elements';
import { BlockHeader } from '../../../components/Elements/DetailPage/BlockHeader.tsx';
import { TagsList } from '../../../components/Elements/DetailPage/TagsList.tsx';
import { Head } from '../../../components/Head';
import { CUSTOM_MODULES } from '../../../config';
import { GENERAL_FIELDS } from '../../../config/constants.ts';
import { useCreateToCustomModuleComment } from '../../comment/api/createToCustomModule.ts';
import { useCommentsFromCustomModule } from '../../comment/api/getFromCustomModule.ts';
import { CommentList } from '../../comment/components/CommentList.tsx';
import { DocumentsWidget } from '../../document/components/DocumentsWidget.tsx';
import { useManager } from '../../manager/api/getManager.ts';
import { ManagerInfo } from '../../manager/components/ManagerInfo.tsx';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { LoadCustomModule } from '../../module/LoadCustomModule.tsx';
import useModulesStore from '../../module/stores/module.ts';
import { useEntity } from '../api/getEntity.ts';
import { FieldHeading } from '../components/FieldHeading.tsx';
import { DisplayDetailCellValue } from '../uitypes/DisplayDetailCellValue.tsx';

export const Entity = () => {
  const { moduleName } = useParams();
  const { id } = useParams();
  const entityQuery = useEntity({ entityId: id ?? '', module: moduleName ?? '', enabled: true });
  const [isManagerQueryEnabled, setIsManagerQueryEnabled] = useState(false);
  useEffect(() => {
    if (entityQuery.data) {
      setIsManagerQueryEnabled(true);
    }
  }, [entityQuery.data]);

  const { customModules } = useModulesStore();
  const moduleConfig = CUSTOM_MODULES[moduleName ?? ''];
  const managerQuery = useManager(
    entityQuery.data ? String(entityQuery.data.assigned_user_id) : '',
    isManagerQueryEnabled
  );
  const commentsQuery = useCommentsFromCustomModule({
    entityId: id ?? '',
    module: moduleName ?? '',
    enabled: moduleConfig.related.includes('ModComments'),
  });
  const createCommentMutation = useCreateToCustomModuleComment({
    entityId: id ?? '',
    module: moduleName ?? '',
  });

  if (entityQuery.isLoading) {
    return <Spinner></Spinner>;
  }

  if (!entityQuery.data) {
    return <FormattedMessage id="general.no-data"></FormattedMessage>;
  }

  if (!moduleName) {
    return <FormattedMessage id="general.no-data"></FormattedMessage>;
  }

  if (!moduleConfig) {
    return <FormattedMessage id="general.not-supported"></FormattedMessage>;
  }

  if (!customModules[moduleName]) {
    return <FormattedMessage id="general.not-supported"></FormattedMessage>;
  }

  return (
    <>
      <Head title={String(entityQuery.data.label) ?? '--'} />
      <LoadCustomModule moduleName={moduleName}></LoadCustomModule>
      <DetailPageTitle
        title={String(entityQuery.data.label) ?? '--'}
        modified={String(entityQuery.data.modifiedtime) ?? '--'}
        target={{ to: 'app/' + moduleName + '/' + id, text: id ?? '' }}
        parent={{ to: 'app/' + moduleName + '/', text: moduleName }}
      >
        <></>
      </DetailPageTitle>
      <Row>
        <Col md={6}>
          <section className="scroll-section" id="additionalDetails">
            <BlockHeader>
              <FormattedMessage id="entities.additional-details"></FormattedMessage>
            </BlockHeader>
            <Card body className="mb-5">
              {customModules[moduleName].fields
                .filter((field) => !GENERAL_FIELDS.includes(field.name))
                .map((field) => (
                  <div key={field.name} className="mb-3">
                    <FieldHeading>
                      <FormattedMessage id={moduleName + '.' + field.name}></FormattedMessage>
                    </FieldHeading>
                    <DisplayDetailCellValue
                      value={entityQuery.data[field.name]}
                      field={field.name}
                      module={moduleName}
                    />
                  </div>
                ))}
            </Card>
          </section>
        </Col>
        <Col md={6}>
          <section className="scroll-section" id="mainDetails">
            <BlockHeader>
              <FormattedMessage id="entities.main-details"></FormattedMessage>
            </BlockHeader>
            <Card body className="mb-5">
              <div className="mb-3">
                <FieldHeading>
                  <FormattedMessage id="entities.id"></FormattedMessage>
                </FieldHeading>
                <p>{String(entityQuery.data.id)}</p>
              </div>
              <div className="mb-3">
                <FieldHeading>
                  <FormattedMessage id="entities.createdtime"></FormattedMessage>
                </FieldHeading>
                <p>{formatToUserReadableDate(String(entityQuery.data.createdtime))}</p>
              </div>
              <div className="mb-3">
                <FieldHeading>
                  <FormattedMessage id="entities.starred"></FormattedMessage>
                </FieldHeading>
                <Form.Check disabled checked={Boolean(entityQuery.data.starred)} />
              </div>
              <div className="mb-3">
                <FieldHeading>
                  <FormattedMessage id="entities.tags"></FormattedMessage>
                </FieldHeading>
                <TagsList tags={entityQuery.data.tags as string[]}></TagsList>
              </div>
              <div className="mb-3">
                <FieldHeading>
                  <FormattedMessage id="entities.description"></FormattedMessage>
                </FieldHeading>
                <p>{String(entityQuery.data.description)}</p>
              </div>
              <div>
                {moduleConfig.related.includes('Documents') && (
                  <DocumentsWidget
                    prefix="/custom-modules/"
                    parentId={id}
                    module={moduleName}
                  ></DocumentsWidget>
                )}
              </div>
            </Card>
            <BlockHeader>
              <FormattedMessage id="entities.manager" />
            </BlockHeader>
            <ManagerInfo manager={managerQuery.data} />
          </section>
        </Col>
      </Row>
      {moduleConfig.related.includes('ModComments') && (
        <Row className="g-2 mb-5">
          <Col>
            <BlockHeader>
              <FormattedMessage id="entities.comments" />
            </BlockHeader>
            {commentsQuery.isLoading && <Spinner />}
            {commentsQuery.data && (
              <CommentList
                comments={commentsQuery.data.data}
                onAddComment={createCommentMutation.mutateAsync}
                isAddLoading={createCommentMutation.isLoading}
                parentId={id ?? ''}
              ></CommentList>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};
