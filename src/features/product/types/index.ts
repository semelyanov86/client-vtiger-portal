import { Currency } from '../../misc/types/currency.ts';
import { Entity } from '../../misc/types/entity.ts';

export interface Product extends Entity {
  productname: string;
  product_no: string;
  productcode: string;
  discontinued: boolean;
  manufacturer: string;
  productcategory: string;
  sales_start_date: string;
  sales_end_date: string;
  start_date: string;
  expiry_date: string;
  website: string;
  vendor_id: string;
  mfr_part_no: string;
  vendor_part_no: string;
  serial_no: string;
  productsheet: string;
  glacct: string;
  createdtime: string;
  modifiedtime: string;
  unit_price: number;
  commissionrate: number;
  taxclass: string;
  usageunit: string;
  qty_per_unit: number;
  qtyinstock: number;
  reorderlevel: number;
  qtyindemand: number;
  purchase_cost: number;
  imageattachmentids: string;
  currency1: number;
  currency_id: string;
  currency: Currency;
  imagecontent: string;
}
