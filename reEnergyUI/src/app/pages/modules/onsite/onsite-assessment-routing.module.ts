import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OnsiteAssessmentComponent } from './pages/onsite-assessment/onsite-assessment.component';


const routes: Routes = [

  {
    path: "",
    children: [
      {
        path: "assessmentDataFromMobile",
        component: OnsiteAssessmentComponent,
        pathMatch: 'full'

      }

    ]
  }

]
@NgModule({

  imports: [
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})
export class OnsiteAssessmentRoutingModule {



}
