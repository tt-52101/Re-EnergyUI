import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalComponent } from './hospital/hospital.component';
import { CentralComponent } from './central/central.component';
import { GenralformComponent } from './hospital/pages/genralform/genralform.component';
import { HospitalRoutingModule } from './hospital-routing.module';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from 'src/app/core/services/auth.interceptor';
import { QualityOfCareComponent } from './hospital/pages/qualityofcare/quality-of-care.component';
import { InfectionControlComponent } from './hospital/pages/infection-control/infection-control.component';
import { SharedModule } from '../shared.module';
import { TrainingComponent } from './hospital/pages/training/training.component';
import { PatientrecordComponent } from './hospital/pages/patientrecord/patientrecord.component';
import { AdmissionDischargeComponent } from './hospital/pages/admission-discharge/admission-discharge.component';
import { HumanResourceComponent } from './hospital/pages/human-resource/human-resource.component';
import { AdminrecordComponent } from './hospital/pages/adminrecord/adminrecord.component';
import { StatutaryComplianceComponent } from './hospital/pages/statutary-compliance/statutary-compliance.component';
import { ArchwizardModule } from 'angular-archwizard';
import { SupportServiceComponent } from './hospital/pages/support-service/support-service.component';
import { CenInfectionControlComponent } from './central/cen_pages/cen-infection-control/cen-infection-control.component';
import { CenTrainingComponent } from './central/cen_pages/cen-training/cen-training.component';
import { CenAdminrecordComponent } from './central/cen_pages/cen-adminrecord/cen-adminrecord.component';
import { ScopeOfServiceComponent } from './hospital/pages/scope-of-service/scope-of-service.component';
import { CenQualitycareComponent } from './central/cen_pages/cen-qualitycare/cen-qualitycare.component';
import { CenOpdregisprocessComponent } from './central/cen_pages/cen-opdregisprocess/cen-opdregisprocess.component';
import { CenHumanresourceComponent } from './central/cen_pages/cen-humanresource/cen-humanresource.component';
import { CenPatientrecordComponent } from './central/cen_pages/cen-patientrecord/cen-patientrecord.component';
import { CenStattutarycomplianceComponent } from './central/cen_pages/cen-stattutarycompliance/cen-stattutarycompliance.component';
import { CenSupportServiceComponent } from './central/cen_pages/cen-support-service/cen-support-service.component';
import { CenScopeOfServiceComponent } from './central/cen_pages/cen-scope-of-service/cen-scope-of-service.component';
import { CenGeneralInfoComponent } from './central/cen_pages/cen-general-info/cen-general-info.component';
import { NgbDateFormatPipe } from 'src/app/custompipes/ngb-date-format.pipe';
import { PaymentComponent } from './payment/payment.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { activateTabIndex } from 'src/app/custompipes/ActiveTabIndex.pipe';
import { PaymentDetailsComponent } from './paymentDetails/paymentdetails.component'; // rrc
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { OAFeedbackComponent } from './oa-feedback/oa-feedback.component';
import { LaddaModule } from 'angular2-ladda';
import { CustomersComponent } from './customers/customers.component';
import { ServicesComponent } from './services/services.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';

//import { LaddaModule } from 'angular2-ladda';



@NgModule({
  declarations: [

    HospitalComponent,
    CentralComponent,
    GenralformComponent,
    QualityOfCareComponent,
    TrainingComponent,
    PatientrecordComponent,
    InfectionControlComponent,
    AdmissionDischargeComponent,
    HumanResourceComponent,
    SupportServiceComponent,
    AdminrecordComponent,
    StatutaryComplianceComponent,
    ScopeOfServiceComponent,
    CenInfectionControlComponent,
    CenTrainingComponent,
    CenAdminrecordComponent, CenQualitycareComponent, CenOpdregisprocessComponent, CenHumanresourceComponent,
    CenPatientrecordComponent, CenStattutarycomplianceComponent, CenSupportServiceComponent, CenScopeOfServiceComponent,
    CenGeneralInfoComponent, PaymentComponent, PaymentDetailsComponent, GuidelinesComponent,
    activateTabIndex, OAFeedbackComponent, CustomersComponent, ServicesComponent, VerifyCodeComponent,
    // 

  ],


  imports: [
    CommonModule,
    HospitalRoutingModule,
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
  exports: [activateTabIndex],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }]
})
export class HospitalModule { }
