import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Modal } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { CUSTOM_MODULES } from '../../../config';
import { RequestQuery } from '../../misc/types/query.ts';
import useModulesStore from '../../module/stores/module.ts';
import { useCreateEntity } from '../api/createEntity.ts';
import { GenerateFieldType } from '../forms/uitypes/GenerateFieldType.tsx';
import { RelatedField } from '../types';

interface AddEntityModalProps {
  isModalOpen: boolean;
  onHide: (hide: boolean) => void;
  query: RequestQuery;
  moduleName: string;
}

const schema = z.record(
  z.string(),
  z.union([z.string(), z.boolean(), z.number(), z.instanceof(Date)])
);

type FormData = z.infer<typeof schema>;

export const AddEntityModal = ({ isModalOpen, onHide, query, moduleName }: AddEntityModalProps) => {
  const { customModules } = useModulesStore();
  const createEntityMutation = useCreateEntity({ query: query, module: moduleName });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  if (!customModules[moduleName]) {
    return null;
  }
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      await createEntityMutation.mutateAsync({
        data: data,
        name: moduleName,
      });
      onHide(false);
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        NotifyError(e.response.data.message);
      } else {
        NotifyError(e.message);
      }
    }
  };

  const onChangeUitypeField = (field: string, value: boolean | string | number | Date) => {
    setValue(field, value);
  };

  const moduleConfig = CUSTOM_MODULES[moduleName];
  if (!moduleConfig) {
    return null;
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
              value=""
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
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          <FormattedMessage id="general.save"></FormattedMessage>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
