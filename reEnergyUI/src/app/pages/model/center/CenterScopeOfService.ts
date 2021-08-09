import { cen_QuestionProperty } from './cen_QuestionProperty.model'

export class CenterScopeOfService {

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
  socSiddhaCertification = new ScopeOfShidaCertification();
  sosHomeopathyCert = new SosHomeopathyCert();
  opdSosProvidedDepartments = new SOSprovidedDepartments();
  //ipdSosProvidedDepartments = new SOSprovidedDepartments();


  providePatientvisitedOrganization = new ProvidePatientvisitedOrganization();



  provideAmbulatoryPatientsservice = new ProvideAmbulatoryPatientsservice();

}

export class CenterClinicalServicesOptions {
  service_name: string;
  option: string;
  remark: string;
}

export class ScopeOfAyurvedaCertification {
  fixed_services = new Array<CenterClinicalServicesOptions>();
}

// class CenterAyurvedaKayachikitsaServices {

//   fixed_services = new Array<CenterClinicalServicesOptions>();
//   other_services = new Array<CenterClinicalServicesOptions>();
// }

// class CenterAyurvedaShalakyaTantraServices {

//   fixed_services = new Array<CenterClinicalServicesOptions>();
//   other_services = new Array<CenterClinicalServicesOptions>();
// }
// class CenterAyurvedaKaumarabhrithyaServices {

//   fixed_services = new Array<CenterClinicalServicesOptions>();
//   other_services = new Array<CenterClinicalServicesOptions>();
// }
// class CenterAyurvedaAgadaTantraServices {

//   fixed_services = new Array<CenterClinicalServicesOptions>();
//   other_services = new Array<CenterClinicalServicesOptions>();
// }
// class CenterAyurvedaPrasootiTantraStreerogaServices {

//   fixed_services = new Array<CenterClinicalServicesOptions>();
//   other_services = new Array<CenterClinicalServicesOptions>();
// }
// class CenterAyurvedaShalyaTantraServices {

//   fixed_services = new Array<CenterClinicalServicesOptions>();
//   other_services = new Array<CenterClinicalServicesOptions>();
// }

// class CenterAyurvedaAnuShastraKarmasServices {

//   fixed_services = new Array<CenterClinicalServicesOptions>();
//   other_services = new Array<CenterClinicalServicesOptions>();
// }

class SosHomeopathyCert {
  fixed_services = new Array<CenterClinicalServicesOptions>();
  other_services = new Array<CenterClinicalServicesOptions>();
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


// export class ProvideInpatientCareUnitOrWard {

//   inpatientCareUnitOrWard = new Array<InpatientCareUnitOrWardData>();
// }

class ProvideAmbulatoryPatientsservice {

  floor_plan_urll: string;
  ambulatoryPatientsservices = new Array<CenterAmbulatoryPatientsserviceData>();
}


// export class InpatientCareUnitOrWardData {
//   unit_or_ward_name: string;
//   number_of_beds: string;
//   type_of_care_given: string;
//   floor_or_location: string;
//   floor_plan_url: string;
// }

export class CenterAmbulatoryPatientsserviceData {
  ambulatory_or_patient_name: string;
  average_visits_per_month: string;
  type_of_service: string;
  floor_location: string;
  floor_plan_url: string;
}

class ScopeOfNaturopathyCertification {
  fixed_services = new Array<CenterClinicalServicesOptions>();
  other_sos_service = new Array<CenterClinicalServicesOptions>();
}

class ScopeOfYogaCertification {
  fixed_services = new Array<CenterClinicalServicesOptions>();
  other_sos_service = new Array<CenterClinicalServicesOptions>();
}

class ScopeOfUnaniCertification {
  fixed_services = new Array<CenterClinicalServicesOptions>();
  other_sos_service = new Array<CenterClinicalServicesOptions>();
}

class ScopeOfShidaCertification {
  fixed_services = new Array<CenterClinicalServicesOptions>();
  other_sos_service = new Array<CenterClinicalServicesOptions>();
}

export class CenterScopeOfServiceQuestionBank {

  scope_services_provided_by_the_organization: cen_QuestionProperty = new cen_QuestionProperty();
  lst_sop_per_dept: cen_QuestionProperty = new cen_QuestionProperty();
  number_of_patients_for_last_two_years_visited_opd_and_ipd: cen_QuestionProperty = new cen_QuestionProperty();

  list_of_ambulatory_or_out_patients_units_with_numberof_visits: cen_QuestionProperty = new cen_QuestionProperty();

}