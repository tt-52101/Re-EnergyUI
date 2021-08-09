import { QuestionProperty } from './QuestionProperty.model'
import { DateStruct } from './SupportService.model';

export class HumanResource {


    public group_list: GroupList[] = []
    manpower_details: QuestionProperty = new QuestionProperty();
    doctors_along_with_qualification_and_specialisation: DoctorDetailsQuestionProperty = new DoctorDetailsQuestionProperty();
    list_of_all_the_nurses: StaffDetailsQuestionProperty = new StaffDetailsQuestionProperty();
    list_of_paricharika_therapist: StaffDetailsQuestionProperty = new StaffDetailsQuestionProperty();
    list_of_all_the_paramedic_staff: StaffDetailsQuestionProperty = new StaffDetailsQuestionProperty();
    list_of_all_the_administrative_and_support_staff: StaffDetailsQuestionProperty = new StaffDetailsQuestionProperty();
    hospital_maintains_the_adequate_number_and_mix_of_staff: QuestionProperty = new QuestionProperty();
    staffing_in_the_hospital_matches_the_strategic_operational: QuestionProperty = new QuestionProperty();
    take_care_of_the_patients_are_professionally_competent: QuestionProperty = new QuestionProperty();
    personnel_appropriately_trained_qualified_and_experienced: QuestionProperty = new QuestionProperty();
    personnel_competent_to_perform_the_interventions: QuestionProperty = new QuestionProperty();
    hospital_have_policy_sop_for_entire_recruitment_process: QuestionProperty = new QuestionProperty();

}


// export class DoctorDetails
// {

//     dooctor_name :string;
//     designation :string;
//     qualification :string;
//     expirience :string;
//     council_of_reg :string;
//     registrataion_no :string;
//     dept_of_working :string;
//     date_of_join :DateStruct;
// }

export class StaffDetails {

    staff_name: string;
    designation: string;
    qualification: string;
    expirience: string;
    council_of_reg: string;
    specialization: string;
    certific_body: string;
    registrataion_no: string;
    dept_of_working: string;
    date_of_join: DateStruct;
    type: string = null;
    adhar: string = null;
    pan: string = null;

}

export class DoctorDetailsQuestionProperty extends QuestionProperty {


    doctor_details: StaffDetails[]



}

export class StaffDetailsQuestionProperty extends QuestionProperty {
    staff_details: StaffDetails[]



}

export class GroupList {
    group: string;
    number: string;
    remark: string;
}
