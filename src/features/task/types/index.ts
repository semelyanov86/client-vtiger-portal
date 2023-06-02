import { Entity } from '../../misc/types/entity.ts';

export interface ProjectTask extends Entity {
  projecttaskname: string;
  projecttasktype: string;
  projecttaskpriority: string;
  projectid: string;
  projecttasknumber: string;
  projecttask_no: string;
  projecttaskprogress: string;
  projecttaskhours: string;
  startdate: string;
  enddate: string;
  projecttaskstatus: string;
}
