import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DxCheckBoxTypes } from 'devextreme-angular/ui/check-box';
import { TaskEntity } from '../../../model/TaskEntity';
import { TaskService } from 'src/app/shared/services/task-service';
import {
  ListResponse,
  ResponseCode,
  ResponseMessage,
} from '../../../model/responseMessage';
import { NotificationService } from 'src/app/shared/services/notification.service';
import {
  getTodayDate,
  memberlist,
  priority,
  projectList,
  statusList,
} from 'src/app/common/GeneralUtil';
import { ProjectService } from 'src/app/shared/services/project.service';
import { ProjectEntity } from 'src/app/model/ProjectModel';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  projectList: ProjectEntity[] = [];
  statusList = statusList;
  priority = priority;
  memberlist = memberlist;
  //valueForEditableTextArea: string;
  taskcreateForm: FormGroup;

  //height = 90;
  maxLength = 100;

  autoResizeEnabled: boolean = true;
  onAutoResizeChanged({ value }: DxCheckBoxTypes.ValueChangedEvent) {
    // this.height = value ? undefined : 90;
  }
  public constructor(
    private fb: FormBuilder,
    private taskservice: TaskService,
    private notificationService: NotificationService,
    private projectservice: ProjectService
  ) {
    this.taskcreateForm = this.fb.group({
      TaskName: ['', [Validators.required]],
      Description: [''],
      ProjectID: ['', [Validators.required]],
      Priority: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      StartDate: [getTodayDate(), [Validators.required]],
      EndDate: [getTodayDate(), [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.GetAllProject();
  }

  async onCreateTask() {
    const task: TaskEntity = this.taskcreateForm.value;
    task.createdBy = localStorage.getItem('userId');
    task.updatedBy = localStorage.getItem('userId');
    if (task.startDate) {
      task.startDate = new Date(task.startDate).toISOString(); // Convert to ISO format
    }
    if (task.endDate) {
      task.endDate = new Date(task.endDate).toISOString();
    }
    if (this.taskcreateForm.valid) {
      await this.taskservice.createTask(task).subscribe({
        next: (response: ResponseMessage) => {
          if (response.code === ResponseCode.success) {
            this.notificationService.showNotification(
              response.description,
              'success'
            );
            this.clearData();
          } else {
            this.notificationService.showNotification(
              response.description,
              'error'
            );
            this.clearData();
          }
        },
        error: (error) => {
          this.notificationService.showNotification(
            'Task create failed!',
            'error'
          );
          this.clearData();
        },
      });
    }
  }
  async GetAllProject() {
    this.projectservice
      .getProjectList()
      .subscribe((item: ListResponse<ProjectEntity>) => {
        console.log(item.responseList);
        this.projectList = item.responseList;
      });
  }

  clearData() {
    this.taskcreateForm = this.fb.group({
      TaskName: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      ProjectID: ['', [Validators.required]],
      Priority: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      StartDate: [getTodayDate(), [Validators.required]],
      EndDate: [getTodayDate(), [Validators.required]],
    });
  }
}
