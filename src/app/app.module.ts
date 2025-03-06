import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  SideNavInnerToolbarModule,
  SideNavOuterToolbarComponent,
  SideNavOuterToolbarModule,
  SingleCardModule,
} from './layouts';
import { FooterModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { DxFormModule } from 'devextreme-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './shared/services/token.interceptor';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.module';
import { ShareModule } from './shared/share.module';
import { HeaderModule } from './shared/components/header/header.component';

@NgModule({
  declarations: [AppComponent],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
  bootstrap: [AppComponent],
  imports: [
    PagesModule,
    BrowserModule,
    SingleCardModule,
    FooterModule,
    // ResetPasswordFormModule,
    // CreateAccountFormModule,
    // ChangePasswordFormModule,
    ShareModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    // DxButtonModule,
    // DxSelectBoxModule,
    // DxTextAreaModule,
    DxFormModule,
    // DxTooltipModule,
    // DxDateBoxModule,
    // DxTextBoxModule,
    // DxValidatorModule,
    // DxDropDownBoxModule,
    // DxListModule,
    // DxToastModule,
    // ReactiveFormsModule,
    CommonModule,
    HeaderModule,
  ],
})
export class AppModule {}
