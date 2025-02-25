import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { AuthService } from '../../services';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { ResponseCode, ResponseMessage } from 'src/app/model/responseMessage';
import { NotificationService } from '../../services/notification.service';
import { MailRequest } from 'src/app/model/MailRequest';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../../services/token.interceptor';

const notificationText =
  "We've sent a link to reset your password. Check your inbox.";

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent {
  loading = false;
  txtTitle = 'Forgot Password';
  txt = 'Enter email';
  btnText = 'Send code';
  showForm = false;
  //formData: any = {};
  formData: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.formData = this.fb.group({
      ToEmail: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit(e: Event) {
    //e.preventDefault();
    //const { email } = this.formData;
    this.loading = true;

    //const result = await this.authService.resetPassword(email);
    this.loading = false;

    // if (result.isOk) {
    //   this.router.navigate(['/login-form']);
    //   notify(notificationText, 'success', 2500);
    // } else {
    //   notify(result.message, 'error', 2000);
    // }
    // if (true) {
    //   this.txtTitle = 'Code Verification';
    //   this.txt = 'Enter code';
    //   this.btnText = 'Submit';
    //   this.showForm = true;
    // }
    const mailRequest: MailRequest = this.formData.value;
    await this.authService.resetPassword(mailRequest).subscribe({
      next: (response: ResponseMessage) => {
        console.log(response);
        if (response.code === ResponseCode.success) {
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
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxValidatorModule,
    DxTextBoxModule,
    ReactiveFormsModule,
  ],
  declarations: [ResetPasswordFormComponent],
  exports: [ResetPasswordFormComponent],
  providers: [provideHttpClient(withInterceptors([tokenInterceptor]))],
})
export class ResetPasswordFormModule {}
