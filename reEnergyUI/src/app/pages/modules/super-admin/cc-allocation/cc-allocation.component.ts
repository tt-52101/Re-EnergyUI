import { Component, OnInit } from '@angular/core';
import { DateStruct } from 'src/app/pages/model/hospital/SupportService.model';
import { AdminService } from 'src/app/pages/api-services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { CcAllocationFilter } from '../../../model/FilterRow.model';
import { SearchDate } from '../../../model/FilterRow.model';

@Component({
  selector: 'app-cc-allocation',
  templateUrl: './cc-allocation.component.html',
  styleUrls: ['./cc-allocation.component.scss']
})

export class CcAllocationComponent implements OnInit {

  hospitalList: CC_AllocationList
  stateDropdown: dropDownData[]
  stageDropdown: dropDownData[]
  FilterDropdown_CometeMember: dropDownData[];
  SelectedCometeMemberId: number
  SelectedHospId: number
  SelectedHospCometeDate: DateStruct

  totalCount: number = 0;
  minCount: number = 1;
  maxCount: number = 10;
  skip: number = 0;
  public enties = [25, 50, 100, 200];

  SearchTerms: string = "";
  SearchState: number = 0;
  SearchType: string = null;
  SearchStage: number = 0;
  SearchAssessor: number = 0;
  SearchApplicationType: number = null
  SearchFrom: DateStruct = null
  SearchTo: DateStruct = null
  limit: number = 10;
  daalloc_loading = false;
  today: string;
  FilterRow: CcAllocationFilter;
  searchDt: SearchDate;
  selectedRec: HospitalList_AllocationDto;
  currentUser: any;
  currUsrRoleId: number = 0;

  constructor(private modalService: NgbModal, private adminService: AdminService) {

    this.hospitalList = new CC_AllocationList();
    this.getDropDownData();
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));

    if (this.currentUser) {
      if (this.currentUser.roleId && this.currentUser.roleId > 0)
        this.currUsrRoleId = this.currentUser.roleId;
    }

    this.FilterRow = new CcAllocationFilter();
    this.searchDt = new SearchDate();
    this.selectedRec = new HospitalList_AllocationDto();

    this.searchDt.from_date = null;
    this.searchDt.to_date = null;
    this.FilterRow.search_date = null;
    this.FilterRow.search_date = this.searchDt;

    this.FilterRow.SearchTerms = "";
    this.FilterRow.SearchState = 0;
    this.FilterRow.SearchType = null;
    this.FilterRow.SearchStage = 0;
    this.FilterRow.SearchCometeMember = 0;
    this.FilterRow.SearchApplicationType = null
    this.FilterRow.limit = 10;
    this.FilterRow.offset = 0;

    this.today = moment().format("DD-MMM-YYYY");
  }

  getDropDownData() {
    this.adminService.getApplicationTrackingDropDownData().subscribe(res => {

      this.stateDropdown = res.statedropdown;
      this.stageDropdown = res.ccstagesdropdown;

      this.FilterDropdown_CometeMember = res.cometememberdropdown;

      this.getHospitalList_Allocation();

    }, error => {
      console.log(error);
    });

  }

  searchReset() {
    this.FilterRow = new CcAllocationFilter();
    this.searchDt = new SearchDate();

    this.searchDt.from_date = null;
    this.searchDt.to_date = null;
    this.FilterRow.search_date = null;
    this.FilterRow.search_date = this.searchDt;

    this.FilterRow.SearchTerms = "";
    this.FilterRow.SearchState = 0;
    this.FilterRow.SearchType = null;
    this.FilterRow.SearchStage = 0;
    this.FilterRow.SearchCometeMember = 0;
    this.FilterRow.SearchApplicationType = null
    this.FilterRow.limit = 10;

    this.SearchTerms = "";
    this.SearchState = 0;
    this.SearchType = null;
    this.SearchStage = 0;
    this.SearchAssessor = 0;
    this.SearchApplicationType = null
    this.SearchFrom = null
    this.SearchTo = null
    this.limit = 10;
    this.getHospitalList_Allocation();

  }

  getHospitalList_Allocation() {
    let tt = this.SearchFrom;

    this.searchDt = new SearchDate();
    this.FilterRow.search_date = null;

    this.searchDt.from_date = this.SearchFrom;
    this.searchDt.to_date = this.SearchTo;
    this.FilterRow.search_date = this.searchDt;

    // this.FilterRow.limit = this.limit;
    // this.FilterRow.offset = 0;

    this.adminService.getHospList_CcAllocation(this.FilterRow).subscribe(res => {

      this.hospitalList = res;
      this.totalCount = this.hospitalList.total;
      console.log(".. this.FilterRow.limit .." + this.FilterRow.limit);
      console.log(".. this.hospitalList ..");
      console.log(this.hospitalList);


    }, error => {
      console.log(error);
    });

  }

  exportData() {
    Swal.fire("", "<p style='font-size: 1.5em'> Work in Progress !! </p>", 'success');
    if (1 == 1) return;

    var d = "Hospital OA List";
    var e = this.today;
    var item = d + e + ".xlsx";

    // this.adminService.exportHCCList(this.SearchTerms, this.SearchType, this.SearchAssessor, this.SearchState, this.SearchStage, this.SearchApplicationType, this.SearchFrom, this.SearchTo).subscribe(
    //   (response) => {
    //     console.log(response);
    //     var blob = new Blob([response], {});
    //     saveAs(blob, item);

    //   },
    //   e => { (e); }
    // );

  }

  pageChanged(pageNo) {

    this.minCount = 1 + (this.FilterRow.limit * (pageNo - 1));
    this.maxCount = this.FilterRow.limit + (this.FilterRow.limit * (pageNo - 1));

    if (this.totalCount < this.maxCount) {
      this.maxCount = this.totalCount;
    }

    this.skip = ((pageNo - 1) * this.FilterRow.limit);
    this.FilterRow.offset = this.skip;

    this.searchDt = new SearchDate();
    this.searchDt.from_date = this.SearchFrom;
    this.searchDt.to_date = this.SearchTo;
    this.FilterRow.search_date = null;
    this.FilterRow.search_date = this.searchDt;

    this.adminService.getHospList_CcAllocation(this.FilterRow).subscribe(res => {

      this.hospitalList = res;
      console.log(res);

    }, error => {
      console.log(error);
    });

  }

  showEnteries() {
    this.skip = 0;
    this.getHospitalList_Allocation();
  }

  AllocateCC(record: HospitalList_AllocationDto, oaAllocateModal: any) {

    this.selectedRec = record;
    this.SelectedHospCometeDate = null;

    this.SelectedHospId = record.hosp_id;
    this.SelectedCometeMemberId = record.oaid;

    // this.adminService.getAssessorList().subscribe(res => {

    //   this.assessorDropdown = res;

    //   this.SelectedHospId = record.hosp_id;
    //   this.SelectedCometeMemberId = record.oaid;    

    //   // let tt = this.assessorDropdown.filter(x => x.assr_id == record.current_da_id)
    //   // if (tt.length > 0) {
    //   //   this.SelectedAssessorDetails = tt[0];
    //   // }

    // }, error => {
    //   console.log(error);
    // });

    this.modalService.open(oaAllocateModal, { size: 'lg' });

  }

  CometeMemberSelection(data) {
    // let tt = this.assessorDropdown.filter(x => x.assr_id == this.SelectedCometeMemberId)

    // if (tt.length > 0) {
    //   this.SelectedAssessorDetails = tt[0];
    // }

  }

  allocateCCnow() {
    this.daalloc_loading = true;

    this.adminService.allocateCC(this.SelectedHospId, this.SelectedCometeMemberId, this.SelectedHospCometeDate).subscribe(res => {

      if (res.isSuccess) {
        this.modalService.dismissAll();
        Swal.fire("", "<p style='font-size: 1.5em'>" + res.message + " </p>", 'success');

      }
      else {
        Swal.fire("", "<p style='font-size: 1.5em'>" + res.message + " </p>", 'error');
      }

      this.daalloc_loading = false;
      this.getHospitalList_Allocation()

    }, error => {
      this.daalloc_loading = false;
      console.log(error);
    });

  }


} // ends export


export class CC_AllocationList {
  current: number
  total: number
  rowcount: number
  rows: HospitalList_AllocationDto[]
}

export class HospitalList_AllocationDto {
  hosp_id: number
  reference_id: String
  org_name: String
  state_id: number
  state: String
  application_type: String
  application_no: String
  registration_date: Date
  assessment_date: Date
  stage: String
  type: String
  stage_id: number
  status: boolean
  current_da: string
  current_da_id: number

  oaid: number;
  oa: string;
  principaloaid: number;
  principaloa: string;

  committeedate: Date
  cometemember_id: number;
  cometemember: string;
  total_bed_strength: string;
  district: string;
}

class dropDownData {
  value: number
  text: String
}

