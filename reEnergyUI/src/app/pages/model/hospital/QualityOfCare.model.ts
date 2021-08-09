import { QuestionProperty } from './QuestionProperty.model'
import { SupportService } from './SupportService.model';

export class QualityOfCare {

    non_clinic_services_provided_by_the_organization: QuestionProperty = new QuestionProperty();
   qoc_nonclncl_service: qocNonTechService[]=[]
    does_hospital_provide_obstetrical_services: QuestionProperty = new QuestionProperty();
    security_surveillance_system_at_pre_defined_interval: QuestionProperty = new QuestionProperty();
    performs_invasive_procedures_operative_procedures: QuestionProperty = new QuestionProperty();
    follows_the_defined_process_rapid_response: QuestionProperty = new QuestionProperty();
    adequate_security_system_to_prevent_such_issues: QuestionProperty = new QuestionProperty();
    maintains_the_child_abduction_prevention_protocols: QuestionProperty = new QuestionProperty();
    nutritional_growth_and_immunization_assessment: QuestionProperty = new QuestionProperty();
    take_care_of_new_born_and_paediatric_patients: QuestionProperty = new QuestionProperty();
    obstetric_patients_getting_diet_counselling_qualified: QuestionProperty = new QuestionProperty();
    care_of_obstetric_patient_at_regular_interval: QuestionProperty = new QuestionProperty();
    maintains_the_ante_natal_card_for_obstetric_patient_qualified: QuestionProperty = new QuestionProperty();
    hand_over_separate_discharge_summary_note_newborn: QuestionProperty = new QuestionProperty();
    pre_natal_peri_natal_and_post_natal_monitoring: QuestionProperty = new QuestionProperty();
    applicable_for_both_emergency_and_routine_cases: QuestionProperty = new QuestionProperty();
    who_conducts_the_pre_operative_diagnosis: PreoperativeDiagnostic = new PreoperativeDiagnostic();
    pre_operative_diagnosis_performing_invasive_procedure: QuestionProperty = new QuestionProperty();
    operative_notes_procedure_notes_and_post_operative: QuestionProperty = new QuestionProperty();
    process_for_periodic_review_of_safety_plans: QuestionProperty = new QuestionProperty();
    plans_and_policies_to_provide_a_safe_and_secure: QuestionProperty = new QuestionProperty();
    upper_limit_for_different_services_being_provided: QuestionProperty = new QuestionProperty();
    periodically_inspect_patient_safety_devices: QuestionProperty = new QuestionProperty();
    quality_improvement_and_patient_safety_programme: QuestionProperty = new QuestionProperty();
    provided_for_quality_improvement_and_patient: QuestionProperty = new QuestionProperty();
    manpower_material_consumable_financial_resources: QuestionProperty = new QuestionProperty();
    coordinate_with_quality_improvement_and_patient_safety: QuestionProperty = new QuestionProperty();
    document_quality_improvement_patient_safety_program: QuestionProperty = new QuestionProperty();
    updates_quality_improvement_patient_safety_program: QuestionProperty = new QuestionProperty();
    use_medication_yoga_naturopathy_interventions: QuestionProperty = new QuestionProperty();

    reduce_the_medication_errors_and_adverse_drug_reaction: QuestionProperty = new QuestionProperty();
    medicatio_error_and_adverse_drug_reactions: QuestionProperty = new QuestionProperty();
    mechanism_to_verify_the_adverse_drug_reaction: QuestionProperty = new QuestionProperty();
    mechanism_to_identify_medication_error: QuestionProperty = new QuestionProperty();
    name_dosage_route_and_timing: QuestionProperty = new QuestionProperty();
    preparation_of_the_second_drug: QuestionProperty = new QuestionProperty();
    prepared_in_a_designated_and_well_equipped_place: QuestionProperty = new QuestionProperty();
    administered_only_by_competent_personnel: QuestionProperty = new QuestionProperty();
    salient_steps_key_findings_and_post_procedure_care: PainAssessment = new PainAssessment();
    protocol_of_screening_examination_of_food_handler: QuestionProperty = new QuestionProperty();
    nursing_care_provided_based_on_clinical_requirements: QuestionProperty = new QuestionProperty();
    standard_nursing_services_practices_relevant_regulations: QuestionProperty = new QuestionProperty();
    patients_monitored_at_least_twice_a_day: QuestionProperty = new QuestionProperty();
    identify_clinically_vulnerable_patients_and_staff: QuestionProperty = new QuestionProperty();
    intensity_character_frequency_location_duration: QuestionProperty = new QuestionProperty();
    flw_pain_asssment_rssmnt_including_mitigation_technique: PainAssessment = new PainAssessment();





}
export class PreoperativeDiagnostic extends QuestionProperty
{
ayush_doctor:boolean;
ayush_doctor_url:string;
member_of_team:boolean;
member_of_team_url:string;
someoneelse:boolean
someoneelse_url:string


}
export class qocNonTechService
{
     service :string
    inhouse:boolean
     outsource :boolean
    not_applicable :boolean
}
export class PainAssessment extends QuestionProperty
{
record_doc_url_1:string
record_doc_url_2:string
record_doc_url_3:string
}