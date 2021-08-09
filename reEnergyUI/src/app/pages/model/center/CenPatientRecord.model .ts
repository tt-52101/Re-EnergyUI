import { cen_QuestionProperty } from './cen_QuestionProperty.model'

export class CenPatientRecord {

    preference_religious_and_cultural_needs: cen_QuestionProperty = new cen_QuestionProperty();
    centre_educate_and_counsel_the_patient: cen_QuestionProperty = new cen_QuestionProperty();
    policy_to_inform_patient_about_estimated_cost: cen_QuestionProperty = new cen_QuestionProperty();
    available_options_and_allow_the_patient_to_make_an_informed_choice: cen_QuestionProperty = new cen_QuestionProperty();
    policy_procedure_to_record_complaints_of_the_patients: cen_QuestionProperty = new cen_QuestionProperty();
    patient_protection_rights_against_physical_abuse: cen_QuestionProperty = new cen_QuestionProperty();
    cases_for_violation_of_patients_rights_and_responsibilities: cen_QuestionProperty = new cen_QuestionProperty();
    system_for_documented_corrective_preventive_measures: cen_QuestionProperty = new cen_QuestionProperty();
    sop_and_iec_to_educate_the_patients_and_family_members: cen_QuestionProperty = new cen_QuestionProperty();
    safety_effectiveness_and_side_effects_of_medication: cen_QuestionProperty = new cen_QuestionProperty();
    the_diet_and_nutrition_to_be_followed: cen_QuestionProperty = new cen_QuestionProperty();
    consequences_of_refusal_of_treatment_and_document: cen_QuestionProperty = new cen_QuestionProperty();
    specific_disease_process_prognosis_complications_and_prevention: cen_QuestionProperty = new cen_QuestionProperty();
    policy_iec_to_inform_patient: cen_QuestionProperty = new cen_QuestionProperty();
    centre_conduct_promotional_health_related: cen_QuestionProperty = new cen_QuestionProperty();
    patients_information_is_kept_confidential: cen_QuestionProperty = new cen_QuestionProperty();
    own_clinical_records: cen_QuestionProperty = new cen_QuestionProperty();
    sop_to_prescribe_dispense_and_administer_the_medication: cen_QuestionProperty = new cen_QuestionProperty();

    guidelines_of_good_clinical_practice: GuidelinesofGoodClinicalPractice = new GuidelinesofGoodClinicalPractice();
    medications_in_a_clear_legible_manner: cen_QuestionProperty = new cen_QuestionProperty();
    patient_details_and_treatment: cen_QuestionProperty = new cen_QuestionProperty();
    obtain_written_informed_consent_prior: cen_QuestionProperty = new cen_QuestionProperty();
    list_of_procedures_and_treatment: cen_QuestionProperty = new cen_QuestionProperty();
    information_of_risks_benefits_alternatives: cen_QuestionProperty = new cen_QuestionProperty();
    language_understandable_by_the_patient: cen_QuestionProperty = new cen_QuestionProperty();
    consent_forms_available_for_the_patient: ConsentFormsAvailableforPatient = new ConsentFormsAvailableforPatient();
    policy_to_choose_for_consent_authorization: cen_QuestionProperty = new cen_QuestionProperty();
    patient_in_a_research: cen_QuestionProperty = new cen_QuestionProperty();

    sop_policy_to_address_patients_informed_consent: cen_QuestionProperty = new cen_QuestionProperty();
    hospital_maintain_the_patients_medical_records: cen_QuestionPropertypatientrecord = new cen_QuestionPropertypatientrecord();

    patient_care_needs_and_regulatory_requirements: NeedsRegulatoryRequirements = new NeedsRegulatoryRequirements();
    centre_record_the_written_summaries: cen_QuestionProperty = new cen_QuestionProperty();
    centre_define_and_allow_only_authorised_personnels: cen_QuestionProperty = new cen_QuestionProperty();
    retention_period_for_maintaining_and_disposing: cen_QuestionProperty = new cen_QuestionProperty();

}

export class GuidelinesofGoodClinicalPractice {

    ques_stndrd_code: string
    ques_text: string
    ques_help_text: string
    ques_doc_url_1: string
    ques_doc_url_2: string
    ques_doc_url_3: string
    old_ques_histry_opt: Boolean
    old_ques_doc_url: string

    prescription_date: Boolean
    patient_name: Boolean
    uhid_number: Boolean
    name_of_drug: Boolean
    drug_dose: Boolean
    admin_of_medi: Boolean
    name_of_doct: Boolean
    sign_of_doctor: Boolean
    registration_no_doctor: Boolean

}
export class NeedsRegulatoryRequirements {

    ques_stndrd_code: string
    ques_text: string
    ques_help_text: string
    ques_doc_url_1: string
    ques_doc_url_2: string
    ques_doc_url_3: string
    old_ques_histry_opt: Boolean
    old_ques_doc_url: string

    patient_name: Boolean
    uhid_number: Boolean
    name_of_doct: Boolean
    sign_of_doctor: Boolean
    registration_no_doctor: Boolean
    none: Boolean // new aadded 11 dec 2020

}
export class cen_QuestionPropertypatientrecord {
    ques_stndrd_code: string
    ques_text: string
    ques_help_text: string
    ques_selected_opt: string
    ques_doc_url: string
    old_ques_histry_opt: string
    old_ques_doc_url: string
    ques_text_value: string
}
export class ConsentFormsAvailableforPatient {
    ques_stndrd_code: string
    ques_text: string
    ques_selected_opt: boolean
    ques_help_text: string
    ques_doc_url_1: string
    ques_doc_url_2: string
    ques_doc_url_3: string
    old_ques_histry_opt: Boolean
    old_ques_doc_url: string
}