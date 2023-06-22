import * as icons from 'react-bootstrap-icons';

export interface RelatedField {
  label: string;
  id: string;
}

export type CustomModule = {
  [key: string]: boolean | string | number | RelatedField | string[];
};

export type ConfigCustomModules = {
  [ley: string]: CustomModuleFieldConfiguration;
};

type CustomModuleFieldConfiguration = {
  default_sort: string;
  list_fields: string[];
  icon: keyof typeof icons;
  edit_fields: string[];
};
