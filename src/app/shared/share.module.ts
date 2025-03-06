import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DxFormModule,
  DxLoadIndicatorModule,
  DxToastModule,
  DxValidatorModule,
  DxTextBoxModule,
  DxValidationSummaryModule,
  DxDrawerModule,
  DxToolbarModule,
  DxScrollViewModule,
  DxTreeViewModule,
} from 'devextreme-angular';
import {
  HeaderModule,
  LoginFormComponent,
  SideNavigationMenuComponent,
} from './components';
import { SideNavInnerToolbarComponent } from '../layouts';

@NgModule({
  declarations: [LoginFormComponent],
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
    DxDrawerModule,
    DxToolbarModule,
    HeaderModule,
    DxScrollViewModule,
    DxTreeViewModule,
  ],
})
export class ShareModule {}
