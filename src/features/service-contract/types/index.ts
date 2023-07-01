import { Entity } from '../../misc/types/entity.ts';

export interface ServiceContract extends Entity {
  start_date: string;
  end_date: string;
  sc_related_to: string;
  tracking_unit: string;
  total_units: number;
  used_units: number;
  subject: string;
  due_date: string;
  planned_duration: number;
  actual_duration: number;
  contract_status: string;
  contract_priority: string;
  contract_type: string;
  progress: number;
  contract_no: string;
}
