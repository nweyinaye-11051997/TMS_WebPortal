import { Component, OnInit } from '@angular/core';
import 'devextreme/data/odata/store';
import { TaskService } from '../../shared/services/task-service';
import { ListResponse, ResponseMessage } from 'src/app/model/responseMessage';
import { TaskEntity } from 'src/app/model/TaskEntity';
import {
  getTodayDate,
  priority,
  progress,
  statusList,
} from 'src/app/common/GeneralUtil';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProjectEntity } from 'src/app/model/ProjectModel';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  searchTerm: string = '';
  statusList = statusList;
  priority = priority;
  progress = progress;
  dataSource: TaskEntity[] = [];
  dataSourceResult: TaskEntity[] = [];
  projectList: ProjectEntity[] = [];

  startDate: string = getTodayDate();
  endDate: string = getTodayDate();
  constructor(
    private taskservice: TaskService,
    private notificationService: NotificationService,
    private projectservice: ProjectService
  ) {}
  ngOnInit(): void {
    this.getAllTasks();
    this.getAllProject();
  }
  async getAllProject() {
    this.projectservice
      .getProjectList()
      .subscribe((item: ListResponse<ProjectEntity>) => {
        console.log(item.responseList);
        this.projectList = item.responseList;
      });
  }
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'not start':
        return '../../../assets/images/notstart.png'; // Blue for Active
      case 'progress':
        return '../../../assets/images/progress.png'; // Red for Inactive
      case 'complete':
        return '../../../assets/images/complete.png'; // Yellow for Pending
      default:
        return 'btn-secondary'; // Gray for Other Statuses
    }
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

  onSearch() {
    this.dataSource = this.dataSourceResult.filter(
      (task) =>
        task.startDate.includes(this.startDate) ||
        task.endDate.includes(this.endDate)
    );
    this.dataSource = this.dataSource.filter(
      (task) =>
        task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        //task.projectID.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    if (this.searchTerm) {
      let data = this.priority.find((p) =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      let pj = this.projectList.find((p) =>
        p.projectName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      if (data) {
        this.dataSource = this.dataSourceResult.filter(
          (task) => task.priority == data!.value
        );
      }
      if (pj) {
        this.dataSource = this.dataSourceResult.filter((task) =>
          task.projectID.toLowerCase().includes(pj!.id.toLowerCase())
        );
      }
    }
    this.dataSource = this.dataSource.sort((a, b) => b.priority - a.priority);
  }
  getAllTasks() {
    this.taskservice
      .getTaskList()
      .subscribe((item: ListResponse<TaskEntity>) => {
        this.dataSourceResult = item.responseList;
        this.dataSource = this.dataSourceResult;
        this.dataSource = this.dataSource.sort(
          (a, b) => b.priority - a.priority
        );
      });
  }

  onSaving(e: any) {
    const changes = e.changes;
    if (changes.length > 0) {
      changes.forEach((change: any) => {
        this.onUpdateTask(change.data, change.key, change.type);
      });
    }
  }
  async onUpdateTask(
    updatedTask: Partial<TaskEntity>,
    key: string,
    type: string
  ) {
    this.dataSourceResult = this.dataSourceResult.map((task) =>
      task.id === key ? { ...task, ...updatedTask } : task
    );
    const e = this.dataSourceResult.find((task) => task.id === key);
    if (type === 'update') {
      await this.taskservice.updateTask(e).subscribe({
        next: (response: ResponseMessage) => {
          this.notificationService.showNotification(
            response.description,
            'success'
          );
        },
        error: (error) => {},
      });
    } else if (type === 'remove') {
      await this.taskservice.deleteTask(e).subscribe({
        next: (response: ResponseMessage) => {
          this.notificationService.showNotification(
            response.description,
            'success'
          );
        },
        error: (error) => {},
      });
    }
  }
  formatDuration(rowData: any) {
    return rowData.duration + ' days';
  }
  formatProgress(rowData: any) {
    return rowData.status;
  }
}
