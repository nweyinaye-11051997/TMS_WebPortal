export class ProjectEntity {
  id: string = '';
  projectName = '';
  projectManager = '';
  Category = '';
  Status: number = 0;
  Remark: string = '';
  StartDate: string = '';
  EndDate: string = '';
  createdBy: string | null = '';
  updatedBy: string | null = '';
}
