import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { calculateDuration, getTodayDate } from 'src/app/common/GeneralUtil';
import {
  ListResponse,
  ResponseCode,
  ResponseMessage,
} from 'src/app/model/responseMessage';
import { AssignTaskEntity, TaskEntity } from 'src/app/model/TaskEntity';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TaskService } from 'src/app/shared/services/task-service';
@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss'],
})
export class AssignTaskComponent {
  assigntaskForm: FormGroup;
  //tasklist = ['Not Start', 'Progress', 'Complete'];
  memberlist = ['Nwe Yin Aye', 'Shwe Yi', 'Chu K Khaing'];
  tasklist: TaskEntity[] = [];
  isDisabled: boolean = true;
  public constructor(
    private fb: FormBuilder,
    private taskservice: TaskService,
    private notificationService: NotificationService
  ) {
    this.assigntaskForm = this.fb.group({
      TaskID: ['', [Validators.required]],
      MemberID: ['', [Validators.required]],
      StartDate: [getTodayDate(), [Validators.required]],
      DueDate: [getTodayDate(), [Validators.required]],
      Duration: [1, [Validators.required]],
      Remark: [''],
    });
    this.getAllTasks();
    this.onDateChange();
  }

  getAllTasks() {
    this.taskservice
      .getTaskList()
      .subscribe((item: ListResponse<TaskEntity>) => {
        this.tasklist = item.responseList;
      });
  }

  async onAssignTask() {
    const task: AssignTaskEntity = this.assigntaskForm.value;
    task.createdBy = localStorage.getItem('userId');
    task.updatedBy = localStorage.getItem('userId');
    if (task.StartDate) {
      task.StartDate = new Date(task.StartDate).toISOString(); // Convert to ISO format
    }
    if (task.DueDate) {
      task.DueDate = new Date(task.DueDate).toISOString();
    }
    if (this.assigntaskForm.valid) {
      await this.taskservice.assignTask(task).subscribe({
        next: (response: ResponseMessage) => {
          if (response.code === ResponseCode.success) {
            this.notificationService.showNotification(
              response.description,
              'success'
            );
            this.clear();
          } else {
            this.notificationService.showNotification(
              response.description,
              'error'
            );
          }
        },
        error: (error) => {
          this.notificationService.showNotification(
            'Task create failed!',
            'error'
          );
        },
      });
    }
  }
  onDateChange(): void {
    const StartDate = new Date(this.assigntaskForm.value.StartDate);
    const DueDate = new Date(this.assigntaskForm.value.DueDate);

    var duration = calculateDuration(StartDate, DueDate);
    if (duration == 0) duration = 1;
    this.assigntaskForm.value.Duration = duration;
  }
  clear() {
    this.assigntaskForm = this.fb.group({
      TaskID: ['', [Validators.required]],
      MemberID: ['', [Validators.required]],
      StartDate: [getTodayDate(), [Validators.required]],
      DueDate: [getTodayDate(), [Validators.required]],
      Duration: [1, [Validators.required]],
      Remark: [''],
    });
  }
}
