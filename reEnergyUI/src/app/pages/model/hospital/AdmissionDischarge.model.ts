import { QuestionProperty } from './QuestionProperty.model'

export class AdmissionDischarge {

    document_structured_clinical_handover_during_shift_change: QuestionProperty = new QuestionProperty();
    patient_is_leaving_hospital_against_medical_advice: QuestionProperty = new QuestionProperty();
    hospital_hand_over_the_discharge_summary_to_the_patient: QuestionProperty = new QuestionProperty();
    hospital_coordinate_between_all_concerned_departments: QuestionProperty = new QuestionProperty();
    discharge_summary_include_the_apparent_cause_of_death: QuestionProperty = new QuestionProperty();
    reassessment_includes_determining_the_response_to_the_treatment: QuestionProperty = new QuestionProperty();
    hospital_reassess_the_patients_at_least_once_a_day: QuestionProperty = new QuestionProperty();
    reassessment_of_patient_before_further_treatment_discharge: QuestionProperty = new QuestionProperty();
    discharge_summary_contains_the_following_relevant_information: DischargeSummaryContainsRelevantInformation=new DischargeSummaryContainsRelevantInformation();
    incorporate_the_details_of_the_procedures_therapies_interventions: QuestionProperty = new QuestionProperty();
    maintain_the_register_about_patients_condition: QuestionProperty = new QuestionProperty();
    hospital_have_policy_for_the_referral_of_patients: QuestionProperty = new QuestionProperty();
    maintains_the_documentation_of_relevant_clinical_parameters: QuestionProperty = new QuestionProperty();
    initial_assessment_for_inpatients_are_getting_documented_within_hrs: InitialAsssessment = new InitialAsssessment();
    are_all_the_admissions_authorized_by_ayush_doctors: QuestionProperty = new QuestionProperty();
    follow_the_standardized_sop_for_initial_assessment_of_patients: QuestionProperty = new QuestionProperty();
    patien_registered_with_unique_identification_number: QuestionProperty = new QuestionProperty();
    policy_for_patients_registration_and_admission: QuestionProperty = new QuestionProperty();
  
}
export class DischargeSummaryContainsRelevantInformation {

    ques_stndrd_code: string
    ques_text: string
    ques_help_text: string

    ques_doc_url: string
    old_ques_histry_opt: Boolean
    ques_doc_url_1: string
    ques_doc_url_2: string
    ques_doc_url_3: string
    ques_selected_opt: Boolean
    admsn_patname: Boolean
    admsn_regisnumber: Boolean
    admsn_datetimeadmsn: Boolean
    admsn_datetimedis: Boolean
    admsn_resonofadmsn: Boolean
    admsn_signifindings: Boolean
    admsn_investigation: Boolean
    admsn_diagnosis: Boolean
    admsn_procedrperformd: Boolean
    admsn_treatment: Boolean
    admsn_patientcondtion: Boolean
    admsn_prescrption: Boolean
    admsn_urgentcare: Boolean

}
export class InitialAsssessment extends QuestionProperty{
    initial_assessment_url_1:String
    initial_assessment_url_2:String
    initial_assessment_url_3:String
    }