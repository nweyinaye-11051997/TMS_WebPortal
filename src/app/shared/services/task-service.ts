import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'https://localhost:7186';
  constructor(private router: Router, private http: HttpClient) {}
  getTaskList() {
    return this.http.get(this.baseUrl + '/Task/getAllTask');
  }
}
