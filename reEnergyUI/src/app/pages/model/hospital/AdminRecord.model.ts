import { QuestionProperty } from './QuestionProperty.model'

export class AdminRecord {

    hospital_maintains_the_documents_brochure: QuestionProperty = new QuestionProperty();
    lays_down_its_vision_and_mission_commensurate: QuestionProperty = new QuestionProperty();
    line_of_control_and_functions_at_various_level: QuestionProperty = new QuestionProperty();
    defines_patient_visitor_and_employees_related_risks: QuestionProperty = new QuestionProperty();
    standard_billing_tariff_for_its_services: QuestionProperty = new QuestionProperty();
    incident_identification_and_reporting_system: QuestionProperty = new QuestionProperty();
    incidents_preferably_by_identifying_route_cause: QuestionProperty = new QuestionProperty();
    hospital_documents_the_corrective_and_preventive: QuestionProperty = new QuestionProperty();
    document_the_list_of_sentinel_Events: QuestionProperty = new QuestionProperty();
    hospital_make_a_records_of_such_incidents: QuestionProperty = new QuestionProperty();
    identify_sentinel_events_within_working_hours: QuestionProperty = new QuestionProperty();
    injuries_and_pre_and_post_exposure_prophylaxis: QuestionProperty = new QuestionProperty();
    plan_for_detection_abatement_and_containment: QuestionProperty = new QuestionProperty();
    safe_exit_plan_for_both_fire_and_nonfire_emergencies: QuestionProperty = new QuestionProperty();
    mous_agreements_for_all_outsourced_activities: QuestionProperty = new QuestionProperty();
    mous_agreements_for_all_outsourced_activities_list = new Array<ListofMoUsmonitoringservice>();
    potable_water_and_electricity_round_the_clock: QuestionProperty = new QuestionProperty();
    alternate_sources_for_water_and_electricity: QuestionProperty = new QuestionProperty();
    accordance_with_its_services_and_future_requirements: QuestionProperty = new QuestionProperty();
    process_of_periodic_equipment_plan_review: QuestionProperty = new QuestionProperty();
    maintains_proper_logs_of_the_inventory: QuestionProperty = new QuestionProperty();
    maintains_relevant_quality_conformance_certificates: QuestionProperty = new QuestionProperty();
    availability_of_maintenance_staff_round_the_clock: QuestionProperty = new QuestionProperty();
    escalation_matrix_in_case_of_emergency_repair: QuestionProperty = new QuestionProperty();
    implementation_of_corrective_actions_by_maintenace_staff: QuestionProperty = new QuestionProperty();
    maintains_the_documented_operational_maintenance: QuestionProperty = new QuestionProperty();
    operators_properly_trained_in_handling_equipments: QuestionProperty = new QuestionProperty();
    hospital_have_check_list_for_facility_inspection: QuestionProperty = new QuestionProperty();
    plan_and_budget_for_replacing_the_findings: QuestionProperty = new QuestionProperty();
    hospital_maintains_inspection_and_calibration: QuestionProperty = new QuestionProperty();
    inspection_testing_functionality_preventive_breakdown: QuestionProperty = new QuestionProperty();
    statutory_recommendations_for_fire_equipments: QuestionProperty = new QuestionProperty();
    personal_file_of_staffs_containing_information: QuestionProperty = new QuestionProperty();
    hospital_ensures_that_the_staff_record_files: QuestionProperty = new QuestionProperty();
    confidentiality_and_controlled_personal_access: QuestionProperty = new QuestionProperty();
    documents_regarding_employee: QuestionProperty = new QuestionProperty();
    hospital_have_healthcare_policies_for_employees: QuestionProperty = new QuestionProperty();
    carries_out_health_check_up_of_employees: HealthCheckupOfEmployee = new HealthCheckupOfEmployee();
    hospital_have_multi_disciplinary_committee: QuestionProperty = new QuestionProperty();
    quality_safety_infection_control_pharmacy_therapeutics: QuestionProperty = new QuestionProperty();
    committee_members_drawn_from_different_categories: QuestionProperty = new QuestionProperty();
    membership_responsibility_and_periodicity: QuestionProperty = new QuestionProperty();
    identify_potential_safety_risks_by_members: QuestionProperty = new QuestionProperty();
    training_to_every_staff_disciplinary_grievance: QuestionProperty = new QuestionProperty();
    regard_to_disciplinary_and_grievance_handling_system: QuestionProperty = new QuestionProperty();
    appellate_authority_to_consider_appeals: QuestionProperty = new QuestionProperty();
    ppellate_authority_holds_higher_authority: QuestionProperty = new QuestionProperty();
    complaints_grievances_and_clinical_care_delivery: QuestionProperty = new QuestionProperty();
    follows_readressal_of_complaint_of_mechanism: QuestionProperty = new QuestionProperty();

}

export class ListofMoUsmonitoringservice {

    serviceName: string;
    agencyName: string;
    available: string=null;
    validFrom: string;
    validTill: string
    mou_url: string
}
export class HealthCheckupOfEmployee
{
    ques_id: number;
      ques_stndrd_code: String
      ques_text: String
      ques_help_: String
      ques_selected_opt: boolean
      staff_doc_url_1: String
      staff_doc_url_2: String
      staff_doc_url_3: String
      is_ques_disabled: Boolean
      old_ques_histry_opt: String
}