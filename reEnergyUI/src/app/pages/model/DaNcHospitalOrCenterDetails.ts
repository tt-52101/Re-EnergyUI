export class DaNcHospitalOrCenterDetails {

    id: number;
    hospital_id: number;
    ques_id: number;
    classObject: string;
    propertyName: string;
    isNc: boolean = true;
    remarks: string;
    reply: string;
    uploadUrl: string;
    isOpen: boolean;
    finalRemark: string;
    ncCreateDate: Date;
    ncStage: number;
    nccreatedatebyda: Date;
    isnc_status: boolean;
    ques_text: string;
    rows = new Array<DaNcHospitalOrCenterDetails>();
}

export class DaNcHospitalOrCenterDetailsItem {
    total: number;
    rowCount: number;
    current: number;
    rows = new Array<DaNcHospitalOrCenterDetails>();
}

export class uploadedDocsCls {
    orgfn: string;
    fn: string;
}


export class DaRejectCls {
    id: number;
    remarks: string;
    isDaComplete: Boolean
    declare: Boolean
}