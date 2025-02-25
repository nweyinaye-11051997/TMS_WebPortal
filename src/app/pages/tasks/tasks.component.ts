import { Component, OnInit } from '@angular/core';
import 'devextreme/data/odata/store';
import { TaskService } from '../../shared/services/task-service';

@Component({
  templateUrl: 'tasks.component.html',
})
export class TasksComponent implements OnInit {
  dataSource: any;
  priority: any[];

  constructor(private taskservice: TaskService) {
    this.dataSource = {
      store: {
        version: 2,
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks',
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name',
      ],
    };
    this.priority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 },
    ];
  }
  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskservice.getTaskList().subscribe((item) => {
      console.log(item);
    });
  }
}
