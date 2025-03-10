import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CountModel, CountRes } from 'src/app/model/TaskEntity';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseUrl = 'https://localhost:7186';
  constructor(private router: Router, private http: HttpClient) {}
  GetAllCountTask(): Observable<CountRes> {
    return this.http.get<CountRes>(this.baseUrl + '/Home/GetAllCountTask');
  }
}
