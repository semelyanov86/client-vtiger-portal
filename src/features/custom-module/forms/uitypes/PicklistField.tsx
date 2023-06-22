import { Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { getPicklistValues } from '../../../module/services/fields.ts';

import { FormField } from './index.ts';

interface PicklistFieldProps extends FormField {
  value?: string;
}

export const PicklistField = ({
  register,
  module,
  field,
  value,
  onChange,
  errors,
}: PicklistFieldProps) => {
  const priorities = getPicklistValues(module, field);
  return (
    <div className="mb-3">
      <Form.Label>
        <FormattedMessage id={module.name + '.' + field} />
      </Form.Label>
      <Form.Select
        {...register(field)}
        defaultValue={value}
        onChange={(event) => onChange(field, event.target.value)}
      >
        <option></option>
        {priorities.map((item) => (
          <option key={item.value} value={item.value}>
            <FormattedMessage id={module.name + '.' + item.value}></FormattedMessage>
          </option>
        ))}
      </Form.Select>
      {errors[field] && <div className="d-block invalid-tooltip">{errors[field]?.message}</div>}
    </div>
  );
};
