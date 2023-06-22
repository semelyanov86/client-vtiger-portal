import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

import { Module } from '../../../module/types';

export interface FormField {
  field: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<Record<string, string>>;
  module: Module;
  onChange: (field: string, value: boolean | string | number | Date) => void;
}
