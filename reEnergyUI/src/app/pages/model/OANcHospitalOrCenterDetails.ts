export class OANcHospitalOrCenterDetails {

    id: number;
    hospital_id: number;
    ques_id: number;
    assessment_id: number;
    form_id: number;

    section_id: number;
    section_name: string;
    // isNc: boolean = true;
    remarks: string;
    reply: string;
    uploadUrl: string;
    isOpen: boolean;
    finalRemark: string;
    ncCreateDate: Date;
    ncStage: number;
    nccreatedatebyoa: Date;
    // isnc_status: boolean;
    ques_text: string;
    rows = new Array<OANcHospitalOrCenterDetails>();
}

export class OANcHospitalOrCenterDetailsItem {
    total: number;
    rowCount: number;
    current: number;
    rows = new Array<OANcHospitalOrCenterDetails>();
}

export class uploadedDocsCls {
    orgfn: string;
    fn: string;
}


export class DaRejectCls {
    id: number;
    remarks: string;
    isDaComplete: Boolean
}