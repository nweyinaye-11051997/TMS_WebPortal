export class ProjectEntity {
  id: string = '';
  projectName = '';
  projectManager = '';
  category = '';
  status: string = '';
  remark: string = '';
  startDate: string = '';
  endDate: string = '';
  createdBy: string | null = '';
  updatedBy: string | null = '';
}
