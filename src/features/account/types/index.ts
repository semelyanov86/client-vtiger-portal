import { Entity } from '../../misc/types/entity.ts';

export interface Account extends Entity {
  accountname: string;
  account_no: string;
  phone: string;
  website: string;
  fax: string;
  tickersymbol: string;
  otherphone: string;
  account_id: string;
  email1: string;
  employees: string;
  email2: string;
  ownership: string;
  rating: string;
  industry: string;
  siccode: string;
  accounttype: string;
  annual_revenue: string;
  emailoptout: string;
  notify_owner: string;
  bill_street: string;
  ship_street: string;
  bill_city: string;
  ship_city: string;
  bill_state: string;
  ship_state: string;
  bill_code: string;
  ship_code: string;
  bill_country: string;
  ship_country: string;
  bill_pobox: string;
  ship_pobox: string;
  description: string;
  isconvertedfromlead: string;
  imagename: string;
  imageattachmentids: string;
}
