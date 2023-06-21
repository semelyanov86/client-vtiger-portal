import { RelatedField } from '../../types';
import { BooleanCell } from './BooleanCell.tsx';
import useModulesStore from '../../../module/stores/module.ts';
import { StringCell } from './StringCell.tsx';
import { getFieldByName } from '../../../module/services/fields.ts';
import { AmountCell } from './AmountCell.tsx';
import { NumberCell } from './NumberCell.tsx';
import { TagsCell } from './TagsCell.tsx';
import { PickListCell } from './PickListCell.tsx';
import { DateCell } from './DateCell.tsx';

interface DisplayCellValueProps {
  value: boolean | string | number | RelatedField | string[];
  field: string;
  module: string;
  id: string;
}

export const DisplayCellValue = ({ value, module, id, field }: DisplayCellValueProps) => {
  const { customModules } = useModulesStore();
  if (!customModules[module]) {
    return null;
  }
  if (typeof value == 'boolean') {
    return <BooleanCell value={value}></BooleanCell>;
  }
  const fieldModel = getFieldByName(customModules[module], field);

  if (typeof value == 'number') {
    if (fieldModel && fieldModel.type.name == 'currency') {
      return <AmountCell value={value}></AmountCell>;
    }
    return <NumberCell value={value}></NumberCell>;
  }

  if (Array.isArray(value)) {
    return <TagsCell value={value}></TagsCell>;
  }
  if (typeof value == 'object') {
    return <StringCell value={value.id} id={id} module={module}></StringCell>;
  }
  if (fieldModel && fieldModel.type.name == 'picklist') {
    return <PickListCell value={value} module={module}></PickListCell>;
  }
  if (fieldModel && (fieldModel.type.name == 'date' || fieldModel.type.name == 'datetime')) {
    return <DateCell value={value}></DateCell>;
  }
  return <StringCell value={value} id={id} module={module} />;
};
