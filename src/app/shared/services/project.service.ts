import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectEntity } from 'src/app/model/ProjectModel';
import { ListResponse, ResponseMessage } from 'src/app/model/responseMessage';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = 'https://localhost:7186';
  constructor(private router: Router, private http: HttpClient) {}
  createProject(task: ProjectEntity) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/Project/createProject',
      task
    );
  }
  getProjectList(): Observable<ListResponse<ProjectEntity>> {
    return this.http.get<ListResponse<ProjectEntity>>(
      this.baseUrl + '/Project/GetAllProject'
    );
  }
}
