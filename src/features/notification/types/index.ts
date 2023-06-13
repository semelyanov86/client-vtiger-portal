import { Manager } from '../../manager/types';

export interface Notification {
  crmid: string;
  module: string;
  label: string;
  description: string;
  manager: Manager;
}
