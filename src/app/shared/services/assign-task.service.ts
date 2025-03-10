import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseMessage } from 'src/app/model/responseMessage';
import { AssignTaskEntity } from 'src/app/model/TaskEntity';

@Injectable({
  providedIn: 'root',
})
export class AssignTaskService {
  baseUrl = 'https://localhost:7186';
  constructor(private router: Router, private http: HttpClient) {}
  updateTask(task: any) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/AssignTask/updateAssignTask',
      task
    );
  }
  assignTask(task: AssignTaskEntity) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/AssignTask/assignTask',
      task
    );
  }
}
