import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CometteeRoutingModule } from './comettee-routing.module';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from 'src/app/core/services/auth.interceptor';

import { SharedModule } from '../shared.module';

import { ArchwizardModule } from 'angular-archwizard';

import { NgbDateFormatPipe } from 'src/app/custompipes/ngb-date-format.pipe';

import { NgSelectModule } from '@ng-select/ng-select';
import { activateTabIndex } from 'src/app/custompipes/ActiveTabIndex.pipe';



import { LaddaModule } from 'angular2-ladda';
import { CCDecisionComponent } from './decision/decision.component';
import { GenralformComponent } from '../hospital/hospital/pages/genralform/genralform.component';
import { QualityOfCareComponent } from '../hospital/hospital/pages/qualityofcare/quality-of-care.component';
import { TrainingComponent } from '../hospital/hospital/pages/training/training.component';
import { PatientrecordComponent } from '../hospital/hospital/pages/patientrecord/patientrecord.component';
import { InfectionControlComponent } from '../hospital/hospital/pages/infection-control/infection-control.component';
import { AdmissionDischargeComponent } from '../hospital/hospital/pages/admission-discharge/admission-discharge.component';
import { HumanResourceComponent } from '../hospital/hospital/pages/human-resource/human-resource.component';
import { SupportServiceComponent } from '../hospital/hospital/pages/support-service/support-service.component';
import { AdminrecordComponent } from '../hospital/hospital/pages/adminrecord/adminrecord.component';
import { StatutaryComplianceComponent } from '../hospital/hospital/pages/statutary-compliance/statutary-compliance.component';
import { ScopeOfServiceComponent } from '../hospital/hospital/pages/scope-of-service/scope-of-service.component';
import { HospitalComponent } from '../hospital/hospital/hospital.component';

//import { LaddaModule } from 'angular2-ladda';



@NgModule({
  declarations: [

    CCDecisionComponent,
    // CentralComponent,
    // GenralformComponent,
    // QualityOfCareComponent,
    // TrainingComponent,
    // PatientrecordComponent,
    // InfectionControlComponent,
    // AdmissionDischargeComponent,
    // HumanResourceComponent,
    // SupportServiceComponent,
    // AdminrecordComponent,
    // StatutaryComplianceComponent,
    // ScopeOfServiceComponent,
    // HospitalComponent,
    // CenInfectionControlComponent,
    // CenTrainingComponent,
    // CenAdminrecordComponent, CenQualitycareComponent, CenOpdregisprocessComponent, CenHumanresourceComponent,
    // CenPatientrecordComponent, CenStattutarycomplianceComponent, CenSupportServiceComponent, CenScopeOfServiceComponent,
    // CenGeneralInfoComponent, PaymentComponent, PaymentDetailsComponent, GuidelinesComponent,
    // activateTabIndex,
    //  OAFeedbackComponent,
    // 

  ],


  imports: [
    CommonModule,
    CometteeRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ArchwizardModule,
    NgbDropdownModule,
    NgSelectModule,
    LaddaModule

  ],
  exports: [CCDecisionComponent],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }]
})
export class CometteeModule { }
