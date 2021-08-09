import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserSearchResponse, User, UserFilter } from '../model/User.model';
import { applicationTrackerList, ExtentionLogHistry } from '../modules/super-admin/hospital-tracker/hospital-tracker.component';
import { DateStruct } from '../model/hospital/SupportService.model';
import { DA_AllocationList } from '../modules/super-admin/da-allocation/da-allocate.component';
import { AsrFilter } from '../model/Asrlist.model';
import { AssessorSearchResponse } from '../model/Assessor.model';
import { CertifiedHospitalList } from '../modules/super-admin/certified-hospital/certified-hospital.component';
import { AssessorHistryAdmin, HosptalAssesmnetDateHistryList, OA_AllocationList } from '../modules/super-admin/oa-allocation/oa-allocation.component';
import { CC_AllocationList } from '../modules/super-admin/cc-allocation/cc-allocation.component';
import { OaAllocationFilter, CcAllocationFilter, OaAllocationCls } from '../model/FilterRow.model';
import { OaAllocationAction, Oa_AssessemtHistry, ReapplyOrRenew } from '../dashboard/hospitaldashboard/hospitaldashboard.component';
import { PayemntTracker, PayemntTrackerList } from '../model/PaymentTrack';
// import { User } from 'src/app/core/models/auth.models';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  public apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }


  getUserList(SearchTerms: string, SelectedRole: number, offset: number, limit: number) {
    return this.http.get<UserSearchResponse>(this.apiUrl + "users?SearchTerms=" + SearchTerms + "&SearchRole=" + SelectedRole + '&offset=' + offset + '&limit=' + limit);
  }
  getAdminDashboardData() {

    return this.http.get<any>(this.apiUrl + "users/adminDashboardData");
  }


  ////#region rrc

  getAllUserListWithFilters(usrFltr: UserFilter, SearchFrom: DateStruct, SearchTo: DateStruct) {

    let vSearchDate = {
      from_date: SearchFrom,
      to_date: SearchTo
    }
    usrFltr.searchdate = vSearchDate;
    // //debugger
    return this.http.post<UserSearchResponse>(this.apiUrl + "users/getAllUserListWithFilters", usrFltr);
  }
  getAllAsrListWithFilters(asrFilter: AsrFilter) {
    return this.http.post<AssessorSearchResponse>(this.apiUrl + "assessors/getAllAssessorListWithFilters", asrFilter);
  }

  ExportAllAsrListWithFilters(asrFilter: AsrFilter) {

    return this.http.post(this.apiUrl + "excelExport/exportAssessorList", asrFilter, { responseType: 'blob' });
  }
  ////#endregion

  getApplicationTrackingData(SearchTerms: string, SearchType: string, SearchStatus: string, SearchState: number, SearchStage: number, SearchApplicationType: number, SearchFrom: DateStruct, SearchTo: DateStruct, offset: number, limit: number) {


    let searchDate = {
      from_date: SearchFrom,
      to_date: SearchTo
    }
    return this.http.post<applicationTrackerList>(this.apiUrl + "users/applicationTrackingList?searchTerms=" + SearchTerms + '&searchType=' + SearchType + '&searchStatus=' + SearchStatus + '&searchState=' + SearchState + '&searchApplicationType=' + SearchApplicationType + '&searchStage=' + SearchStage + '&offset=' + offset + '&limit=' + limit, searchDate);
  }

  getPaymentTracking(SearchTerms: string, SearchType: string, SearchStatus: string, SearchState: number, SearchApplicationType: number, SearchStage: number, offset: number, limit: number, SearchTo: DateStruct, SearchFrom: DateStruct) {
    let searchDate = {
      from_date: SearchFrom,
      to_date: SearchTo
    }
    return this.http.post<PayemntTracker>(this.apiUrl + "users/PayTrack?searchTerms=" + SearchTerms + '&searchType=' + SearchType + '&searchStatus=' + SearchStatus + '&searchState=' + SearchState + '&searchApplicationType=' + SearchApplicationType + '&searchStage=' + SearchStage + '&offset=' + offset + '&limit=' + limit, searchDate);
  }

  exportHospitalList(SearchTerms: string, SearchType: string, SearchStatus: string, SearchState: number, SearchStage: number, SearchApplicationType: number, SearchFrom: DateStruct, SearchTo: DateStruct) {
    let searchDate = {
      from_date: SearchFrom,
      to_date: SearchTo
    }
    return this.http.post(this.apiUrl + "excelExport/exporthospitals?searchTerms=" + SearchTerms + '&searchType=' + SearchType + '&searchStatus=' + SearchStatus + '&searchState=' + SearchState + '&searchApplicationType=' + SearchApplicationType + '&searchStage=' + SearchStage, searchDate, { responseType: 'blob' });
  }

  exportPayTrackList(SearchTerms: string, SearchType: string, SearchStatus: string, SearchState: number, SearchApplicationType: number, SearchFrom: DateStruct, SearchTo: DateStruct) {
    let searchDate = {
      from_date: SearchFrom,
      to_date: SearchTo
    }
    return this.http.post(this.apiUrl + "excelExport/ExporPayementTracker?searchTerms=" + SearchTerms + '&searchType=' + SearchType + '&searchStatus=' + SearchStatus + '&searchState=' + SearchState + '&searchApplicationType=' + SearchApplicationType, searchDate, { responseType: 'blob' });
  }
  exporUserList(SearchTerms: string, searchRole: number, SearchStatus: string, SearchFrom: DateStruct, SearchTo: DateStruct) {
    let searchDate = {
      from_date: SearchFrom,
      to_date: SearchTo
    }
    return this.http.post(this.apiUrl + "excelExport/exportusers?searchTerms=" + SearchTerms + '&searchRole=' + searchRole + '&searchStatus=' + SearchStatus, searchDate, { responseType: 'blob' });
  }
  getCertifiedHospData(SearchTerms: string, SearchType: string, SearchState: number, SearchCity: number, offset: number, limit: number) {



    return this.http.post<CertifiedHospitalList>(this.apiUrl + "users/certifiedHospitalList?searchTerms=" + SearchTerms + '&searchType=' + SearchType + '&searchState=' + SearchState + '&searchCity=' + SearchCity + '&offset=' + offset + '&limit=' + limit, {});
  }
  getHospListDaAllocation(SearchTerms: string, SearchType: string, SearchAssessor: number, SearchState: number, SearchStage: number, SearchApplicationType: number, SearchFrom: DateStruct, SearchTo: DateStruct, offset: number, limit: number) {


    let searchDate = {
      from_date: SearchFrom,
      to_date: SearchTo
    }
    return this.http.post<DA_AllocationList>(this.apiUrl + "users/getHospListDaAllocation?searchTerms=" + SearchTerms + '&searchType=' + SearchType + '&searchAssessor=' + SearchAssessor + '&searchState=' + SearchState + '&searchApplicationType=' + SearchApplicationType + '&searchStage=' + SearchStage + '&offset=' + offset + '&limit=' + limit, searchDate);
  }
  activateDeactivateHosp(action: number, id: number, remarks: string) {
    return this.http.post<any>(this.apiUrl + "users/activateDeactivateHosp?action=" + action + "&id=" + id + "&remarks=" + remarks, {})

  }
  rejectHosp(action: number, reason: string, id: number) {
    return this.http.put<any>(this.apiUrl + "users/rejectHosp?action=" + action + "&reason=" + reason + "&id=" + id, {})

  }

  getAssessorList() {

    return this.http.get<any>(this.apiUrl + "users/assessorDetailForAllocation");
  }
  allocateDa(hospid: number, daid: number, assessmentDate: DateStruct) {
    ////debugger
    return this.http.post<any>(this.apiUrl + "users/allocateDa", { hospital_id: hospid, da_id: daid, assessment_date: assessmentDate });
  }
  getApplicationTrackingDropDownData() {
    return this.http.get<any>(this.apiUrl + "users/applicationTrackingListDropdown");
  }


  public updateUser(userData: User) {

    return this.http.post<any>(this.apiUrl + "users", userData);
  }

  public saveUser(userData: User) {

    return this.http.put<any>(this.apiUrl + "users", userData);
  }

  public deleteUser(userId) {
    return this.http.delete<any>(this.apiUrl + "users/" + userId);
  }

  exportHDAList(SearchTerms: string, SearchType: string, SearchAssessor: number, SearchState: number, SearchStage: number, SearchApplicationType: number, SearchFrom: DateStruct, SearchTo: DateStruct) {
    let searchDate = {
      from_date: SearchFrom,
      to_date: SearchTo
    }
    return this.http.post(this.apiUrl + "excelExport/exportDA?searchTerms=" + SearchTerms + '&searchType=' + SearchType + '&searchAssessor=' + SearchAssessor + '&searchState=' + SearchState + '&searchApplicationType=' + SearchApplicationType + '&searchStage=' + SearchStage, searchDate, { responseType: 'blob' });
  }

  // rrc
  //#region OA

  getHospList_OaAllocation(FilterRow: OaAllocationFilter) {
    let url: string = "";
    url = this.apiUrl + "users/getHospList_OaAllocation";

    return this.http.post<OA_AllocationList>(url, FilterRow);
  }

  getHospListAllochystry(hospid: number) {
    debugger
    let url: string = "";
    url = this.apiUrl + "users/getHospListAssessmentDateHstry";

    return this.http.post<HosptalAssesmnetDateHistryList>(url, hospid, {});
  }

  getAsrrAllochystry(cls: AssessorHistryAdmin) {
    debugger
    let url: string = "";
    url = this.apiUrl + "users/getAssesorAssessmentDateHstry";

    return this.http.post<HosptalAssesmnetDateHistryList>(url, cls);
  }
  // allocateOA(hospid: number, Pasrid: number, asrid: number, asmtDate: DateStruct) {    
  //   return this.http.post<any>(this.apiUrl + "users/allocateOA", { hospital_id: hospid, poa_id: Pasrid, oa_id: asrid, assessment_date: asmtDate });
  // }

  allocateOA(oaAlloc: OaAllocationCls) {
    return this.http.post<any>(this.apiUrl + "users/allocateOA", oaAlloc);
  }

  // exportHOAList(FilterRow: OaAllocationFilter) {
  //   let url: string = "";
  //   url = this.apiUrl + "users/getHospList_OaAllocation";
  //   return this.http.post(this.apiUrl + "excelExport/exportDA?searchTerms=" + SearchTerms + '&searchType=' + SearchType + '&searchAssessor=' + SearchAssessor + '&searchState=' + SearchState + '&searchApplicationType=' + SearchApplicationType + '&searchStage=' + SearchStage, searchDate, { responseType: 'blob' });
  // }

  //#endregion


  //#region CC

  getHospList_CcAllocation(FilterRow: CcAllocationFilter) {
    let url: string = "";
    url = this.apiUrl + "users/getHospList_CcAllocation";

    return this.http.post<CC_AllocationList>(url, FilterRow);
  }

  allocateCC(hospid: number, ccid: number, asmtDate: DateStruct) {
    return this.http.post<any>(this.apiUrl + "users/allocateCC", { hospital_id: hospid, cc_id: ccid, Committe_date: asmtDate });
  }



  getAccepptRejectData(hospid: number) {

    return this.http.post<Oa_AssessemtHistry>(this.apiUrl + "dashboard/getHospList_OaAllocation?hospid=" + hospid, {});
  }

  getAccepptRejectDataAsr(hospid: number) {

    return this.http.post<Oa_AssessemtHistry>(this.apiUrl + "dashboard/getHospList_OaAllocationAsr?hospid=" + hospid, {});
  }
  getExtensionlOgtData(hospid: number) {

    return this.http.post<ExtentionLogHistry>(this.apiUrl + "users/getExtensionlog?hospid=" + hospid, {});
  }

  actionByHco(hosp_id: number, AllocItm: OaAllocationAction) {
    let url: string = "";
    url = this.apiUrl + "dashboard/actionByHco?hosp_id=" + hosp_id;

    return this.http.post<any>(url, AllocItm);
  }

  actionByAssessor(hosp_id: number, AllocItm: OaAllocationAction) {
    let url: string = "";
    url = this.apiUrl + "dashboard/actionByAssessor?hosp_id=" + hosp_id;

    return this.http.post<any>(url, AllocItm);
  }

  ReapplyOrRennewFormByHosp(reapplyOrRenew: ReapplyOrRenew) {

    return this.http.post<any>(this.apiUrl + "hospitalSections/HospitalReapplyOrRenew", reapplyOrRenew);
  }
  // ReapplyOrRennewFormByHosp(application_type: number) {
  //   debugger
  //   return this.http.post<any>(this.apiUrl + "hospitalSections/HospitalReapplyOrRenew?application_type=" + application_type, {});
  // }
  // exportHCCList(FilterRow: CcAllocationFilter) {
  //   let url: string = "";
  //   url = this.apiUrl + "users/getHospList_CcAllocation";
  //   return this.http.post(this.apiUrl + "excelExport/exportDA?searchTerms=" + SearchTerms + '&searchType=' + SearchType + '&searchAssessor=' + SearchAssessor + '&searchState=' + SearchState + '&searchApplicationType=' + SearchApplicationType + '&searchStage=' + SearchStage, searchDate, { responseType: 'blob' });
  // }

  //#endregion


} // ends export
