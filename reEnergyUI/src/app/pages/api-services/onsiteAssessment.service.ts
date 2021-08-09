import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { root } from 'rxjs/internal/util/root';
import { catchError, filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GenAndSosDto, GenralInfoResponseByAsr, UpdatedStage } from '../model/GenAndSosDto.model';
import { onsiteFormData } from '../model/Onsite';
import { AssessorSummaryDTO } from '../model/summery_assesor.model';

@Injectable(
    {
        providedIn: 'root'
    }
)


export class onsiteAssessmentService {
    public apiUrl: string;
    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;

    }
    getAssessmentData(assessment_id: number) {
        return this.http.get<onsiteFormData>(this.apiUrl + 'onsiteassessment/getonsiteFormData/' + assessment_id)
        //    .pipe(
        //        map((data:onsiteFormData)=>
        //         {

        //             let tt=data
        //             return tt;
        //         }),

        //    )

    }
    getAssessmentData2(assessment_id: number) {
        return this.http.get<onsiteFormData>(this.apiUrl + 'onsiteassessment/getonsiteFormDatancbtn/' + assessment_id)


    }
    getStageData(hospital_id: number) {
        return this.http.get<UpdatedStage>(this.apiUrl + 'onsiteassessment/stage/' + hospital_id)

    }

    getGenData(hospital_id: number) {
        return this.http.get<GenAndSosDto>(this.apiUrl + 'onsiteassessment/GetGen/' + hospital_id)
        //    .pipe(
        //        map((data:onsiteFormData)=>
        //         {

        //             let tt=data
        //             return tt;
        //         }),

        //    )

    }
    // GetGen/{hospital_id}

    saveSummaeryData(assessorfeedback: AssessorSummaryDTO) {
        return this.http.post<any>(this.apiUrl + "onsiteassessment/AssessorSummary", assessorfeedback)
    }
}