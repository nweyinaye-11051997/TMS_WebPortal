import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
} from './layouts';
import {
  FooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { AddTaskComponent } from './pages/tasks/add-task/add-task.component';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxFormComponent,
  DxFormModule,
  DxListModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxToastModule,
  DxTooltipModule,
  DxValidatorModule,
} from 'devextreme-angular';
import dxDropDownBox from 'devextreme/ui/drop_down_box';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './shared/services/token.interceptor';

@NgModule({
  declarations: [AppComponent, AddTaskComponent],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxTooltipModule,
    DxDateBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxDropDownBoxModule,
    DxListModule,
    DxToastModule,
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
