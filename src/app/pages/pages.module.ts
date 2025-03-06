import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { DxDataGridModule, DxProgressBarModule } from 'devextreme-angular';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignTaskComponent } from './tasks/assign-task/assign-task.component';
import { AssignTaskDetailComponent } from './tasks/assign-task-detail/assign-task-detail.component';

@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent,
    AssignTaskComponent,
    AssignTaskDetailComponent,
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    ReactiveFormsModule,
    DxButtonModule,
    FormsModule,
    DxProgressBarModule,
  ],
})
export class PagesModule {}
