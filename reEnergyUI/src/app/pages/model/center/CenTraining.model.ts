import { cen_QuestionProperty } from './cen_QuestionProperty.model'

export class CenTraining {

    communicate_disseminate_duties_jobs_responsibilities: cen_QuestionProperty = new cen_QuestionProperty();
    inductin_trn_staff_orientation: cenInductionTrainingStaff = new cenInductionTrainingStaff();
    training_employees_voluntary_worker_includes_orientation: cen_QuestionProperty = new cen_QuestionProperty();
    responsibility_for_protecting_patients_right_responsibilities: cen_QuestionProperty = new cen_QuestionProperty();
    occupational_risks_and_their_prevention: cen_QuestionProperty = new cen_QuestionProperty();
    standard_precautions_of_hygiene_control_practices: cen_QuestionProperty = new cen_QuestionProperty();
    regular_training_staff_for_infection_control: cen_QuestionProperty = new cen_QuestionProperty();
    staff_for_identification_spill_management_training: cen_QuestionProperty = new cen_QuestionProperty();
    continual_medical_education: cen_QuestionProperty = new cen_QuestionProperty();
    staff_for_fighting_fire_nonfire_emergencies: cen_QuestionProperty = new cen_QuestionProperty();

}
export class cenInductionTrainingStaff {
    vision_mission: boolean
    employ_right: boolean
    service_policies: boolean
    vision_mission_url: string
    employ_right_url: string
    service_policies_url: string

    none: boolean // new added 11-Dec-2020 vk

}