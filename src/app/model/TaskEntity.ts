export class TaskEntity {
  taskName: string = '';
  description: string = '';
  projectID: string = '';
  priority: number = 0;
  status: string = '';
  startDate: string = '';
  endDate: string = '';
  id: string = '';
  createdBy: string | null = '';
  updatedBy: string | null = '';
  assignTasks: AssignTaskEntity[] = [];
}
export class AssignTaskEntity {
  TaskID: string = '';
  MemberID: string = '';
  priority: number = 0;
  Status: string = '';
  Duration: number = 0;
  Remark: string = '';
  StartDate: string = '';
  DueDate: string = '';
  createdBy: string | null = '';
  updatedBy: string | null = '';
}
