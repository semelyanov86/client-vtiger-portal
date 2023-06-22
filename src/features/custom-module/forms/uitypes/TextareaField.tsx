import { Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { FormField } from './index.ts';

interface TextareaFieldProps extends FormField {
  value?: string;
}

export const TextareaField = ({
  module,
  field,
  register,
  errors,
  onChange,
  value = '',
}: TextareaFieldProps) => {
  return (
    <div className="mb-3">
      <Form.Label>
        <FormattedMessage id={module.name + '.' + field} />
      </Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        {...register(field)}
        defaultValue={value}
        onChange={(event) => onChange(field, event.target.value)}
      />
      {errors[field] && <div className="d-block invalid-tooltip">{errors[field]?.message}</div>}
    </div>
  );
};
