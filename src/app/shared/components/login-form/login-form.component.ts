import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  HttpResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { User } from 'src/app/model/user';
import {
  DxTextBoxModule,
  DxToastModule,
  DxValidationSummaryModule,
  DxValidatorComponent,
  DxValidatorModule,
} from 'devextreme-angular';
import { NotificationService } from '../../services/notification.service';
import {
  ResponseCode,
  ResponseMessage,
  TokenResponse,
} from 'src/app/model/responseMessage';
import dxTextBox from 'devextreme/ui/text_box';
import { ValidationCallbackData } from 'devextreme/common';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { tokenInterceptor } from '../../services/token.interceptor';
const sendRequest = function (value: string) {
  const invalidEmail = 'test@dx-email.com';
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value !== invalidEmail);
    }, 1000);
  });
};
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  // @ViewChild('targetValidator', { static: false })
  // validator: DxValidatorComponent;
  asyncValidation = (params: ValidationCallbackData) =>
    sendRequest(params.value);
  registrationForm: FormGroup;
  loginForm: FormGroup;
  passwordMode: DxTextBoxTypes.TextBoxType = 'password';
  passwordButton: DxButtonTypes.Properties = {
    icon: 'eyeopen',
    stylingMode: 'text',
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };
  public constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const user: User = this.loginForm.value;
    if (this.loginForm.valid) {
      await this.authService.logInUser(user).subscribe({
        next: (response: TokenResponse) => {
          if (response.code === ResponseCode.success) {
            const email: string = user.username;
            this.authService._user = { email };
            localStorage.setItem('token', response.token);
            this.router.navigate(['/home']);
          } else {
            this.notificationService.showNotification('Login failed!', 'error');
          }
        },
        error: (error) => {
          this.notificationService.showNotification('Login failed!', 'error');
        },
      });
    }
  }

  async onCreateAccountClick(e: Event) {
    e.preventDefault();
    const user: User = this.registrationForm.value;
    if (this.registrationForm.valid) {
      (await this.authService.registerUser(user)).subscribe({
        next: (response: ResponseMessage) => {
          if (response.code == ResponseCode.success) {
            this.notificationService.showNotification(
              response.description,
              'success'
            );
          } else {
            this.notificationService.showNotification(
              response.description,
              'error'
            );
          }
        },
        error: (error) => {
          this.notificationService.showNotification(
            'Registration failed!',
            'error'
          );
        },
      });
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    ReactiveFormsModule,
    DxToastModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxValidationSummaryModule,
  ],

  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  providers: [provideHttpClient(withInterceptors([tokenInterceptor]))],
})
export class LoginFormModule {}
