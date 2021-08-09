import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { StatComponent } from './stat/stat.component';
import { TransactionComponent } from './transaction/transaction.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StatComponent, TransactionComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    RouterModule
  ],
  exports: [StatComponent, TransactionComponent,RouterModule]
})
export class WidgetModule { }
