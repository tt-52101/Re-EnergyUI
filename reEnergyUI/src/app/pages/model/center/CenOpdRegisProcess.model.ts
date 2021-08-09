import { cen_QuestionProperty } from './cen_QuestionProperty.model'

export class CenOpdRegisProcess
{
   
    policy_for_patients_registration_and_admission:cen_QuestionProperty=new cen_QuestionProperty();
    centre_have_policy_to_register_patients:cen_QuestionProperty=new cen_QuestionProperty();
    centre_maintain_the_registration_register:cen_QuestionProperty=new cen_QuestionProperty();
    centre_have_standardised_initial_assessment:cen_QuestionProperty=new cen_QuestionProperty();
    centre_define_criteria_mechanism_identify_patients:cen_QuestionProperty=new cen_QuestionProperty();
    policy_to_proceed_additional_specialized_assessments:cen_QuestionProperty=new cen_QuestionProperty();
    policy_to_incorporate_outside_assessment:cen_QuestionProperty=new cen_QuestionProperty();
    centres_scope_of_services_mission_resources:cen_QuestionProperty=new cen_QuestionProperty();
    centre_have_referralout_system_for_additional_care:cen_QuestionProperty=new cen_QuestionProperty();
    maintain_proper_coordination_between_medical_centres:cen_QuestionPropertyopd=new cen_QuestionPropertyopd();
    
}
export  class cen_QuestionPropertyopd
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