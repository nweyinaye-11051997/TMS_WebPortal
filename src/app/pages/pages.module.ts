import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { DxDataGridModule, DxProgressBarModule } from 'devextreme-angular';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignTaskComponent } from './tasks/assign-task/assign-task.component';
import { AssignTaskDetailComponent } from './tasks/assign-task-detail/assign-task-detail.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';

@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent,
    AssignTaskComponent,
    AssignTaskDetailComponent,
    CreateProjectComponent,
    ProjectListComponent,
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
