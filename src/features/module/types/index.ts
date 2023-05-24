type Field = {
  name: string;
  label: string;
  mandatory: boolean;
  isunique: boolean;
  nullable: boolean;
  editable: boolean;
  default: string;
  type: FieldType;
};

type FieldType =
  | {
      name: 'reference';
      refersTo: string[];
    }
  | {
      name: 'picklist';
      defaultValue: string;
      picklistValues: Array<{
        label: string;
        value: string;
      }>;
    }
  | {
      name: 'double';
    }
  | {
      name: 'datetime';
    };

export type Module = {
  label: string;
  name: string;
  createable: boolean;
  updateable: boolean;
  deleteable: boolean;
  retrieveable: boolean;
  fields: Field[];
  idPrefix: string;
  isEntity: boolean;
  allowDuplicates: boolean;
  labelFields: string;
};
