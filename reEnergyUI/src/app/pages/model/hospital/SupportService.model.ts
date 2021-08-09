import { QuestionProperty } from './QuestionProperty.model';
import { StaffDetailsQuestionProperty } from './humanResource.model';

export class SupportService
{
      non_clinical_and_administrative_departments_of_the_organization:NonClinicalServiceList=new NonClinicalServiceList()
        hospital_provide_emergency_services:QuestionProperty=new QuestionProperty()
        condition_of_patient_in_his_her_admission_discharge_transfer:QuestionProperty=new QuestionProperty()
        established_procedure_to_inform_police_in_mlc_cases :QuestionProperty=new QuestionProperty()
        emergency_cases_in_line_with_the_statutory_requirements :QuestionProperty=new QuestionProperty()
         hospital_have_laboratory_services :QuestionPropertySupportServc=new QuestionPropertySupportServc();
         mou_for_out_sourced_laboratory_service :MouOutsourcedQuestionProperty=new MouOutsourcedQuestionProperty();
         service_list    :LaboratoryService[]=[]    
         hospital_list_out_the_outsourced_laboratory_tests :QuestionPropertySupportServc=new QuestionPropertySupportServc();
          hospital_hold_a_mou_with_party_for_outsourced_lab_tests :QuestionPropertySupportServc=new QuestionPropertySupportServc();
         commensurating_to_the_services_provided_by_the_hospital :QuestionProperty=new QuestionProperty();
         follow_the_policy_sop_manual_for_the_identification :QuestionProperty=new QuestionProperty();
         lab_technicians_qualified_to_perform_supervise_and_interpret :QuestionProperty=new QuestionProperty();
         lab_technisian_list :StaffDetailsQuestionProperty=new StaffDetailsQuestionProperty();
         hospital_defined_turn_around_time_for_all_laboratory_tests :QuestionProperty=new QuestionProperty();
         hospital_defined_biological_reference_interval_different_tests :QuestionProperty=new QuestionProperty();
         hospital_defined_the_critical_limits_for_different_tests :QuestionProperty=new QuestionProperty();
        critical_test_results_communicated_concerned_personnel_documented:QuestionProperty =new QuestionProperty();
        laboratory_staffs_properly_trained_in_safe_practices :QuestionProperty=new QuestionProperty();
        hospital_has_imaging_services :QuestionPropertySupportServc=new QuestionPropertySupportServc();
        hospital_procure_pc_pndt_act_certificate :MouOutsourcedQuestionProperty=new MouOutsourcedQuestionProperty();
        upload_mou_for_out_sourced_imaging_service:MouOutsourcedQuestionProperty =new MouOutsourcedQuestionProperty();
       imaging_service_list :ImgdiagnosticService[]=[]
       hospital_hold_a_mou_with_party_for_outsourced_imaging_tests :QuestionPropertySupportServc=new QuestionPropertySupportServc()  
       hospital_have_the_imaging_services_commensurating :QuestionProperty=new QuestionProperty();
       hospital_according_to_aerb_pcpndt_guidelines :ImagesSignasesDiaplay=new ImagesSignasesDiaplay();
       qualified_to_perform_supervise_and_interpret_investigations :QuestionProperty=new QuestionProperty();
      list_of_all_imaging_technicians :StaffDetailsQuestionProperty=new StaffDetailsQuestionProperty();
      hospital_defined_turn_around_time_for_all_imaging_services :QuestionProperty=new QuestionProperty();
      the_hospital_defined_the_critical_test_results :QuestionProperty=new QuestionProperty();
      communicated_to_the_concerned_personnel :QuestionProperty=new QuestionProperty();
      the_imaging_and_ancillary_staff_properly_trained :QuestionProperty=new QuestionProperty();
    
      hospital_have_ambulance_services :QuestionPropertySupportServc=new QuestionPropertySupportServc();
     number_of_ambulance :QuestionPropertySupportServc=new QuestionPropertySupportServc();
     
      daily_check_list_of_ambulance :DailyCheckAmbulance=new DailyCheckAmbulance();
      upload_mou_for_out_sourced_ambulance_service :MouOutsourcedQuestionProperty=new MouOutsourcedQuestionProperty();
      ambulance_appropriately_equipped_have_basic_life_support:QuestionProperty =new QuestionProperty();
      concerned_personnel_trained_basic_cardiopulmonary_resuscitation :QuestionProperty=new QuestionProperty();
      hospital_have_laundry_and_lenin_services :QuestionPropertySupportServc=new QuestionPropertySupportServc();
      hospital_have_laundry_and_linen_management :QuestionProperty=new QuestionProperty();
      hospital_policy_defines_change_of_different_categories_of_linen :QuestionProperty=new QuestionProperty();
      hospital_has_pharmacy_medical_store_facility :QuestionProperty=new QuestionProperty();
      pharmacy_licence:PharmacyLicience=new PharmacyLicience();
      pharmacy_service_list:PharmacyService[]=[];
       documented_procedure_to_procure_licensed_medicines :QuestionProperty=new QuestionProperty();
       control_of_exposure_to_light_humidity_ventilation_preventing :QuestionProperty=new QuestionProperty();
       hospital_identify_look_alike_and_sound_alike_medicines :QuestionProperty=new QuestionProperty();
       hospital_has_separate_and_alphabet_wise_storage_system :QuestionProperty=new QuestionProperty();
       hospital_define_what_constitutes_near_expiry_medication :QuestionProperty=new QuestionProperty();
       store_near_expired_expired_drugs_with_non_expired_drugs :QuestionProperty=new QuestionProperty();
       hospital_follow_a_procedure_to_withdraw_near_expiry_drugs :QuestionProperty=new QuestionProperty();
       hospital_define_the_list_of_emergency_medications :QuestionProperty=new QuestionProperty();
       the_hospital_stocks_emergency_medicines :QuestionProperty=new QuestionProperty();
       timely_replenishment_of_emergency_medicines :QuestionProperty=new QuestionProperty();
       hospital_have_clear_policies_to_be_laid_down_for_dispensing :QuestionProperty=new QuestionProperty();    
       the_hospital_ensures_that_the_High_risk_medications :QuestionProperty=new QuestionProperty();
       medications_asu_drugs_containing_schedule_e_ingredients :QuestionProperty=new QuestionProperty();
       hospital_have_a_defined_procedure_to_proceed_with_verbal_orders :QuestionProperty=new QuestionProperty();
       procedure_specifies_the_personnel_who_can_place :QuestionProperty=new QuestionProperty();
       hospital_specify_situations_in_which_verbal_orders_can_be_given :QuestionProperty=new QuestionProperty();
       the_procedure_ensures_the_practice_of_repeat :QuestionProperty=new QuestionProperty();
       hospital_ensures_that_the_ayush_doctors_countersigns_the_order :QuestionProperty=new QuestionProperty();
       hospital_declaration :QuestionProperty=new QuestionProperty();
       hosp_assure_qty_outsrc_img_srvc:QuestionPropertySupportServc=new QuestionPropertySupportServc();
    
}

export class MouOutsourcedQuestionProperty extends QuestionProperty
{

  available :boolean
      agency_name :String
      valid_from:DateStruct
      valid_till :DateStruct


}
 class ServiceList
{
      service:String
      inhouse :boolean
      outsource:boolean
      serves_other_org :boolean
}

// export class ImgDiagnosticService extends ServiceList
// {
      
//       diagnostic_servc_mou_lic_details:MouOutsourcedSlctedSrvcs=new MouOutsourcedSlctedSrvcs();
//       //diagnostic_servc_aerb_lic_details:AerbOutsourcedSlctedSrvcs=new AerbOutsourcedSlctedSrvcs();
// }

export class ImgdiagnosticService extends ServiceList
{

      dishnosticservc_mou_lic_details:MouOutsourcedSlctedSrvcs=new MouOutsourcedSlctedSrvcs();
      dishnosticservc_aerb_lic_details:AerbOutsourcedSlctedSrvcs=new AerbOutsourcedSlctedSrvcs();
}
export class LaboratoryService extends ServiceList
{

     labservc_mou_lic_details:MouOutsourcedSlctedSrvcs=new MouOutsourcedSlctedSrvcs();
}
export class PharmacyService extends ServiceList
{

     pharmacyservc_mou_lic_details:MouOutsourcedSlctedSrvcs=new MouOutsourcedSlctedSrvcs();
}
 export class MouOutsourcedSlctedSrvcs
{
 agent_name :string
available :boolean
valid_from :DateStruct
valid_till :DateStruct
license_url :string
}
export class AerbOutsourcedSlctedSrvcs
{
      
      agent_name :string
status :string
application_no :string
lic_no :string
valid_from :DateStruct
valid_till :DateStruct
license_url :string

}

export  class QuestionPropertySupportServc
{
    ques_stndrd_code :string
     ques_text  :string
    ques_help_text  :string
     ques_selected_opt  :string
     ques_doc_url  :string
     old_ques_histry_opt  :string
    old_ques_doc_url  :string
      ques_text_value:string
}
export class PharmacyLicience extends QuestionProperty
{
    valid :boolean
    pharmacy_lic_url :string
 valid_from:DateStruct
     valid_till :DateStruct
     licience_no :string
     status :string
     appln_no_renewal_appln :string
 

}
export class NonClinicalServiceList extends QuestionProperty
{
      non_clinicalsrvc:NonClinicalService[]=[]
}
export class NonClinicalService
{
      service :string
      inhouse :boolean
       outsource  :boolean
       not_applicable :boolean
}
export    class DailyCheckAmbulance extends QuestionProperty
{
      document_url:string

}
export class DateStruct
{
      year:number;
      month:number;
      day:number
}
export class ImagesSignasesDiaplay extends QuestionProperty
{
      doc_url_1:string
      doc_url_2:string
      doc_url_3:string
}