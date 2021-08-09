import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormbuilderInfoComponent } from './formbuilder-info/formbuilder-info.component';
import { FormQuestionComponent } from './form-question/form-question.component';
import { FormbuilderSectionComponent } from './formbuilder-section/formbuilder-section.component';
import { FormbuilderResponseComponent } from './formbuilder-response/formbuilder-response.component';
import { FormBuilderHospListComponent } from './form-builder-hosp-list/form-builder-hosp-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'info',
        component: FormbuilderInfoComponent
      },
      {
        path: 'question',
        component: FormQuestionComponent
      },
      {
        path: 'section',
        component: FormbuilderSectionComponent
      },
      {
        path: 'response',
        component: FormbuilderResponseComponent
      },
      {
        path: 'hosplist',
        component: FormBuilderHospListComponent
      },
    ]
  }

]

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class FormBuilderRoutingModule { }
