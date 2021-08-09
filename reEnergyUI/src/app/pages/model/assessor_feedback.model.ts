
export class AssessorfeedbackDTO {
    hospital_id: number
    pasr_id: number
    sasr_id: number
    pasr_name: string
    sasr_name: string
    orgname: string
    asmtdate: Date
    asmtid: number
    p_asrfeedback: Assessorfeedback = new Assessorfeedback();
    s_asrfeedback: SecondAssessorfeedback = new SecondAssessorfeedback();
}
export class Assessorfeedback {
    knowledge_of_hco_pract: Knowledge = new Knowledge();
    assessment_skills: Assessment_skills = new Assessment_skills();
    adapability: Abality = new Abality();
    timemanagement: TimeManagement = new TimeManagement();
    commmunication_information: Communication = new Communication();
    teamplayer: TeamPlayer = new TeamPlayer();
    playing_organisation: PlayngOrg = new PlayngOrg();
    any_other_singni: Others = new Others();
}

export class SecondAssessorfeedback {
    knowledge_of_hco_pract: Knowledge = new Knowledge();
    assessment_skills: Assessment_skills = new Assessment_skills();
    adapability: Abality = new Abality();
    timemanagement: TimeManagement = new TimeManagement();
    commmunication_information: Communication = new Communication();
    teamplayer: TeamPlayer = new TeamPlayer();
    playing_organisation: PlayngOrg = new PlayngOrg();
    any_other_singni: Others = new Others();
}
export class Knowledge {

    depth_knowldg_stndrs_objectv_elemnts: QuestionPropertyy = new QuestionPropertyy();
    competnt_requrd_assesmnt: QuestionPropertyy = new QuestionPropertyy();
    exhbts_ablity_lern_skills: QuestionPropertyy = new QuestionPropertyy();
    keeps_abreast_cuurnt: QuestionPropertyy = new QuestionPropertyy();
}
export class Assessment_skills {

    intrprt_appropite_objectve: QuestionPropertyy = new QuestionPropertyy();
    flexible_accpt_stndrd_resources: QuestionPropertyy = new QuestionPropertyy();
    gathr_analysis_sklfuly_concieved: QuestionPropertyy = new QuestionPropertyy();
    adhere_ethical_prncpl: QuestionPropertyy = new QuestionPropertyy();
}
export class Abality {
    adpts_chnge_assesmnt: QuestionPropertyy = new QuestionPropertyy();
    mange_conficitng_demands_frame: QuestionPropertyy = new QuestionPropertyy();
    accepts_instructn_consitve: QuestionPropertyy = new QuestionPropertyy();
    chnge_approch_methd_stuatn: QuestionPropertyy = new QuestionPropertyy();
}
export class TimeManagement {
    arrvs_meetng_scussn: QuestionPropertyy = new QuestionPropertyy();
    begns_worng_effectively: QuestionPropertyy = new QuestionPropertyy();
    change_aprch_best_situtn: QuestionPropertyy = new QuestionPropertyy(); //dont know
    reviws_documnts_prepars_obsvatn: QuestionPropertyy = new QuestionPropertyy();
    comminats_delay: QuestionPropertyy = new QuestionPropertyy();
}
export class Communication {
    express_findng_verblly: QuestionPropertyy = new QuestionPropertyy();
    expres_findng_observtn: QuestionPropertyy = new QuestionPropertyy();
    exhbts_listng_comprehensn: QuestionPropertyy = new QuestionPropertyy();
    prficnt_computer_skills: QuestionPropertyy = new QuestionPropertyy();
    ncs_clesrly_documents: QuestionPropertyy = new QuestionPropertyy();
}
export class TeamPlayer {
    works_cooper_group: QuestionPropertyy = new QuestionPropertyy();
    exhibts_diplomacy_considertn: QuestionPropertyy = new QuestionPropertyy();
    display_positve_outlk_mannr: QuestionPropertyy = new QuestionPropertyy();
    offers_assistance_develop_assesor: QuestionPropertyy = new QuestionPropertyy();
    works_activly_prevent_resolve: QuestionPropertyy = new QuestionPropertyy();

}
export class PlayngOrg {

    priortze_plans_activets: QuestionPropertyy = new QuestionPropertyy();
    plans_additnl: QuestionPropertyy = new QuestionPropertyy();
    works_orgnl_mannr: QuestionPropertyy = new QuestionPropertyy();
}
export class Others {
    other_text_: string;

}

export class QuestionPropertyy {
    ques_rating: string;
    // ques_rating_poor: string;
    // ques_rating_fair: string;
    // ques_rating_good: string;
    // ques_rating_verygood: string;
    // ques_rating_excellent: string;
    ques_comment: string

}