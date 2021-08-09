export class GenralInfoResponseByAsr {
    hospital_id: number;
    assessment_id: number;
    section_id: number;
    section_name: string;

    hospital_name: string;

    asr_selfie: string;

    hospital_address: string;

    hospital_photo: string;

    cc_name: string;

    cc_designation: string;

    hospital_name_photo: string;

    cc_no: string;

    cc_photo: string;

    location: string;

    location_datetime: string;




}


export class SosResponseApp {
    // new(): SosResponseApp;
    hospital_id: number;
    assessment_id: number;


    scopeayurveda: ScopeAyurveda;
    scopeyunani: ScopeYunani;
    scopeHemopathy: ScopeHemopathy;

    scopenuropathy: ScopeNeuropathy;
    scopesidhha: ScopeSidhha;



}
export class SosValues {
    services: string;
    hospselected: boolean;
    asrselected: boolean;


}
export class ScopeAyurveda {
    // new(): ScopeAyurveda;
    // sosvalues: SosValues[]=new Array[] ;
    sosvalues: Array<SosValues> = new Array<SosValues>();
    remarks: string;
}
export class ScopeYunani {
    //  new(): ScopeYunani;
    // sosvalues: SosValues[];
    sosvalues: Array<SosValues> = new Array<SosValues>();
    remarks: string;
}

export class ScopeHemopathy {
    // new(): ScopeHemopathy;
    // sosvalues: SosValues[];
    sosvalues: Array<SosValues> = new Array<SosValues>();
    remarks: string;
}

export class ScopeNeuropathy {
    //  new(): ScopeNeuropathy;
    //  sosvalues: SosValues[];
    sosvalues: Array<SosValues> = new Array<SosValues>();
    remarks: string;
}

export class ScopeSidhha {
    //  new(): ScopeSidhha;
    // sosvalues: SosValues[];
    sosvalues: Array<SosValues> = new Array<SosValues>();
    remarks: string;
}

export class GenAndSosDto {
    //   new(): GenAndSosDto;
    genral_tab: GenralInfoResponseByAsr;
    scope_tab: SosResponseApp;
}
export class UpdatedStage {
    stage_id: number
}