import { Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { FormField } from './index.ts';

interface CheckboxFieldProps extends FormField {
  value?: boolean;
}

export const CheckboxField = ({
  module,
  field,
  register,
  errors,
  value,
  onChange,
}: CheckboxFieldProps) => {
  return (
    <div className="mb-3">
      <Form.Label>
        <FormattedMessage id={module.name + '.' + field} />
      </Form.Label>
      <Form.Check
        type="checkbox"
        {...register(field)}
        defaultChecked={value}
        onChange={(event) => onChange(field, event.target.checked)}
      />
      {errors[field] && <div className="d-block invalid-tooltip">{errors[field]?.message}</div>}
    </div>
  );
};
