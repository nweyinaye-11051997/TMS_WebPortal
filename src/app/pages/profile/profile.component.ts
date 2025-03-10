import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  employee: any;
  colCountByScreen: object;

  constructor(private authService: AuthService) {
    this.employee = {
      ID: 7,
      FirstName: 'Sandra',
      LastName: 'Johnson',
      Prefix: 'Mrs.',
      Position: 'Controller',
      Picture: 'images/employees/06.png',
      BirthDate: new Date('1974/11/5'),
      HireDate: new Date('2005/05/11'),
      /* tslint:disable-next-line:max-line-length */
      Notes:
        this.authService._user?.email +
        ' is a CPA and has been our controller since 2008. She loves to interact with staff so if you`ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.',
      Address: '4600 N Virginia Rd.',
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    };
  }
}
