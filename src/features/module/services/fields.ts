import { Module } from '../types';

export function getPicklistValues(
  module: Module,
  fieldName: string
): Array<{ label: string; value: string }> {
  if (!module.fields) {
    return [];
  }
  const field = module.fields.find((field) => field.name === fieldName);

  if (field && field.type.name === 'picklist') {
    return (
      field.type as {
        name: 'picklist';
        defaultValue: string;
        picklistValues: Array<{ label: string; value: string }>;
      }
    ).picklistValues;
  } else {
    return [];
  }
}
