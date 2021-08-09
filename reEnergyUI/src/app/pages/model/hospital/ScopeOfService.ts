import { QuestionProperty } from './QuestionProperty.model'

export class ScopeOfService {

  constructor() {

  }

  isAyurveda: boolean
  isYoga: boolean
  isNaturopathy: boolean
  isUnani: boolean
  isSiddha: boolean
  isHomeopathy: boolean

  scopeOfAyurvedaCertification = new ScopeOfAyurvedaCertification();
  scopeOfNaturopathyCertification = new ScopeOfNaturopathyCertification();
  scopeOfYogaCertification = new ScopeOfYogaCertification();
  scopeOfUnaniCertification = new ScopeOfUnaniCertification();
  // socYogaCert = new Array<ClinicalServicesOptions>();
  // socNaturopathyCert = new Array<ClinicalServicesOptions>();
  // socUnaniCert = new Array<ClinicalServicesOptions>();
  socSiddhaCert = new Array<ClinicalServicesOptions>();
  sosHomeopathyCert = new SosHomeopathyCert();
  opdSosProvidedDepartments = new SOSprovidedDepartments();
  ipdSosProvidedDepartments = new SOSprovidedDepartments();


  providePatientvisitedOrganization = new ProvidePatientvisitedOrganization();

  provideInpatientCareUnitOrWard = new ProvideInpatientCareUnitOrWard();

  provideAmbulatoryPatientsservice = new ProvideAmbulatoryPatientsservice();

}

export class ClinicalServicesOptions {
  service_name: string;
  option: string;
  remark: string;
}

export class ScopeOfAyurvedaCertification {

  socAyurvedaCert = new Array<ClinicalServicesOptions>();
  other_sos_service = new Array<ClinicalServicesOptions>();
  // ayurvedaClinicalServices = new AyurvedaClinicalServices();
}

// class AyurvedaClinicalServices {
//   ayurveda_clinical_services = new Array<ClinicalServicesOptions>();
//   panchakarma_therapies = new PanchakarmaTherapies();
//   other_sos_service = new Array<ClinicalServicesOptions>();
// }

// export class PanchakarmaTherapies {
//   poorvakarma = new Array<ClinicalServicesOptions>();
//   pradhanakarma = new Array<ClinicalServicesOptions>();
//   paschatkarma = new Array<ClinicalServicesOptions>();
// }


class SosHomeopathyCert {
  socHomeoCert = new Array<ClinicalServicesOptions>();
  // sochomeoSpecialCert = new Array<ClinicalServicesOptions>();
}

export class SOSprovidedDepartments {
  dept_url: string;
}


export class ProvidePatientvisitedOrganization {
  opdData = new SosIPDData();
  ipdData = new SosIPDData();
}

class SosIPDData {
  year: string;
  no_of_patients: string;
  year1: string;
  no_of_patients1: string;
}


export class ProvideInpatientCareUnitOrWard {
  floor_plan_urll: string;
  inpatientCareUnitOrWard = new Array<InpatientCareUnitOrWardData>();
}

class ProvideAmbulatoryPatientsservice {
  ambulatoryPatientsservices = new Array<AmbulatoryPatientsserviceData>();
}


export class InpatientCareUnitOrWardData {
  unit_or_ward_name: string;
  number_of_beds: string;
  type_of_care_given: string;
  floor_or_location: string;
  floor_plan_url: string;
}

export class AmbulatoryPatientsserviceData {
  ambulatory_or_patient_name: string;
  average_visits_per_month: string;
  type_of_service: string;
}

class ScopeOfNaturopathyCertification {
  socNaturopathyCert = new Array<ClinicalServicesOptions>();
  other_sos_service = new Array<ClinicalServicesOptions>();
}

class ScopeOfYogaCertification {
  socYogaCert = new Array<ClinicalServicesOptions>();
  other_sos_service = new Array<ClinicalServicesOptions>();
}

class ScopeOfUnaniCertification {
  socUnaniCert = new Array<ClinicalServicesOptions>();
  other_sos_service = new Array<ClinicalServicesOptions>();
}


export class ScopeOfServiceQuestionBank {

  scope_services_provided_by_the_organization: QuestionBankProperty = new QuestionBankProperty();
  sos_opd: QuestionBankProperty = new QuestionBankProperty();
  sos_ipd: QuestionBankProperty = new QuestionBankProperty();
  number_of_patients_for_last_two_years_visited_opd_and_ipd: QuestionBankProperty = new QuestionBankProperty();
  opd_data: QuestionBankProperty = new QuestionBankProperty();
  ipd_data: QuestionBankProperty = new QuestionBankProperty();
  list_of_Inpatient_care_units_or_wards_number_type_of_care: QuestionBankProperty = new QuestionBankProperty();
  list_of_ambulatory_or_out_patients_units_with_numberof_visits: QuestionBankProperty = new QuestionBankProperty();
  lst_sop_per_dept: QuestionBankProperty = new QuestionBankProperty();



}
class QuestionBankProperty {
  ques_id: number
  ques_stndrd_code: string
  ques_text: string
  ques_help_text: string
}