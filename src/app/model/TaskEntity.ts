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
  RowVersion!: Uint8Array;
}
export class AssignTaskEntity {
  id: string = '';
  TaskID: string = '';
  MemberID: string = '';
  priority: number = 0;
  Status: number = 0;
  Duration: number = 0;
  Remark: string = '';
  StartDate: string = '';
  DueDate: string = '';
  createdBy: string | null = '';
  updatedBy: string | null = '';
  RowVersion!: Uint8Array;
  taskEntity: TaskEntity = new TaskEntity();
}
export class CountModel {
  projectCount: number = 0;
  taskCount: number = 0;
  completeCount: number = 0;
  progressCount: number = 0;
  notstartCount: number = 0;
}
export class CountRes {
  code: string = '';
  description: string = '';
  count: CountModel = new CountModel();
}
