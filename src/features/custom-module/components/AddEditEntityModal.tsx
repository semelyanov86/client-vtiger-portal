import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { Spinner } from '../../../components/Elements';
import { CUSTOM_MODULES } from '../../../config';
import { RequestQuery } from '../../misc/types/query.ts';
import useModulesStore from '../../module/stores/module.ts';
import { useCreateEntity } from '../api/createEntity.ts';
import { useEntity } from '../api/getEntity.ts';
import { useUpdateEntity } from '../api/updateEntity.ts';
import { GenerateFieldType } from '../forms/uitypes/GenerateFieldType.tsx';

interface AddEditEntityModalProps {
  isModalOpen: boolean;
  onHide: (hide: boolean) => void;
  query: RequestQuery;
  moduleName: string;
  id: string;
}

const schema = z.record(
  z.string(),
  z.union([z.string(), z.boolean(), z.number(), z.instanceof(Date)])
);

type FormData = z.infer<typeof schema>;

export const AddEditEntityModal = ({
  isModalOpen,
  onHide,
  query,
  moduleName,
  id,
}: AddEditEntityModalProps) => {
  const { customModules } = useModulesStore();
  const createEntityMutation = useCreateEntity({ query: query, module: moduleName });
  const updateEntityMutation = useUpdateEntity({ query: query, module: moduleName, id });
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setValue,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const entityQuery = useEntity({ entityId: id, module: moduleName, enabled: id != '' });

  useEffect(() => {
    if (entityQuery.data) {
      Object.keys(entityQuery.data).forEach((key) => {
        let value = entityQuery.data[key];
        if (typeof value == 'object') {
          value = String(value);
        }
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
        if (typeof value == 'string' && regex.test(value)) {
          const date = new Date(value);
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based
          const day = ('0' + date.getDate()).slice(-2);

          value = `${year}-${month}-${day}`;
        }

        if (CUSTOM_MODULES[moduleName].edit_fields.includes(key)) {
          setValue(key, value);
        }
      });
    }
  }, [entityQuery.data]);

  if (!customModules[moduleName]) {
    return null;
  }
  const onSubmit = async (data: FieldValues) => {
    if (id) {
      await updateEntityMutation.mutateAsync({
        data: data,
        module: moduleName,
        entityId: id,
      });
    } else {
      await createEntityMutation.mutateAsync({
        data: data,
        name: moduleName,
      });
    }
    onHide(false);
  };

  const onChangeUitypeField = (field: string, value: boolean | string | number | Date) => {
    setValue(field, value);
  };

  const moduleConfig = CUSTOM_MODULES[moduleName];
  if (!moduleConfig) {
    return null;
  }
  if (entityQuery.isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <Modal className="modal-right" show={isModalOpen} onHide={() => onHide(false)}>
      <Modal.Header>
        <Modal.Title>
          <FormattedMessage id="general.add-new"></FormattedMessage>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {moduleConfig.edit_fields.map((field) => (
            <GenerateFieldType
              key={field}
              value={entityQuery.data ? entityQuery.data[field] : ''}
              field={field}
              register={register}
              errors={errors}
              module={customModules[moduleName]}
              onChange={onChangeUitypeField}
            ></GenerateFieldType>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={() => onHide(false)}>
          <FormattedMessage id="general.cancel"></FormattedMessage>
        </Button>
        <Button variant="primary" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? (
            <FormattedMessage id="general.loading"></FormattedMessage>
          ) : (
            <FormattedMessage id="general.save"></FormattedMessage>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
