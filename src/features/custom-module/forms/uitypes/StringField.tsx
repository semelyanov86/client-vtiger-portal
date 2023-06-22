import { Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { FormField } from './index.ts';

interface StringFieldProps extends FormField {
  value?: string;
}

export const StringField = ({
  module,
  field,
  register,
  errors,
  onChange,
  value = '',
}: StringFieldProps) => {
  return (
    <div className="mb-3">
      <Form.Label>
        <FormattedMessage id={module.name + '.' + field} />
      </Form.Label>
      <Form.Control
        type="text"
        {...register(field)}
        defaultValue={value}
        onChange={(event) => onChange(field, event.target.value)}
      />
      {errors[field] && <div className="d-block invalid-tooltip">{errors[field]?.message}</div>}
    </div>
  );
};
