import { Currency } from '../../misc/types/currency.ts';
import { Entity } from '../../misc/types/entity.ts';

export interface Service extends Entity {
  servicename: string;
  service_no: string;
  discontinued: boolean;
  sales_start_date: string;
  sales_end_date: string;
  start_date: string;
  expiry_date: string;
  website: string;
  service_usageunit: string;
  qty_per_unit: number;
  servicecategory: string;
  unit_price: number;
  taxclass: string;
  commissionrate: number;
  purchase_cost: number;
  tax2: number;
  tax3: number;
  currency1: number;
  currency_id: string;
  currency: Currency;
}
