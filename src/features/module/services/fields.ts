import { Module } from '../types';

export function getPicklistValues(
  module: Module,
  fieldName: string
): Array<{ label: string; value: string }> {
  const field = getFieldByName(module, fieldName);
  if (!field) {
    return [];
  }

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

export function getFieldByName(module: Module, fieldName: string) {
  if (!module.fields) {
    return undefined;
  }
  return module.fields.find((field) => field.name === fieldName);
}
