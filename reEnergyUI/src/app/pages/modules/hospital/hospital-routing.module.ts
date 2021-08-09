import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalComponent } from './hospital/hospital.component';
import { CentralComponent } from './central/central.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentDetailsComponent } from './paymentDetails/paymentdetails.component'; // rrc
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { OAFeedbackComponent } from './oa-feedback/oa-feedback.component';
import { CustomersComponent } from './customers/customers.component';
import { ServicesComponent } from './services/services.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'hospitalapplication',
        component: HospitalComponent
      },
      {
        path: 'customer',
        component: CustomersComponent
      },
      {
        path: 'service',
        component: ServicesComponent
      },
      {
        path: 'verify',
        component: VerifyCodeComponent
      },
      {
        path: 'centerHospitalapplication',
        component: CentralComponent
      },
      {
        path: 'applicationFee',
        component: PaymentComponent
      },
      {
        path: 'paymentdetail',
        component: PaymentDetailsComponent
      },
      {
        path: 'guidelines',
        component: GuidelinesComponent
      },
      {
        path: 'oafeedback',
        component: OAFeedbackComponent
      },
      {
        path: 'assets/NABH_AYUSH_Entry_Level_Guidebook.pdf',
        redirectTo: '/assets/NABH_AYUSH_Entry_Level_Guidebook.pdf'
      }
    ]
  }

]

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class HospitalRoutingModule { }
