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
  dataSource: ProjectEntity[] = [];
  statusList = statusList;
  constructor(private projectservice: ProjectService) {}
  ngOnInit(): void {
    this.getAllProjectList();
  }

  async getAllProjectList() {
    this.projectservice
      .getProjectList()
      .subscribe((item: ListResponse<ProjectEntity>) => {
        console.log(item.responseList);
        this.dataSource = item.responseList;
      });
  }

  getStatusValue(status: string): number {
    switch (status.toLowerCase()) {
      case 'not start':
        return 0; // Blue for Active
      case 'progress':
        return 50; // Red for Inactive
      case 'complete':
        return 100;
      default:
        return 0; // Gray for Other Statuses
    }
  }
  format(ratio: any) {
    return `progress: ${ratio * 100}%`;
  }
}
