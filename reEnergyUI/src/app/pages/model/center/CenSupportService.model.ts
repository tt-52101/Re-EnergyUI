import { cen_QuestionProperty } from './cen_QuestionProperty.model'
import { DateStruct } from '../hospital/SupportService.model'
import { StaffDetails, StaffDetailsQuestionProperty } from '../hospital/humanResource.model'

export class CenSupportService
{


    list_of_non_clinical_and_administrative_departments:SupportServiceList=new SupportServiceList();
    list_of_paramedical_allied_services:ParamedicalServiceList=new ParamedicalServiceList();
      centre_has_laboratory_services:QuestionPropertyCentralSupportServc=new QuestionPropertyCentralSupportServc();
      out_sourced_laboratory_test_service:CentralMouOutsourcedQuestionProperty=new CentralMouOutsourcedQuestionProperty();
     laboratory_services:SupportLabServiceList=new SupportLabServiceList();
     testing_and_calibration_laboratories:cen_QuestionProperty=new cen_QuestionProperty();
      centre_provide_laboratory_services_that_commensurate:cen_QuestionProperty=new cen_QuestionProperty();
     safe_transportation_processing_and_disposal:cen_QuestionProperty=new cen_QuestionProperty();

     interpret_the_investigations_and_supervise_them:cen_QuestionProperty=new cen_QuestionProperty();
   lab_technician:StaffDetailsQuestionProperty=new StaffDetailsQuestionProperty();

     centre_prescribes_turn_around_time:cen_QuestionProperty=new cen_QuestionProperty();
     centre_defined_critical_limits_for_different_tests:cen_QuestionProperty=new cen_QuestionProperty();
     procedure_to_intimate_the_concerned_personnels:cen_QuestionProperty=new cen_QuestionProperty();
     centre_maintain_the_quality_control_laboratory:cen_QuestionProperty=new cen_QuestionProperty();
      centre_has_imaging_services:QuestionPropertyCentralSupportServc=new QuestionPropertyCentralSupportServc();
      mou_for_out_sourced_imaging_test_service:CentralMouOutsourcedQuestionProperty=new CentralMouOutsourcedQuestionProperty();
      centre_provide_imaging_services_commensurate:cen_QuestionProperty=new cen_QuestionProperty();
      policy_sop_for_handling_and_disposing:cen_QuestionProperty=new cen_QuestionProperty();

     imaging_service_competent_specifically_qualified:cen_QuestionProperty=new cen_QuestionProperty();
     image_technician:StaffDetailsQuestionProperty=new StaffDetailsQuestionProperty();


     centre_prescribe_the_turn_around_time:cen_QuestionProperty=new cen_QuestionProperty();
     centre_defined_the_critical_test_results:cen_QuestionProperty=new cen_QuestionProperty();
     concerned_personnel_regarding_critical_results:cen_QuestionProperty=new cen_QuestionProperty();
     concerned_staffs_properly_trained_in_imaging:cen_QuestionProperty=new cen_QuestionProperty();
     centre_provide_safety_equipments_to_concerned:cen_QuestionProperty=new cen_QuestionProperty();
     centre_ensures_quality_control_and_radiation_safety:cen_QuestionProperty=new cen_QuestionProperty();
      centre_provide_transport_services_ambulance:QuestionPropertyCentralSupportServc=new QuestionPropertyCentralSupportServc();
     centre_have_standardized_protocol_to_identify:cen_QuestionProperty=new cen_QuestionProperty();
     centre_have_defined_policies_and_procedure:cen_QuestionProperty=new cen_QuestionProperty();
     number_of_ambulance:cen_QuestionProperty=new cen_QuestionProperty();
     daily_check_list_of_ambulance:cen_QuestionProperty=new cen_QuestionProperty();
     upload_document_ambulnce:cen_QuestionProperty=new cen_QuestionProperty();
      mou_for_outsourced_ambulance_service:CentralMouOutsourcedQuestionProperty=new CentralMouOutsourcedQuestionProperty();
      centre_have_linen_management_system_insource:QuestionPropertyCentralSupportServc=new QuestionPropertyCentralSupportServc();
     centre_ensure_availability_of_different_categories:cen_QuestionProperty=new cen_QuestionProperty();

     inhouse_imaging_services_licensed_aerb:cen_QuestionProperty=new cen_QuestionProperty();
     imaging_service_list:DiagnosticService[]=[];
     hospital_declaration :cen_QuestionProperty=new cen_QuestionProperty();
}


 class CentralMouOutsourcedQuestionProperty extends cen_QuestionProperty
{

    available :boolean
    agency_name:String
    valid_from:DateStruct
    valid_till:DateStruct


}
 class SupportServiceList extends cen_QuestionProperty
{
    
    support_servc_list:SupportService[]=[]

}
 class ParamedicalServiceList extends cen_QuestionProperty
{
 
    oushadhashala:SupportService[]=[]
     pathyaahara_vibhaga:SupportService[]=[]
     rehabilitative_services :SupportService[]=[]


}

 class SupportService
{
    service:String
    inhouse:boolean
   outsource:boolean
    not_applicable:boolean
}
 class SupportLabServiceList extends cen_QuestionProperty
{
   
    _laboratorty_servc_list:LabService_Licience[]=[];
    transfusioin_servc_list:LabService_Licience[]=[];

}

 class SupportLabService
{
    service:String
    inhouse:boolean
    outsource:boolean
    serves_other_org:boolean
   
}

export class QuestionPropertyCentralSupportServc
{
    ques_stndrd_code:String
    ques_text:String
    ques_help_text:String
    ques_selected_opt:String

    ques_text_value:String
    ques_doc_url:String
    old_ques_histry_opt:boolean
    old_ques_doc_url:String
}
class DiagnosticService extends SupportLabService
{
     aerb_lic_details:AerbLicienceDetails=new AerbLicienceDetails();
     mou_lic_detail:CenMouDetailsOutsourced=new CenMouDetailsOutsourced();
}
 class AerbLicienceDetails
{


 agent_name :string
status :string
 application_no :string
 lic_no :string
valid_from :DateStruct
valid_till :DateStruct
license_url :string


}
class CenMouDetailsOutsourced
{


 agent_name :string
available :string
valid_from :DateStruct
valid_till :DateStruct
license_url :string


}
class LabService_Licience
{
    service:String
    inhouse:boolean
    outsource:boolean
    serves_other_org:boolean
   mou_lic_detail: CenMouDetailsOutsourced=new CenMouDetailsOutsourced()
}

