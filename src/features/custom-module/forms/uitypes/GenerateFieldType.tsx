import { getFieldByName } from '../../../module/services/fields.ts';

import { CheckboxField } from './CheckboxField.tsx';
import { DateField } from './DateField.tsx';
import { FormField } from './index.ts';
import { NumberField } from './NumberField.tsx';
import { PicklistField } from './PicklistField.tsx';
import { StringField } from './StringField.tsx';
import { TextareaField } from './TextareaField.tsx';

interface GenerateFieldTypeProps extends FormField {
  value: string;
}

export const GenerateFieldType = ({
  field,
  module,
  value,
  register,
  errors,
  onChange,
}: GenerateFieldTypeProps) => {
  const fieldModel = getFieldByName(module, field);
  if (!fieldModel) {
    return null;
  }

  if (fieldModel.type.name == 'date') {
    return (
      <DateField
        field={field}
        register={register}
        errors={errors}
        module={module}
        value={value}
        onChange={onChange}
      ></DateField>
    );
  } else if (fieldModel.type.name == 'picklist') {
    return (
      <PicklistField
        field={field}
        register={register}
        errors={errors}
        module={module}
        value={value}
        onChange={onChange}
      ></PicklistField>
    );
  } else if (
    fieldModel.type.name == 'currency' ||
    fieldModel.type.name == 'double' ||
    fieldModel.type.name == 'integer'
  ) {
    return (
      <NumberField
        field={field}
        register={register}
        errors={errors}
        module={module}
        value={Number(value)}
        onChange={onChange}
      ></NumberField>
    );
  } else if (fieldModel.type.name == 'text') {
    return (
      <TextareaField
        field={field}
        register={register}
        errors={errors}
        module={module}
        value={value}
        onChange={onChange}
      ></TextareaField>
    );
  } else if (fieldModel.type.name == 'boolean') {
    return (
      <CheckboxField
        field={field}
        register={register}
        errors={errors}
        module={module}
        value={Boolean(value)}
        onChange={onChange}
      ></CheckboxField>
    );
  }
  return (
    <StringField
      field={field}
      register={register}
      errors={errors}
      module={module}
      value={value}
      onChange={onChange}
    ></StringField>
  );
};
