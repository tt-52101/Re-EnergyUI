import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AssessorSearchResponse, AssessorCls, CalendarInfo, EntityOperationResult, EditCalendarInfo } from '../model/Assessor.model';
import { QualificationItem, StateItem } from '../model/Assessor.model';
import { applicationTrackerList } from '../modules/super-admin/hospital-tracker/hospital-tracker.component';
import { Observable } from 'rxjs';
import { DA_OA_AllocatedHospist } from '../modules/assessor/da-allocation/da-oa-allocated-hosp.component';
import { FormGroup } from 'node_modules/@angular/forms/forms';
// import { User } from 'src/app/core/models/auth.models';

@Injectable({
  providedIn: 'root'
})

export class AssessorService {
  public apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  ////#region profile

  getQualificationlistList(): Observable<QualificationItem[]> {
    return this.http.get<QualificationItem[]>(this.apiUrl + "unauthorized/getAllEducationQualifications");
  }

  getDashBoardData(): Observable<any> {

    return this.http.get<any>(this.apiUrl + "assessors/assessorDashboardData");

  }
  getStatelistList(): Observable<StateItem[]> {
    return this.http.get<StateItem[]>(this.apiUrl + "unauthorized/statelist");
  }

  getLoggedInAsrProfile() {
    return this.http.get<AssessorCls>(this.apiUrl + "assessors/getAssessorByloggedinUserId");
  }
  getAsrProfile(userid: number) {
    //debugger
    return this.http.get<AssessorCls>(this.apiUrl + "assessors/getAssessorUserId?userid=" + userid);
  }

  public updateAssessor(asrData: AssessorCls) {
    return this.http.post<any>(this.apiUrl + "assessors/UpdateAsrProfile", asrData);
  }
  getDaOaAllocatedHosp(search_term: string, search_type: string, search_state: number, search_assmt_type: number, search_stage: number, offset: number, limit: number) {
    return this.http.get<DA_OA_AllocatedHospist>(this.apiUrl + "assessors/getDa_Oa_allocated_List?searchTerms=" + search_term + "&searchType=" + search_type + "&searchState=" + search_state + "&searchAssessmentType=" + search_assmt_type + "&searchStage=" + search_stage + "&offset=" + offset + "&limit=" + limit);
  }
  getDaAllocatedHosp(search_term: string, search_type: string, search_state: number, search_assmt_type: number, search_stage: number, offset: number, limit: number) {
    return this.http.get<DA_OA_AllocatedHospist>(this.apiUrl + "assessors/getDa_allocated_List?searchTerms=" + search_term + "&searchType=" + search_type + "&searchState=" + search_state + "&searchAssessmentType=" + search_assmt_type + "&searchStage=" + search_stage + "&offset=" + offset + "&limit=" + limit);
  }

  getDaOaAllocatedHospDropdownList() {
    return this.http.get<any>(this.apiUrl + "assessors/daOaAllocatedHospDropdown");
  }
  genrateMobileOtp(hospid) {
    return this.http.post<any>(this.apiUrl + "assessors/mobileOTPgenration", { hospid: hospid, mobile: "", email: "", otp: "" });

  }
  verifyMobileOtp(hospid, otpno) {
    return this.http.post<any>(this.apiUrl + "assessors/verifyMobileOtp", { hospid: hospid, mobile: "", email: "", otp: otpno });

  }

  ////#endregion

  ////#region calender

  getLoggedInAsrCalendarRecords() {
    return this.http.get<CalendarInfo>(this.apiUrl + "assessors/getLoggedInAsrCalendarRecords");
  }

  getCalendarRecordsByAsrid(Asrid: number) {
    return this.http.get<CalendarInfo>(this.apiUrl + "assessors/getCalendarRecordsByAsrid?assessorId=" + Asrid);
  }

  addEvent(item: FormGroup) {
    return this.http.put<EntityOperationResult>(this.apiUrl + "assessors/addAssessorCalendarData" + item, {});
  }

  public deleteEvnet(id: number) {
    return this.http.delete<EntityOperationResult>(this.apiUrl + "assessors/DeleteCalendarEvent?id=" + id);
  }

  addAssesorEvnt(item: any) {

    return this.http.put<EntityOperationResult>(this.apiUrl + "assessors/addAssessorCalendarData", item);
  }

  ////#endregion


}
