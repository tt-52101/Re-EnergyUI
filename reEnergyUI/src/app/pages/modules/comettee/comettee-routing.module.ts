import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CCDecisionComponent } from './decision/decision.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '/ccdeci',
        component: CCDecisionComponent
      },
      // {
      //   path: 'centerHospitalapplication',
      //   component: CentralComponent
      // },

    ]
  }

]

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class CometteeRoutingModule { }
