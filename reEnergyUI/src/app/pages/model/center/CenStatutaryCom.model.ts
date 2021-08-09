import { cen_QuestionProperty } from './cen_QuestionProperty.model'
import { DateStruct } from '../hospital/SupportService.model';

export class CenStatutaryLicense
{
  
    document_portraying_its_affiliations_and_accreditation: cen_QuestionProperty = new cen_QuestionProperty();
    centre_have_a_certificate_of_incorporation: cen_QuestionProperty = new cen_QuestionProperty();
    centre_comply_to_applicable_statutory_requirements: cen_QuestionProperty = new cen_QuestionProperty();
    registration_license: cen_QuestionProperty = new cen_QuestionProperty();
    registration_license_list = new Array<CentralRegistrationLicense>();

   
    details_of_licience :CentralLicienceDetailsMou[]=[]
    // state_pollution_control_board: cen_QuestionProperty = new cen_QuestionProperty();
    // bio_medical_waste_collecting_agency: cen_QuestionProperty = new cen_QuestionProperty();
    // fire_department_noc: cen_QuestionProperty = new cen_QuestionProperty();
    // sanction_of_lift: cen_QuestionProperty = new cen_QuestionProperty();
    // license_to_store_compressed_gas: cen_QuestionProperty = new cen_QuestionProperty();
    // canteen_food_beverage_license: cen_QuestionProperty = new cen_QuestionProperty();
    // others_license_list = new Array<AddOtherLicense>();
    hospital_hv_mou_wt_bilogical_waste: CentralMouBilogicalWaste=new CentralMouBilogicalWaste();
}
export class CentralRegistrationLicense {
   name_of_lagislation: string;
    other: string;
    name_of_authority: string;
    status: string;
    application_number_renewal: string;
    license_number: string;
    valid_from: string;
    valid_till: string;
    license_url: string;
}
export class CentralMouBilogicalWaste extends cen_QuestionProperty
{
    available :boolean
    agency_name :String
    valid_from:DateStruct
    valid_till :DateStruct
}

export class AddOtherLicense {
    licience_name:string;
    agent_licensing_name: string;
    status: string;
    application_number_renewal: string;
    license_number: string;
    valid_from: string;
    valid_till: string;
    license_url: string;


    
    
}

export class CentralLicienceDetailsMou
{id:number;
    ques_id:number;
    ques_text:string;
    lic_name:String
    isapplicable:String
    lic_detail:CentralLicenseMouDetails
}


export class CentralLicenseMouDetails {

    licience_name:string;
    agent_licensing_name: string;
    status: string;
    application_number_renewal: string;
    license_number: string;
    valid_from: DateStruct;
    valid_till: DateStruct;
    license_url: string;

    
}