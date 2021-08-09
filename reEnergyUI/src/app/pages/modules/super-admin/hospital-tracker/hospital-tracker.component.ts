import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateStruct } from 'src/app/pages/model/hospital/SupportService.model';
import { AdminService } from 'src/app/pages/api-services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { FormBuilderDataShareService } from '../../formbuilder/datashareservices/FormBuilderDataShareService';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';

@Component({
  selector: 'app-hospital-tracker',
  templateUrl: './hospital-tracker.component.html',
  styleUrls: ['./hospital-tracker.component.scss']
})
export class HospitalTrackerComponent implements OnInit {
  hospitalList: applicationTrackerList
  stateDropdown: dropDownData[]
  stageDropdown: dropDownData[]
  selectedHospStageHistory: StageHistory[];


  totalCount: number = 0;
  minCount: number = 1;
  maxCount: number = 10;
  skip: number = 0;
  public enties = [25, 50, 100, 200];

  SearchTerms: string = "";
  SearchState: number = 0;
  SearchType: string = null;
  SearchStage: number = 0;
  SearchStatus: string = null;
  SearchApplicationType: number = null
  SearchFrom: DateStruct = null
  SearchTo: DateStruct = null
  limit: number = 10;

  activateDeactivateHead = "";
  currentHospIdToActivateDeactivate = 0;
  hospital_id_to_reject = 0;
  activate_deactivate_action = 0;
  hospital_reject_action = null;
  activateDeactivateContent = "";
  loader = false;
  today: string;

  //rrc
  currentUser: any;
  currUsrRoleId: number = 0;
  workingdaysleft: string = "";
  //rrc
  action_type: number = null;
  Reason: string = null;
  remarks: string = null;
  extensionLogHstryLst: ExtentionLogHistryList;
  ExtentionLogHistry: ExtentionLogHistry;
  refrence_id: any;
  org_name: any;
  afterGetApi: boolean = false;


  constructor(private formBuilderdataservc: FormBuilderDataShareService, private tostr: CustomTosterServiceService, private dtpip: DatePipe, private router: Router, private modalService: NgbModal, private adminService: AdminService) {

    let apptype = window.history.state.type;
    if (apptype != null || apptype != undefined) {
      this.SearchType = apptype;
    }
    this.extensionLogHstryLst = new ExtentionLogHistryList();
    this.ExtentionLogHistry = new ExtentionLogHistry();
    this.hospitalList = new applicationTrackerList();

    this.getDropDownData();

  }

  ngOnInit(): void {
    //rrc    
    this.workingdaysleft = "";
    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));

    if (this.currentUser) {
      if (this.currentUser.roleId && this.currentUser.roleId > 0)
        this.currUsrRoleId = this.currentUser.roleId;
    }
    //rrc

    this.today = moment().format("DD-MMM-YYYY");
  }


  getDropDownData() {
    this.adminService.getApplicationTrackingDropDownData().subscribe(res => {

      this.stateDropdown = res.statedropdown;
      this.stageDropdown = res.stagedropdown;

      this.getHospitalList()

    }, error => {
      console.log(error);
    });
  }
  searchReset() {
    this.SearchTerms = "";
    this.SearchState = 0;
    this.SearchType = null;
    this.SearchStage = 0;
    this.SearchStatus = null;
    this.SearchApplicationType = null
    this.SearchFrom = null
    this.SearchTo = null
    this.limit = 10;
    this.getHospitalList();

  }

  getHospitalList() {


    let tt = this.SearchFrom;
    this.adminService.getApplicationTrackingData(this.SearchTerms, this.SearchType, this.SearchStatus, this.SearchState, this.SearchStage, this.SearchApplicationType, this.SearchFrom, this.SearchTo, 0, this.limit).subscribe(res => {

      this.hospitalList = res;
      this.totalCount = this.hospitalList.total;
      console.log(res);


    }, error => {
      console.log(error);
    });

  }
  public getHospitalListChck(): boolean {

    this.afterGetApi = false;
    let tt = this.SearchFrom;
    this.adminService.getApplicationTrackingData(this.SearchTerms, this.SearchType, this.SearchStatus, this.SearchState, this.SearchStage, this.SearchApplicationType, this.SearchFrom, this.SearchTo, 0, this.limit).subscribe(res => {

      this.hospitalList = res;
      this.totalCount = this.hospitalList.total;
      this.afterGetApi = true;

      console.log(res);
      return true;
    }, error => {
      console.log(error);
      return false;
    });
    return this.afterGetApi;
  }

  pageChanged(pageNo) {

    this.minCount = 1 + (this.limit * (pageNo - 1));
    this.maxCount = this.limit + (this.limit * (pageNo - 1));

    if (this.totalCount < this.maxCount) {
      this.maxCount = this.totalCount;
    }

    this.skip = ((pageNo - 1) * this.limit);
    this.adminService.getApplicationTrackingData(this.SearchTerms, this.SearchType, this.SearchStatus, this.SearchState, this.SearchStage, this.SearchApplicationType, this.SearchFrom, this.SearchTo, this.skip, this.limit).subscribe(res => {

      this.hospitalList = res;
      console.log(res);

    }, error => {
      console.log(error);
    });


  }
  showEnteries() {
    this.skip = 0;
    this.getHospitalList();
  }

  showStageHistory(record: applicationTracker, stagehistoryModal: any) {

    // rrc
    this.workingdaysleft = record.workingdaysleft;
    console.log("... Stage History for Record");
    console.log(record);
    // rrc

    this.selectedHospStageHistory = record.stage_history;
    this.modalService.open(stagehistoryModal, { size: 'md' });


  }
  activate_deactivate_hosp(action, id, hospactivateDeactivateModal: any, reference_id, org_name) {

    this.currentHospIdToActivateDeactivate = id;
    this.refrence_id = reference_id;
    this.org_name = org_name;
    if (action == 0) {
      this.activateDeactivateHead = "De-Activate Hospital";
      this.activateDeactivateContent = "Are you sure to De-Activate Hospital?";
      this.activate_deactivate_action = action;
    }
    else if (action == 1) {
      this.activateDeactivateHead = "Activate Hospital";
      this.activateDeactivateContent = "Are you sure to Activate Hospital?";
      this.activate_deactivate_action = action;
    }
    this.getExtensionLog();
    this.modalService.open(hospactivateDeactivateModal, { size: 'lg' });



  }

  openRejectModal(id, rejectModal: any) {

    this.hospital_id_to_reject = id;



    this.modalService.open(rejectModal, { size: 'md' });



  }
  rejectAction() {

    this.loader = true;

    this.adminService.rejectHosp(this.action_type, this.Reason, this.hospital_id_to_reject).subscribe(result => {

      if (result.isSuccess) {
        this.getHospitalList();
        this.tostr.success(result.message);
        this.modalService.dismissAll();
        // Swal.fire("", "<p style='font-size: 1.5em'>" + result.message + " </p>", 'success');

      }
      else {
        this.tostr.success(result.message);
        // Swal.fire("", "<p style='font-size: 1.5em'>" + result.message + " </p>", 'error');
        this.modalService.dismissAll();
      }

      this.loader = false;

    }, error => {
      this.loader = false;

    })
  }
  activateDeactivateAction() {

    this.loader = true;
    this.adminService.activateDeactivateHosp(this.activate_deactivate_action, this.currentHospIdToActivateDeactivate, this.remarks).subscribe(result => {

      if (result.isSuccess) {
        this.remarks = null;
        this.getExtensionLog();

        this.tostr.success(result.message);
        this.modalService.dismissAll();
        // this.modalService.dismissAll();

        // }
        // this.modalService.dismissAll();

        //  Swal.fire("", "<p style='font-size: 1.5em'>" + result.message + " </p>", 'success');

      }
      else {
        this.remarks = null;
        this.getExtensionLog();
        this.tostr.success(result.message);
        this.modalService.dismissAll();
        // Swal.fire("", "<p style='font-size: 1.5em'>" + result.message + " </p>", 'error');
      }

      this.loader = false;

    }, error => {
      this.loader = false;

    });

  }

  getExtensionLog() {


    if (this.currentHospIdToActivateDeactivate != null && this.currentHospIdToActivateDeactivate > 0) {

      this.adminService.getExtensionlOgtData(this.currentHospIdToActivateDeactivate).subscribe(res => {

        this.ExtentionLogHistry = res;

        this.getHospitalList();

      }, error => {
        console.log(error);
      });
    }
  }
  exportData() {
    let latest_date = this.dtpip.transform(new Date(), 'dd-MMM-yyyy');
    console.log(".. latest_date .. " + latest_date);

    var d = "Organisation Data ";
    // var e = this.today;
    // // var item = "testhost.xlsx";
    // var item = d + e + ".xlsx";
    var item = d + latest_date + ".xlsx";


    this.adminService.exportHospitalList(this.SearchTerms, this.SearchType, this.SearchStatus, this.SearchState, this.SearchStage, this.SearchApplicationType, this.SearchFrom, this.SearchTo).subscribe(
      (response) => {
        console.log(response);
        var blob = new Blob([response], {});
        saveAs(blob, item);

      },
      e => { (e); }
    );
  }
  viewHospital(record) {
    if (record.type.trim() == 'Hospital') {

      this.router.navigateByUrl('assessment/hospitalapplication', { state: { uid: record.hosp_id } })
      //redirect to hospform
    }
    else if (record.type.trim() == 'Centre') {
      this.router.navigateByUrl('assessment/centerHospitalapplication', { state: { uid: record.hosp_id } })
    }
  }



  openassessmentForm(data: applicationTracker) {


    this.formBuilderdataservc.setVendorData(data)
    this.router.navigateByUrl('onsiteassessment/assessmentDataFromMobile');



  }

}
export class applicationTrackerList {
  current: number
  total: number
  rowCount: number
  rows: applicationTracker[]
}

export class applicationTracker {
  hosp_id: number
  reference_id: String
  org_name: String
  state_id: number
  state: String
  application_type: String
  application_no: String
  registration_date: Date
  stage: String
  type: String
  stage_id: number
  status: boolean
  current_da: string
  current_da_id: number
  stage_history: StageHistory[]

  // rrc
  oadone: boolean;
  hiddenactionbtn_da: boolean;
  hiddenactionbtn_oa: boolean;
  hiddenactionbtn_advisory: boolean;
  hiddenactionbtn_remark: boolean;
  hiddenactionbtn_reject: boolean;

  stageid_timeline_workingdays: number;
  stageid_enddate: Date;
  workingdaysleft: string;
  // rrc

}

export class StageHistory {
  stage_id: number
  stage: string
  creation_date: Date
}
class dropDownData {
  value: number
  text: String

}

export class ExtentionLogHistryList {
  id: number;
  stage: string;
  extended_on: string | null;
  extended_upto: string | null;
  extended_by: string | null;
  remarks: string;
  stageid: number;
}

export class ExtentionLogHistry {

  ret: ExtentionLogHistryList[];
}