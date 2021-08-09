import { QuestionProperty } from './QuestionProperty.model'

export class PatientRecord {
    cost_of_treatment_at_the_time_of_admission: QuestionProperty = new QuestionProperty();
    packages_doctor_fees_medicines_investigations: QuestionProperty = new QuestionProperty();
    maintains_confidentiality_while_treating_with_patient: QuestionProperty = new QuestionProperty();
    printed_material_or_audio_visual_aids: QuestionProperty = new QuestionProperty();
    use_of_medication_yoga_naturopathy_interventions: QuestionProperty = new QuestionProperty();
    ensure_the_patients_privacy_and_dignity: QuestionProperty = new QuestionProperty();
    ensures_that_the_ayush_therapists_is_of_same_gender: QuestionProperty = new QuestionProperty();
    patient_go_for_second_opinion_from_outside_hospital: QuestionProperty = new QuestionProperty();
    access_to_all_relevant_information_to_the_patient: QuestionProperty = new QuestionProperty();
    ensures_that_patient_has_access_to_clinical_records: QuestionProperty = new QuestionProperty();
    ayush_doctors_are_properly_trained_sensitised: QuestionProperty = new QuestionProperty();
    doctors_prescribe_printed_prescriptions: QuestionProperty = new QuestionProperty();
    prescriptions_adhere_to_national_international_guidelines: QuestionProperty = new QuestionProperty();
    prescription_include_the_following_relevant_information: DoctorPrescribePrecaution = new DoctorPrescribePrecaution();
    medication_orders_clear_legible: QuestionProperty = new QuestionProperty();
    doctors_prescribe_prescriptions_in_capital_letters: QuestionProperty = new QuestionProperty();
    hospital_ascertain_about_the_drug_allergies: HospAcertainDrug = new HospAcertainDrug();
    proceeding_with_photographing_recording: QuestionProperty = new QuestionProperty();
    diagnostic_and_therapeutic_intervention_procedure: QuestionProperty = new QuestionProperty();
    hospital_takes_a_prior_written_consent: QuestionProperty = new QuestionProperty();
    obtain_written_informed_consent_prior_to_procedures: QuestionProperty = new QuestionProperty();
    family_about_the_decision_regarding_their_care: QuestionProperty = new QuestionProperty();
    performa_of_the_consent_in_the_language: PerformanceConsent = new PerformanceConsent();
    name_of_ayush_doctor_performing_the_procedure: QuestionProperty = new QuestionProperty();
    hospital_identified_the_legal_age_giving_consent: QuestionProperty = new QuestionProperty();
    when_patient_is_incapable_of_giving_consent: QuestionProperty = new QuestionProperty();
    hospital_maintains_the_patient_medical_records: QuestionProperty = new QuestionProperty();
    hospital_ensures_medical_records_electronic_systems: QuestionProperty = new QuestionProperty();
    correct_overwrite_the_entries_in_patient_record: QuestionProperty = new QuestionProperty();
    complete_accurate_medical_record_of_each_patient: QuestionProperty = new QuestionProperty();
    every_medical_record_has_a_unique_identifier: QuestionProperty = new QuestionProperty();
    national_laws_and_regulations_of_respective_state: QuestionProperty = new QuestionProperty();
    hospital_have_access_control_mechanism: QuestionProperty = new QuestionProperty();
    hospital_identifies_documents_needed_for_medical_records: QuestionProperty = new QuestionProperty();
    sample_from_discharged_and_death_cases: QuestionProperty = new QuestionProperty();
    focuses_on_timeliness_legibility_and_completeness: QuestionProperty = new QuestionProperty();
    hospital_maintains_uniformity_in_the_personnel: QuestionProperty = new QuestionProperty();
    hospital_documented_clinician_nurse_pharmacist: QuestionProperty = new QuestionProperty();
    defines_the_retention_period_for_each_category: RetentionPeriodDept = new RetentionPeriodDept();
    //hospital_destroys_records_after_retention period
    hospital_destroys_records_after_retention_period: QuestionProperty = new QuestionProperty();
    maintained_in_the_retention_or_discarding_process: QuestionProperty = new QuestionProperty();
    hospital_takes_the_approval_of_the_concerned_authority: QuestionProperty = new QuestionProperty();










}
export class HospAcertainDrug extends QuestionProperty
{
    ipd_doc_url:string
    opd_doc_url:string
   
}
export class PerformanceConsent extends QuestionProperty
{
    consent_form_doc_url_1:string
    consent_form_doc_url_2:string
    consent_form_doc_url_3:string
   
}
export class RetentionPeriodDept extends QuestionProperty
{
    out_patiend_dept:string
    in_patiend_dept:string
    medicos_legal_case:string
}
export class DoctorPrescribePrecaution {

    ques_stndrd_code: string
    ques_text: string
    ques_help_text: string

    ques_doc_url_1: string
    ques_doc_url_2: string
    ques_doc_url_3: string
    old_ques_histry_opt: Boolean
    old_ques_doc_url: string

    date_of_prescription: Boolean
    patient_name: Boolean
    uhid_number: Boolean
    name_of_drug: Boolean
    drug_dose: Boolean
    admin_of_medi: Boolean
    name_of_doct: Boolean
    sign_of_doctor: Boolean
    registration_no_doctor: Boolean

}