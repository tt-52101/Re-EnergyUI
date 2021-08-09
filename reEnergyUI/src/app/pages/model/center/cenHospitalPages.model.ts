
import { BasicCertificationComponent, BasicCertification } from 'src/app/account/auth/basic-certification/basic-Certification.component';
import { User } from 'src/app/core/models/auth.models';
import { SignupComponent, Registraion } from 'src/app/account/auth/signup/signup.component'
import { CenInfectionControl } from './CenInfectionControl.model';
import { CenTraining } from './CenTraining.model';
import { CenAdminRecord } from './CenAdminRecord.model';
import { CenQualityCare } from './CenQualityCare.model';
import { CenOpdRegisProcess } from './CenOpdRegisProcess.model';
import { CenPatientRecord } from './CenPatientRecord.model ';
import { CenHumanResource } from './CenHumanResource.model';
import { CenStatutaryLicense } from './CenStatutaryCom.model';
import { CenSupportService } from './CenSupportService.model';
import { CenterScopeOfService, CenterScopeOfServiceQuestionBank } from './CenterScopeOfService';
import { CenterBasicCertification, CenterGeneralinfoSection, CenterGeneralinfoSectionQuestionBank } from './CenGereralForm.model';

export class cenHospitalPages {
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
  basicCertInfo = new CenterBasicCertification();
  generalInfo = new CenterGeneralinfoSection();
  ceninfectioncontrol = new CenInfectionControl();
  centraining = new CenTraining();
  cenadminrecord = new CenAdminRecord();
  cenqualitycare = new CenQualityCare();
  cenopdregispro = new CenOpdRegisProcess();
  cenpatientrecord = new CenPatientRecord();
  cenhumanresource = new CenHumanResource();
  censtatutarylicense = new CenStatutaryLicense();
  censupportservice = new CenSupportService();
  scope_of_service = new CenterScopeOfService();

}
export class cenHospitalPagesQuestionBank {
  generalinfo = new CenterGeneralinfoSectionQuestionBank();
  ceninfectioncontrol = new CenInfectionControl();
  centraining = new CenTraining();
  cenadminrecord = new CenAdminRecord();
  cenqualitycare = new CenQualityCare();
  cenopdregispro = new CenOpdRegisProcess();
  cenpatientrecord = new CenPatientRecord();
  cenhumanresource = new CenHumanResource();
  censtatutarylicense = new CenStatutaryLicense();
  censupportservice = new CenSupportService();
  scope_of_service = new CenterScopeOfServiceQuestionBank();
}
