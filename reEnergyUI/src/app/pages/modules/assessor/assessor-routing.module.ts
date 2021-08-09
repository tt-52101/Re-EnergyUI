import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AsrcalenderComponent } from './asrcalender/asrcalender.component';
import { DaOaAllocatedHospComponent } from './da-allocation/da-oa-allocated-hosp.component';
import { HospitalComponent } from '../hospital/hospital/hospital.component';
import { CentralComponent } from '../hospital/central/central.component';
import { DaAllocatedHospComponent } from './da-allocations/da-allocated-hosp.component';

const route: Routes = [
  {
    path: '',
    children: [
      {
        path: 'asrcalender',
        component: AsrcalenderComponent
      },
      {
        path: 'assessmentallocated',
        component: DaOaAllocatedHospComponent
      },
      {
        path: 'dAallocated',
        component: DaAllocatedHospComponent
      },
      // {
      //   path: 'hospitalapplication',
      //   component: HospitalComponent
      // },
      // {
      //   path: 'centerHospitalapplication',
      //   component: CentralComponent
      // },

    ]
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports: [RouterModule]
})
export class AssessorRoutingModule { }
