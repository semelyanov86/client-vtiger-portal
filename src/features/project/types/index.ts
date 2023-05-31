import { Entity } from '../../misc/types/entity.ts';

export interface Project extends Entity {
  projectname: string;
  startdate: string;
  targetenddate: string;
  actualenddate: string;
  projectstatus: string;
  projecttype: string;
  project_no: string;
  targetbudget: string;
  projecturl: string;
  projectpriority: string;
  progress: string;
  potentialid: string;
}
