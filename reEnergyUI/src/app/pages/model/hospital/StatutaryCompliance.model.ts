import { QuestionProperty } from './QuestionProperty.model'
import { DateStruct } from './SupportService.model';

export class StatutaryCompliance {

    hospital_adheres_with_the_statutory_requirements: QuestionProperty = new QuestionProperty();
    conducts_its_functioning_as_a_duly_permitted_legal_entity: QuestionProperty = new QuestionProperty();
    regularly_updates_licenses_registrations_certifications: QuestionProperty = new QuestionProperty();
    discloses_the_documents_regarding_the_ownership: QuestionProperty = new QuestionProperty();
    registration_license: QuestionProperty = new QuestionProperty();
    registration_license_list = new Array<RegistrationLicense>();
    
    
    
    details_of_licience :LicienceDetailsMou[]=new Array<LicienceDetailsMou>();
    // license_from_state_pollution_control_board: QuestionProperty = new QuestionProperty(); 
    // bio_medical_waste_collecting_agency: QuestionProperty = new QuestionProperty();
    // pollution_control_board_license_of_water: QuestionProperty = new QuestionProperty();
    // fire_department_noc: QuestionProperty = new QuestionProperty();
    // sanction_of_lift: QuestionProperty = new QuestionProperty();
    // license_to_store_compressed_gas: QuestionProperty = new QuestionProperty();
    // canteen_food_beverage_license: QuestionProperty = new QuestionProperty();

    //others_license_list = new Array<AddOtherLicense>();
    hospital_hv_mou_wt_bilogical_waste: MouBilogicalWaste=new MouBilogicalWaste();

}
export class MouBilogicalWaste extends QuestionProperty
{
    available :boolean
    agency_name :String
    valid_from:DateStruct
    valid_till :DateStruct
}
export class LicienceDetailsMou
{
   id:number
    lic_name:String
    ques_id:number
    ques_text:String
    isapplicable:String
    lic_detail:LicenseMouDetails
}
export class RegistrationLicense {
    agency_name: string;
    others: string;
    status: string;
    application_number_renewal: string;
    license_number: string;
    valid_from: string;
    valid_till: string;
    license_url: string;
}

export class LicenseMouDetails {
  licience_name:string;
    agent_licensing_name: string;
    status: string;
    application_number_renewal: string;
    license_number: string;
    valid_from: DateStruct;
    valid_till: DateStruct;
    license_url: string;

    
}