export class CenGereralForm {

  org_type: string;
  ayush_sys: string;
  org_name: string;
  pat_stay_overnight: boolean;
  build_name: string;
  address: string;
  street: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  nearby_landmark: string;

  org_website: string;
  no_beds: string;
  total_op_bed_strength: string
  landline: string;
  spoc_name: string;
  spoc_mob: string;
  spoc_desig: string;
  spoc_email: string;

  cert_officer_same_as_spoc: boolean;
  cert_officer_salutation: string;
  cert_officer_name: string;
  cert_officer_no: string;
  cert_officer_desig: string;
  cert_officer_email: string;


  org_head_same_as_spoc: boolean;
  org_head_salutation: string;
  org_head_name: string;
  org_head_no: string;
  org_head_desig: string;
  org_head_email: string;

  does_org_hv_split_loc: boolean;
  split_loc_nos: number;

  splitLocation = new Array<CenterSplitLocation>();

  est_date: string;
  is_org_reg: string;
  under_which_org_reg: string;
  mention_name_body_reg: string;
  reg_no: string;
  date_of_reg_cert: Date;
  exp_date: Date;
  upload_reg: string;
  month_year_setup: Date;
  ownership_type: string;
  mention_ownership_type: string;
  schemes_org_already_empanalled: string;
  other_schemes: string



}



//new class
export class CenterGeneralinfoSection {
  basicCertification = new CenterBasicCertification();
  generalInfo = new CenterGeneralInfo();
  organizationInformation = new CenterOrganizationInformation();
}


export class CenterBasicCertification {
  organization_type: string;
  ayush_system: string;
}

export class CenterOrganizationhead {
  org_head_same_as_spoc: boolean;
  spoc_name: string;
  salutation: string;
  spoc_mob: string;
  spoc_desig: string;
  spoc_email: string;
}
// export class CenterCertificatoncordinatr {
//   coord_name: string;
//   coord_mob: string;
//   coord_desig: string;
//   coord_email: string;
// }

export class CenterSplitLocation {
  id: number;
  split_build_name: string;
  split_state: string;
  split_district: number;
  split_city: string;
  split_address: string;
  split_pincode: string;
  name_spoc_loc: string;
  mob_spoc_loc: string;
  email_spoc_loc: string;
  dist_frm_main_loc: string;
  district_list:CentralDistrict=new CentralDistrict()
}
class CentralDistrict {
  id: number;
  districtname: string;
  statecode: string;
  gstcode: string;
}

export class CenterLocation {
  latitude: string;
  longitude: string;
  location_of_organization: string;
  does_org_hv_split_loc: boolean;
  split_loc_nos: number;
  splitLocation = new Array<CenterSplitLocation>();
}

export class CenterGeneralInfo {
  org_name: string;
  pat_stay_overnight: boolean;
  build_name: string;
  address: string;
  street: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  nearby_landmark: string;
  org_website: string;
  total_sanctioned_beds: string;
  total_operational_beds: string;
  no_beds: string;
  landline: string;
  spoc_name: string;
  spoc_mob: string;
  spoc_designtion: string;
  spoc_email: string;
  organizationhead = new CenterOrganizationhead();
  // certificatoncordinatr = new CenterCertificatoncordinatr();
  location = new CenterLocation();
}

export class CenterOrganizationIsAlreadyEmpanelledWith {
  cghs: boolean;
  cghs_url: string;
  railways: boolean;
  railways_url: string;
  ayushmanbharat: boolean;
  ayushmanbharat_url: string;
  publichealthinsuranceschemes: boolean;
  publichealthinsuranceschemes_url: string;
  echs: boolean;
  echs_url: string;
  stategovernmenthealthscheme: boolean;
  stategovernmenthealthscheme_url: string;
  others: boolean;
  others_url: string;
  other_scheme_organization_is_linked: string;
  mentionothertypeofschemes_url: string;
  none: boolean;
}

export class CenterOrganizationInformation {
  establishment_date_of_org: string;
  organization_ownership_type: string;
  id: number;
  type: string;
  mention_ownership_type: string;
  mention_other_scheme_orgztn_linked: string;
  month_year_setup: string;
  organization_ownership_type_url: string;
  organization_is_already_empanelled_with = new CenterOrganizationIsAlreadyEmpanelledWith();
}


export class CenterGeneralinfoSectionQuestionBank {
  type_of_organization = new QuestionBankProperty();
  ayush_systems_provided_by_the_organization = new QuestionBankProperty();

  name_of_the_organization = new QuestionBankProperty();
  do_patients_stay_overnight = new QuestionBankProperty();

  name_of_the_building = new QuestionBankProperty();
  address = new QuestionBankProperty();
  street = new QuestionBankProperty();
  state = new QuestionBankProperty();

  district = new QuestionBankProperty();
  city = new QuestionBankProperty();
  pin_code = new QuestionBankProperty();
  nearby_landmark = new QuestionBankProperty();

  organization_website = new QuestionBankProperty();
  total_number_of_sanctioned_beds = new QuestionBankProperty();
  total_number_of_operational_beds = new QuestionBankProperty();
  landline_number = new QuestionBankProperty();
  spoc_name = new QuestionBankProperty();
  spoc_mobile_number = new QuestionBankProperty();
  spoc_designation = new QuestionBankProperty();
  spoc_emailid = new QuestionBankProperty();
  latitude = new QuestionBankProperty();
  longitude = new QuestionBankProperty();
  location_of_organization = new QuestionBankProperty();
  organization_have_a_split_location = new QuestionBankProperty();
  split_locations_does_the_organization_have = new QuestionBankProperty();
  date_of_establishment = new QuestionBankProperty();
  month_and_year_of_clinical_service = new QuestionBankProperty();
  organization_ownership_type = new QuestionBankProperty();

  ownership_type = new QuestionBankProperty();
  organization_is_already_empanelled_with = new QuestionBankProperty();
  other_scheme_organization_is_linked_with = new QuestionBankProperty();
}

class QuestionBankProperty {
  ques_stndrd_code: string;
  ques_text: string;
  ques_help_text: string;
}
