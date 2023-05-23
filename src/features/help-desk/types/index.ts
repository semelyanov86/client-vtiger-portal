import { Entity } from '../../misc/types/entity.ts';

export default interface HelpDesk extends Entity {
  ticket_no: string;
  parent_id: string;
  ticketpriorities: string;
  product_id: string;
  ticketseverities: string;
  ticketstatus: string;
  ticketcategories: string;
  hours: number;
  days: number;
  from_portal: boolean;
  ticket_title: string;
  solution: string;
  contact_id: string;
}
