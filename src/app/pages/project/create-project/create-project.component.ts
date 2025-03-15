import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../../shared/services/project.service';
import { ProjectEntity } from '../../../model/ProjectModel';
import {
  categorylist,
  getTodayDate,
  pjmanagerlist,
  statusList,
} from 'src/app/common/GeneralUtil';
import { ResponseMessage, ResponseCode } from 'src/app/model/responseMessage';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  statusList = statusList;
  pjmanagerlist = pjmanagerlist;
  categorylist = categorylist;
  createForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private notificationService: NotificationService
  ) {
    this.createForm = this.fb.group({
      ProjectName: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      ProjectManager: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      StartDate: [getTodayDate(), [Validators.required]],
      EndDate: [getTodayDate(), [Validators.required]],
      Remark: [''],
    });
  }
  ngOnInit(): void {}
  async onCreateTask() {
    const project: ProjectEntity = this.createForm.value;
    project.createdBy = localStorage.getItem('userId');
    project.updatedBy = localStorage.getItem('userId');
    if (project.startDate) {
      project.startDate = new Date(project.startDate).toISOString(); // Convert to ISO format
    }
    if (project.endDate) {
      project.endDate = new Date(project.endDate).toISOString();
    }
    if (this.createForm.valid) {
      await this.projectService.createProject(project).subscribe({
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
  clearData() {
    this.createForm = this.fb.group({
      ProjectName: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      ProjectManager: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      StartDate: [getTodayDate(), [Validators.required]],
      EndDate: [getTodayDate(), [Validators.required]],
      Remark: ['', [Validators.required]],
    });
  }
}
