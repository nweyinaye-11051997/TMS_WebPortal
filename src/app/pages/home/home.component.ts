import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../shared/services/home.service';
import { CountModel, CountRes } from 'src/app/model/TaskEntity';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  res: CountRes = new CountRes();
  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    this.GetAllCountTask();
  }

  GetAllCountTask() {
    this.homeService.GetAllCountTask().subscribe((item: CountRes) => {
      this.res = item;
    });
  }
}
