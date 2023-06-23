import { Entity } from '../../misc/types/entity.ts';

export interface Project extends Entity {
  projectname: string;
  startdate: string;
  targetenddate: string;
  actualenddate: string;
  projectstatus: string;
  created_time: string;
  projecttype: string;
  project_no: string;
  targetbudget: string;
  projecturl: string;
  projectpriority: string;
  modified_time: string;
  progress: string;
  potentialid: string;
  statistics: CurrentProjectStatistics;
}

interface CurrentProjectStatistics {
  total_tasks?: number;
  total_hours?: number;
  open_tasks?: number;
  closed_tasks?: number;
  in_progress_tasks?: number;
  deferred_tasks?: number;
  cancelled_tasks?: number;
  low_tasks?: number;
  normal_tasks?: number;
  high_tasks?: number;
}
