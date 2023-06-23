import { TagsList } from '../../../components/Elements/DetailPage/TagsList.tsx';
import { getFieldByName } from '../../module/services/fields.ts';
import useModulesStore from '../../module/stores/module.ts';
import { RelatedField } from '../types';

import { AmountDetailCell } from './AmountDetailCell.tsx';
import { BooleanDetailCell } from './BooleanDetailCell.tsx';
import { DateDetailCell } from './DateDetailCell.tsx';
import { NumberDetailCell } from './NumberDetailCell.tsx';
import { PickListDetailCell } from './PickListDetailCell.tsx';
import { StringDetailCell } from './StringDetailCell.tsx';

interface DisplayCellValueProps {
  value: boolean | string | number | RelatedField | string[];
  field: string;
  module: string;
}

export const DisplayDetailCellValue = ({ value, module, field }: DisplayCellValueProps) => {
  const { customModules } = useModulesStore();
  if (!customModules[module]) {
    return null;
  }
  if (typeof value == 'boolean') {
    return <BooleanDetailCell value={value}></BooleanDetailCell>;
  }
  const fieldModel = getFieldByName(customModules[module], field);

  if (typeof value == 'number') {
    if (fieldModel && fieldModel.type.name == 'currency') {
      return <AmountDetailCell value={value}></AmountDetailCell>;
    }
    return <NumberDetailCell value={value}></NumberDetailCell>;
  }

  if (Array.isArray(value)) {
    return <TagsList tags={value}></TagsList>;
  }
  if (typeof value == 'object') {
    return <StringDetailCell value={value.label}></StringDetailCell>;
  }
  if (fieldModel && fieldModel.type.name == 'picklist') {
    return <PickListDetailCell value={value} module={module}></PickListDetailCell>;
  }
  if (fieldModel && (fieldModel.type.name == 'date' || fieldModel.type.name == 'datetime')) {
    return <DateDetailCell value={value}></DateDetailCell>;
  }
  return <StringDetailCell value={value} />;
};
