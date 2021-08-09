export class AssessorSummaryDTO {

    pasr_id: number
    sasr_id: number
    hospital_id: number
    sasr_name: string
    pasr_name: string
    asmtdate: Date
    asmtid: number
    summary: string;
    feedbackbyAsr: SecondAssessorfeedbackSumm = new SecondAssessorfeedbackSumm();

}
export class SecondAssessorfeedbackSumm {
    sasr_id: string;
    assmnt_conduct_professnl_mannr: QuesOption = new QuesOption();
    knowldge_nbh_requrmnt_hco_crtificat: QuesOption = new QuesOption();
    assmnt_findng_approtly_presntd: QuesOption = new QuesOption();
    assessd_witht_bis_convd: QuesOption = new QuesOption();
    lookd_facts_objctv: QuesOption = new QuesOption();
    effctve_communitn_informntn: QuesOption = new QuesOption();
    maturty_open_mindns: QuesOption = new QuesOption();
    approprt_prsnl: QuesOption = new QuesOption();
    ethcl_practc: QuesOption = new QuesOption();
    generl_commnts_specfc: string;
}




export class QuesOption {
    ques_rating: boolean;

    ques_comment: string

}