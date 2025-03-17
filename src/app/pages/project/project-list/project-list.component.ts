import { Component, OnInit } from '@angular/core';
import { getTodayDate, statusList } from 'src/app/common/GeneralUtil';
import { ProjectEntity } from 'src/app/model/ProjectModel';
import { ProjectService } from '../../../shared/services/project.service';
import { ListResponse } from 'src/app/model/responseMessage';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  startDate: string = getTodayDate();
  endDate: string = getTodayDate();
  dataSourceResult: ProjectEntity[] = [];
  dataSource: ProjectEntity[] = [];
  statusList = statusList;
  searchTerm: string = '';
  constructor(private projectservice: ProjectService) {}
  ngOnInit(): void {
    this.getAllProjectList();
  }

  async getAllProjectList() {
    this.projectservice
      .getProjectList()
      .subscribe((item: ListResponse<ProjectEntity>) => {
        this.dataSource = item.responseList;
        this.dataSourceResult = this.dataSource;
      });
  }

  onSearch() {
    this.dataSource = this.dataSourceResult.filter((project) => {
      const projectStartDate = new Date(project.startDate);
      const projectEndDate = new Date(project.endDate);

      const filterStartDate = new Date(this.startDate);
      const filterEndDate = new Date(this.endDate);

      return (
        (projectStartDate >= filterStartDate &&
          projectStartDate <= filterEndDate) ||
        (projectEndDate >= filterStartDate &&
          projectEndDate <= filterEndDate) ||
        (projectStartDate <= filterStartDate && projectEndDate >= filterEndDate)
      );
    });
    this.dataSource = this.dataSource.filter(
      (project) =>
        project.projectName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        project.category
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        project.projectManager
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        project.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        //task.projectID.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        //task.Status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.remark.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    // if (this.searchTerm) {
    //   let data = this.priority.find((p) =>to
    //   let pj = this.projectList.find((p) =>
    //     p.projectName.toLowerCase().includes(this.searchTerm.toLowerCase())
    //   );
    //   if (data) {
    //     this.dataSource = this.dataSourceResult.filter(
    //       (task) => task.priority == data!.value
    //     );
    //   }
    //   if (pj) {
    //     this.dataSource = this.dataSourceResult.filter((task) =>
    //       task.projectID.toLowerCase().includes(pj!.id.toLowerCase())
    //     );
    //   }
    // }
    // this.dataSource = this.dataSource.sort((a, b) => b.priority - a.priority);
  }

  format(ratio: any) {
    return `progress: ${ratio * 100}%`;
  }
}
