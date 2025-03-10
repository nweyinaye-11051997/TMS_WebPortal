import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ListResponse, ResponseMessage } from 'src/app/model/responseMessage';
import { AssignTaskEntity, TaskEntity } from '../../model/TaskEntity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'https://localhost:7186';
  constructor(private router: Router, private http: HttpClient) {}
  getTaskList(): Observable<ListResponse<TaskEntity>> {
    return this.http.get<ListResponse<TaskEntity>>(
      this.baseUrl + '/Task/GetAllTask'
    );
  }
  createTask(task: TaskEntity) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/Task/createTask',
      task
    );
  }
  assignTask(task: AssignTaskEntity) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/Task/assignTask',
      task
    );
  }
  deleteTask(task: any) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/Task/deleteTask',
      task
    );
  }
  updateTask(task: any) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/Task/updateTask',
      task
    );
  }
  updateAssignTask(task: any) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/Task/updateAssignTask',
      task
    );
  }
}
