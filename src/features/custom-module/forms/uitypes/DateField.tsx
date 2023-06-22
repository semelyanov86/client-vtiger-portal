import { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { FormattedMessage } from 'react-intl';
import 'react-datepicker/dist/react-datepicker.css';

import { FormField } from './index.ts';

interface DateFieldProps extends FormField {
  value?: string | null;
}

export const DateField = ({
  module,
  field,
  register,
  errors,
  onChange,
  value = null,
}: DateFieldProps) => {
  const [startDate, setStartDate] = useState<Date | null>(value ? new Date(value) : null);

  return (
    <div className="mb-3">
      <Form.Label>
        <FormattedMessage id={module.name + '.' + field} />
      </Form.Label>
      <DatePicker
        className="form-control"
        dateFormat="yyyy.MM.dd"
        {...register(field)}
        selected={startDate}
        onChange={(date) => {
          onChange(field, formatDate(date ?? new Date()));
          setStartDate(date);
        }}
      />
      {errors[field] && <div className="d-block invalid-tooltip">{errors[field]?.message}</div>}
    </div>
  );
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}
