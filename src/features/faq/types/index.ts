import { Entity } from '../../misc/types/entity.ts';

export interface Faq extends Entity {
  faqcategories: string;
  faqstatus: string;
  question: string;
  faq_answer: string;
}
