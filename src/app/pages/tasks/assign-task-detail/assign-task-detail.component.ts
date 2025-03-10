import { Component, Input } from '@angular/core';
import { memberlist, progress } from 'src/app/common/GeneralUtil';
import { ResponseMessage } from 'src/app/model/responseMessage';
import { AssignTaskEntity, TaskEntity } from 'src/app/model/TaskEntity';
import { AssignTaskService } from 'src/app/shared/services/assign-task.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TaskService } from 'src/app/shared/services/task-service';

@Component({
  selector: 'app-assign-task-detail',
  templateUrl: './assign-task-detail.component.html',
  styleUrls: ['./assign-task-detail.component.scss'],
})
export class AssignTaskDetailComponent {
  progress = progress;
  @Input() assignTasks: AssignTaskEntity[] = [];
  memberlist = memberlist;
  constructor(
    private service: AssignTaskService,
    private notificationService: NotificationService
  ) {}
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
    this.assignTasks = this.assignTasks.map((task) =>
      task.id === key ? { ...task, ...updatedTask } : task
    );
    const e = this.assignTasks.find((task) => task.id === key);
    var taskEntity = new TaskEntity();
    taskEntity.id = '';
    e!.taskEntity = taskEntity;
    if (type === 'update') {
      await this.service.updateTask(e).subscribe({
        next: (response: ResponseMessage) => {
          this.notificationService.showNotification(
            response.description,
            'success'
          );
        },
        error: (error) => {},
      });
    } else if (type === 'remove') {
      // await this.service.deleteTask(e).subscribe({
      //   next: (response: ResponseMessage) => {
      //     this.notificationService.showNotification(
      //       response.description,
      //       'success'
      //     );
      //   },
      //   error: (error) => {},
      // });
    }
  }
  formatDuration(rowData: any) {
    return rowData.duration + ' days';
  }
  formatProgress(rowData: any) {
    return rowData.status;
  }
}
