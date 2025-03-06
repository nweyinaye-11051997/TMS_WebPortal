import { AfterViewInit, Component, Input } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { TaskEntity } from 'src/app/model/TaskEntity';

@Component({
  selector: 'app-assign-task-detail',
  templateUrl: './assign-task-detail.component.html',
  styleUrls: ['./assign-task-detail.component.scss'],
})
export class AssignTaskDetailComponent implements AfterViewInit {
  @Input() taskID: string | undefined;
  @Input() dataSource: TaskEntity[] = [];
  tasksDataSource: DataSource | undefined;

  ngAfterViewInit() {
    this.tasksDataSource = new DataSource({
      store: new ArrayStore({
        data: this.dataSource,
        key: 'id',
      }),
      filter: ['id', '=', this.taskID],
    });
    console.log(this.tasksDataSource);
    alert(this.tasksDataSource);
  }
}
