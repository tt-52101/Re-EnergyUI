import { StaffDetails, GroupList } from '../hospital/humanResource.model';
import { cen_QuestionProperty } from './cen_QuestionProperty.model';

export class CenHumanResource {


  public group_list: GroupList[] = []

  doctors_along_with_qualification_specialisation: CentralHospDoctorDetailsQuestionProperty = new CentralHospDoctorDetailsQuestionProperty();
  list_of_all_the_nurses: CentralHospStaffDetailsQuestionProperty = new CentralHospStaffDetailsQuestionProperty();
  list_of_paricharika_therapist: CentralHospStaffDetailsQuestionProperty = new CentralHospStaffDetailsQuestionProperty();
  list_of_all_the_paramedic_staff: CentralHospStaffDetailsQuestionProperty = new CentralHospStaffDetailsQuestionProperty();
  administrative_and_support_staff: CentralHospStaffDetailsQuestionProperty = new CentralHospStaffDetailsQuestionProperty();
  doctors_masseurs_and_support_staff: CentralHospStaffDetailsQuestionProperty = new CentralHospStaffDetailsQuestionProperty();
  centre_allotted_specified_jobs_description: cen_QuestionProperty = new cen_QuestionProperty();
  specific_job_and_responsibilities_and_adherence: cen_QuestionProperty = new cen_QuestionProperty();
  manpower_details: cen_QuestionProperty = new cen_QuestionProperty();

}



export class CentralHospDoctorDetailsQuestionProperty extends cen_QuestionProperty {


  doctor_details: StaffDetails[]



}

export class CentralHospStaffDetailsQuestionProperty extends cen_QuestionProperty {
  staff_details: StaffDetails[]



}