import { DateStruct } from "./hospital/SupportService.model";

export class CommitteeDto {
    id: number;
    recommended: boolean;
    non_recommended: boolean;
    pending_recommended: boolean;
    da_advisary: string;
    oa_advisary: string;
    recommend_remark: string;
    non_recommend_remark: string;
    pending_remark: string;
    uploadurl: string;
    hospital_reply: string;
    scope_tab: SosResponseAppNew = new SosResponseAppNew();
    ccpening: CCPEningDecisionSearchResponses = new CCPEningDecisionSearchResponses();
}

export class CCPEningDecisionSearchResponses {
    rows = new Array<CometteeDesionPendingDto>();
}
export class CometteeDesionPendingDto {
    id: number;
    hospital_id: number;
    decision_id: number;
    remarks: string;
    reply: string;
    uploadUrl: string;
    isOpen: boolean;
    finalRemark: string;
    ccCreateDate: Date;
    ncStage: number;
    ccReplyDate: Date;
    uploadItems = new Array<UploadDocsClss>()
}
export class UploadDocsClss {
    orgfn: string;
    fn: string
}

export class SosResponseAppNew {
    hospital_id: number;
    assessment_id: number;

    scopeayurveda: ScopeAyurvedaCC = new ScopeAyurvedaCC();
    scopeyunani: ScopeYunaniCC = new ScopeYunaniCC();
    scopeHemopathy: ScopeHemopathyCC = new ScopeHemopathyCC();

    scopenuropathy: ScopeNeuropathyCC = new ScopeNeuropathyCC();
    scopesidhha: ScopeSidhhaCC = new ScopeSidhhaCC();
}

export class ScopeAyurvedaCC {
    sosvalues = new Array<SosValuesCC>();

    remarks: string;
}

export class ScopeYunaniCC {
    sosvalues = new Array<SosValuesCC>();

    remarks: string;
}
export class ScopeHemopathyCC {
    sosvalues = new Array<SosValuesCC>();

    remarks: string;
}
export class ScopeNeuropathyCC {
    sosvalues = new Array<SosValuesCC>();

    remarks: string;
}
export class ScopeSidhhaCC {
    sosvalues = new Array<SosValuesCC>();

    remarks: string;
}

export class SosValuesCC {
    services: string;
    hospselected: boolean;
    asrselected: boolean;
    recomm_bycc: string
}