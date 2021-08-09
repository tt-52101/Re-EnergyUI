import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDropdownModule, NgbPopover, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { HttpClientModule } from '@angular/common/http';
import { BasicCertificationComponent } from './basic-certification/basic-Certification.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LaddaModule } from 'angular2-ladda';

import { style } from '@angular/animations';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { SharedModule } from 'src/app/pages/modules/shared.module';
@NgModule({
  declarations: [LoginComponent, SignupComponent, PasswordresetComponent, BasicCertificationComponent, PasswordchangeComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    FormsModule,
    NgbDropdownModule,
    NgSelectModule,
    LaddaModule,
    NgbTooltipModule,
    NgbPopoverModule




  ],
  exports: [NgbDropdownModule]
})
export class AuthModule { }
