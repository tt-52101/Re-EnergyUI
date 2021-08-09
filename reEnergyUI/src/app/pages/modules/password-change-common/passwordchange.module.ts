import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


import { HttpClientModule } from '@angular/common/http';
import { LaddaModule } from 'angular2-ladda';

import { style } from '@angular/animations';

import { SharedModule } from 'src/app/pages/modules/shared.module';
import { PasswordchangeCommonComponent } from './passwordchangeCommon.component';
import { PasswordChangeRoutingModule } from './passwordchange.routing.module';
@NgModule({
  declarations: [PasswordchangeCommonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    PasswordChangeRoutingModule,
    FormsModule,
    LaddaModule,
    NgbTooltipModule
     
  


  ],
  exports:[NgbDropdownModule]
})
export class PasswordChangeModule { }
