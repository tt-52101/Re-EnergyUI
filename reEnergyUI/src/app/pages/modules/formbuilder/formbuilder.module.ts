import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderRoutingModule } from './formbuilder-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from 'src/app/core/services/auth.interceptor';
import { ArchwizardModule } from 'angular-archwizard';
import { FormbuilderInfoComponent } from './formbuilder-info/formbuilder-info.component';
import { FormQuestionComponent } from './form-question/form-question.component';
import { FormbuilderSectionComponent } from './formbuilder-section/formbuilder-section.component';
import { FormbuilderResponseComponent } from './formbuilder-response/formbuilder-response.component';
import { FormBuilderHospListComponent } from './form-builder-hosp-list/form-builder-hosp-list.component';


@NgModule({
  declarations: [
    FormbuilderInfoComponent,
    FormQuestionComponent,
    FormbuilderSectionComponent,
    FormbuilderResponseComponent,
    FormBuilderHospListComponent,
  ],


  imports: [
    CommonModule,
    FormBuilderRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ArchwizardModule

  ],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }]
})
export class FormBuilderModule { }
