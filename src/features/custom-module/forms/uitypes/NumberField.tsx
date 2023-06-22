import { Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { FormField } from './index.ts';

interface NumberFieldProps extends FormField {
  value?: number;
}

export const NumberField = ({
  module,
  field,
  register,
  errors,
  onChange,
  value = 0,
}: NumberFieldProps) => {
  return (
    <div className="mb-3">
      <Form.Label>
        <FormattedMessage id={module.name + '.' + field} />
      </Form.Label>
      <Form.Control
        type="number"
        {...register(field)}
        defaultValue={value}
        onChange={(event) => onChange(field, Number(event.target.value) ?? 0)}
      />
      {errors[field] && <div className="d-block invalid-tooltip">{errors[field]?.message}</div>}
    </div>
  );
};
