import { GeneralForm, GeneralinfoSectionQuestionBank, GeneralinfoSection } from "./GereralForm.model";
import { BasicCertificationComponent, BasicCertification } from 'src/app/account/auth/basic-certification/basic-Certification.component';
import { User } from 'src/app/core/models/auth.models';
import { SignupComponent, Registraion } from 'src/app/account/auth/signup/signup.component'
import { QualityOfCare } from './QualityOfCare.model';
import { Infection_Control } from './Infection_Control.model';
import { Training } from './Training.model';
import { PatientRecord } from './PatientRecord.model';
import { AdmissionDischarge } from './AdmissionDischarge.model';
import { HumanResourceComponent } from '../../modules/hospital/hospital/pages/human-resource/human-resource.component';
import { HumanResource } from './humanResource.model';
import { SupportService } from './SupportService.model';
import { AdminRecord } from './AdminRecord.model';
import { StatutaryCompliance } from './StatutaryCompliance.model';
import { ScopeOfService, ScopeOfServiceQuestionBank } from './ScopeOfService';


export class HospitalPages {
  id: number;
  hospital_id: number;
  application_no: String;
  saveType: number;
  stage_id: number;
  isFinalSubmit: boolean;
  hosp_progress: number; // rrc
  org_name: string // added for asr by vk
  ref_id: string // added for asr by vk

  state: string // added for asr by vk

  asmt_date: Date // added for asr by vk

  type: string // added for asr by vk
  asr_name: string // added for asr by vk
  senction_bed: string
  sepeciality: string
  status: boolean;
  basicCertInfo = new BasicCertification();
  generalInfo = new GeneralinfoSection();
  userinfo = new User();
  regitrarionInfo = new Registraion();
  quality_care = new QualityOfCare();
  infection_control = new Infection_Control();
  training = new Training();
  patient_record = new PatientRecord();
  admsn_dischrge = new AdmissionDischarge();
  human_resource = new HumanResource();
  support_service = new SupportService();
  admin_record = new AdminRecord();
  statutory_compliance = new StatutaryCompliance();
  scope_of_service = new ScopeOfService();

}
export class HospitalPagesQuestionBank {

  quality_care = new QualityOfCare();
  generalinfo = new GeneralinfoSectionQuestionBank();
  training = new Training();
  infection_control = new Infection_Control();
  patient_record = new PatientRecord();
  admsn_dischrge = new AdmissionDischarge();
  human_resource = new HumanResource();
  support_service = new SupportService();
  admin_record = new AdminRecord();
  statutory_compliance = new StatutaryCompliance();
  scope_of_service = new ScopeOfServiceQuestionBank();


}
