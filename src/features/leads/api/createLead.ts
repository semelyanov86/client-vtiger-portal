import { axios } from '../../../lib/axios.ts';
import { LeadDTO } from '../types';

export const createLead = (lead: LeadDTO): Promise<LeadDTO> => {
  return axios.post<LeadDTO>('/leads/', lead).then((res) => res.data);
};
