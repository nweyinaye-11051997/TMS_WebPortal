import { Component } from '@angular/core';
import { DxCheckBoxTypes } from 'devextreme-angular/ui/check-box';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  projectList = ["TMS", "HR", "Smart QR"];
  statusList = ["Not Start","Progress","Complete"];
  priorityList = ["Low","Normal","High","Urgent"];
  //valueForEditableTextArea: string;

  //height = 90;
  maxLength =100;

  autoResizeEnabled: boolean = true;
  onAutoResizeChanged({ value }: DxCheckBoxTypes.ValueChangedEvent) {
   // this.height = value ? undefined : 90;
  }

}
