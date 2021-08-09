import { Component, OnInit } from '@angular/core';
import { DateStruct } from 'src/app/pages/model/hospital/SupportService.model';
import { AdminService } from 'src/app/pages/api-services/admin.service';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { OaAllocationFilter, OaAllocationCls } from '../../../model/FilterRow.model';
import { SearchDate } from '../../../model/FilterRow.model';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-oa-allocation',
  templateUrl: './oa-allocation.component.html',
  styleUrls: ['./oa-allocation.component.scss']
})

export class OaAllocationComponent implements OnInit {

  hospitalList: OA_AllocationList
  stateDropdown: dropDownData[]
  stageDropdown: dropDownData[]
  assessorDropdown: AssessorDetailForAllocation[]
  assessorFilterDropdown: dropDownData[]
  FilterDropdown_Asr_1: dropDownData[];
  FilterDropdown_nonPrincipalAsr: dropDownData[];
  SelectedHospId: number
  SelectedHospAsmtDate: DateStruct
  SelectedAsrDets_1: AssessorDetailForAllocation;
  SelectedAsrDets_2: AssessorDetailForAllocation;

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
  FilterRow: OaAllocationFilter;
  searchDt: SearchDate;
  selectedAsrId_1: number;
  selectedAsrId_2: number;
  currentUser: any;
  currUsrRoleId: number = 0;
  // lst_asmttype: asmtTypeCls[];
  // new_asmtType: asmtTypeCls;
  selectedAsmtType: number;
  currRow: HospitalList_AllocationDto;
  oaAllocCls: OaAllocationCls;
  capacity_1: number;
  capacity_2: number;

  public asrCapacityLst: Array<any> = [
    { id: 1, name: 'Principal Assessor' },
    { id: 2, name: 'Assessor' }
  ];

  public asmtTypeLst: Array<any> = [
    { id: 1, name: 'Physical Assessment' },
    { id: 2, name: 'Virtual Assessment' }
  ];

  public modalOptns: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg',
    windowClass: "myCustomModalClass",
  };

  Imgurl1: any = '../../../../assets/images/users/avatar-1.png';
  Imgurl2: any = '../../../../assets/images/users/avatar-1.png';
  ProfileImage_asr1: string = "";
  ProfileImage_asr2: string = "";
  SelectedHospId2: number;
  alochistry: HosptalAssesmnetDateHistryList;
  Asrheader: string = "";
  cls: AssessorHistryAdmin;
  asrid: number = 0;
  assrname: string = "";
  capacity: number = 0;
  minDate: { year: number; month: number; day: number; };
  todayy: Date;
  constructor(private modalService: NgbModal, private adminService: AdminService, private fileUpldSrvc: FileUploadService) {

    this.hospitalList = new OA_AllocationList();
    this.alochistry = new HosptalAssesmnetDateHistryList();
    this.cls = new AssessorHistryAdmin();
    this.getDropDownData();
  }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));

    if (this.currentUser) {
      if (this.currentUser.roleId && this.currentUser.roleId > 0)
        this.currUsrRoleId = this.currentUser.roleId;
    }

    this.currRow = new HospitalList_AllocationDto();
    this.selectedAsmtType = 1;

    // this.lst_asmttype = [];
    // this.new_asmtType = new asmtTypeCls();
    // this.new_asmtType.value = "Physical Assessment";
    // this.new_asmtType.text = "Physical Assessment";
    // this.lst_asmttype.push(this.new_asmtType);

    // this.new_asmtType = new asmtTypeCls();
    // this.new_asmtType.value = "Virtual Assessment";
    // this.new_asmtType.text = "Virtual Assessment";
    // this.lst_asmttype.push(this.new_asmtType);

    this.FilterRow = new OaAllocationFilter();
    this.searchDt = new SearchDate();

    this.searchDt.from_date = null;
    this.searchDt.to_date = null;
    this.FilterRow.search_date = null;
    this.FilterRow.search_date = this.searchDt;

    this.FilterRow.SearchTerms = "";
    this.FilterRow.SearchState = 0;
    this.FilterRow.SearchType = null;
    this.FilterRow.SearchStage = 0;
    this.FilterRow.SearchPrincipalAssessor = 0;
    this.FilterRow.SearchAssessor = 0;
    this.FilterRow.SearchApplicationType = null
    this.FilterRow.limit = 10;
    this.FilterRow.offset = 0;
    this.todayy = new Date();
    this.minDate = { year: new Date().getFullYear(), month: this.todayy.getUTCMonth() + 1, day: this.todayy.getUTCDate() };
    this.today = moment().format("DD-MMM-YYYY");

  }

  getDropDownData() {
    this.adminService.getApplicationTrackingDropDownData().subscribe(res => {

      this.stateDropdown = res.statedropdown;
      //this.stageDropdown = res.stagedropdown;  // rrc commented
      this.stageDropdown = res.oastagesdropdown; // rrc

      this.assessorFilterDropdown = res.assessordropdown;
      this.FilterDropdown_Asr_1 = res.principalassessordropdown;
      this.FilterDropdown_nonPrincipalAsr = res.nonprincipalassessordropdown;

      this.getHospitalList_Allocation();

    }, error => {
      console.log(error);
    });

  }

  searchReset() {
    this.FilterRow = new OaAllocationFilter();
    this.searchDt = new SearchDate();

    this.searchDt.from_date = null;
    this.searchDt.to_date = null;
    this.FilterRow.search_date = null;
    this.FilterRow.search_date = this.searchDt;

    this.FilterRow.SearchTerms = "";
    this.FilterRow.SearchState = 0;
    this.FilterRow.SearchType = null;
    this.FilterRow.SearchStage = 0;
    this.FilterRow.SearchPrincipalAssessor = 0;
    this.FilterRow.SearchAssessor = 0;
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

    this.adminService.getHospList_OaAllocation(this.FilterRow).subscribe(res => {

      this.hospitalList = res;
      this.totalCount = this.hospitalList.total;
      console.log(".. this.FilterRow.limit .." + this.FilterRow.limit);
      console.log(".. OA Allocation - this.hospitalList ..");
      console.log(this.hospitalList);

      this.getAllAssessorList();

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

    // this.adminService.exportHOAList(this.SearchTerms, this.SearchType, this.SearchAssessor, this.SearchState, this.SearchStage, this.SearchApplicationType, this.SearchFrom, this.SearchTo).subscribe(
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

    this.adminService.getHospList_OaAllocation(this.FilterRow).subscribe(res => {

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

  OpenModal_AllocateOA(record: HospitalList_AllocationDto, oaAllocateModal: any) {

    this.currRow = new HospitalList_AllocationDto();
    this.currRow = record;

    console.log(" Selected Row -> ");
    console.log(this.currRow);

    this.SelectedHospAsmtDate = null;
    this.SelectedHospAsmtDate = this.currRow.oa_asmtdate_struct;

    this.SelectedAsrDets_1 = null;
    this.SelectedAsrDets_1 = new AssessorDetailForAllocation();
    this.SelectedAsrDets_2 = null;
    this.SelectedAsrDets_2 = new AssessorDetailForAllocation();

    this.SelectedHospId = record.hosp_id;
    this.selectedAsrId_2 = record.oaid;
    this.selectedAsrId_1 = record.principaloaid;
    this.selectedAsmtType = record.oa_asmt_type;
    this.capacity_1 = record.capacity_1;
    this.capacity_2 = record.capacity_2;
    this.selectedAsrId_2 = record.oaid;
    this.selectedAsrId_1 = record.principaloaid;

    // load Asr 1 profile
    let prin = this.assessorDropdown.filter(x => x.assr_id == record.principaloaid)
    if (prin.length > 0) {
      if (prin[0].photourl != null && prin[0].photourl.trim().length > 0) {
        this.downloadAsrDP(prin[0].photourl.trim(), 1);
      } else {
        this.Imgurl1 = '../../../../assets/images/users/avatar-1.png';
      }

      this.SelectedAsrDets_1 = prin[0];
    }

    // load Asr 2 profile
    let norml = this.assessorDropdown.filter(x => x.assr_id == record.oaid)
    if (norml.length > 0) {
      if (norml[0].photourl != null && norml[0].photourl.trim().length > 0) {
        this.downloadAsrDP(norml[0].photourl.trim(), 2);
      } else {
        this.Imgurl2 = '../../../../assets/images/users/avatar-1.png';
      }

      this.SelectedAsrDets_2 = norml[0];
    }

    //this.modalService.open(oaAllocateModal, { size: 'lg' });
    this.modalService.open(oaAllocateModal, this.modalOptns);
  }
  openAssessmentDateModal(record: HospitalList_AllocationDto, asmthystryModel: any) {
    this.SelectedHospId2 = record.hosp_id;
    this.getAllocationHistry()
    this.modalService.open(asmthystryModel, { size: 'lg' });
  }
  downloadAsrDP(photourl, urlFor) {
    var vorgfn = "";

    var str_array = photourl.split('||');
    vorgfn = str_array[0].split('|')[1];

    var result = this.fileUpldSrvc.downloadUploadedFile(vorgfn);
    result.subscribe(res => {
      if (res.isSuccess == true) {
        if (urlFor == 1) { // asr 1
          this.ProfileImage_asr1 = res.message;
          this.Imgurl1 = res.message;
        }

        if (urlFor == 2) { // asr 2
          this.ProfileImage_asr2 = res.message;
          this.Imgurl2 = res.message;
        }

      }
      else {
        console.log("Assessor profile pic " + res.message);
      }
    }, error => {
      //console.log(error);
    })
  }

  downloadAsrDP1(photourl, urlFor) {
    var vorgfn = "";

    var str_array = photourl.split('||');
    vorgfn = str_array[0].split('|')[1];

    var result = this.fileUpldSrvc.downloadUploadedFile(vorgfn);
    result.subscribe(res => {
      if (res.isSuccess == true) {
        if (urlFor == 1) { // asr 1
          this.ProfileImage_asr1 = res.message;
          this.Imgurl1 = res.message;
        }

        if (urlFor == 2) { // asr 2
          this.ProfileImage_asr2 = res.message;
          this.Imgurl2 = res.message;
        }
      }
      else {
        console.log("Assessor profile pic " + res.message);
      }
    }, error => {
      //console.log(error);
    })

  }

  asrSelection_1(data) {
    this.SelectedAsrDets_1 = new AssessorDetailForAllocation();

    let tt = this.assessorDropdown.filter(x => x.assr_id == this.selectedAsrId_1)

    if (tt.length > 0) {
      if (tt[0].photourl != null && tt[0].photourl.trim().length > 0) {
        //debugger
        this.downloadAsrDP1(tt[0].photourl.trim(), 1);
      } else {
        this.Imgurl1 = '../../../../assets/images/users/avatar-1.png';
      }

      this.SelectedAsrDets_1 = tt[0];
    }

  }

  asrSelection_2(data) {
    this.SelectedAsrDets_2 = new AssessorDetailForAllocation();

    let tt = this.assessorDropdown.filter(x => x.assr_id == this.selectedAsrId_2)

    if (tt.length > 0) {
      if (tt[0].photourl != null && tt[0].photourl.trim().length > 0) {
        //debugger
        this.downloadAsrDP1(tt[0].photourl.trim(), 2);
      } else {
        this.Imgurl2 = '../../../../assets/images/users/avatar-1.png';
      }

      this.SelectedAsrDets_2 = tt[0];
    }

  }

  canAllocate() {
    let ret: Boolean = true;

    if (this.SelectedHospAsmtDate == null || this.SelectedHospAsmtDate == undefined) {
      ret = false;
      Swal.fire("", "<p style='font-size: 1.5em'> Assessment Date is mandatory !! </p>", 'error');
      return;
    }

    if (this.capacity_1 == null || this.capacity_1 == undefined || (this.capacity_1 != null && this.capacity_1 <= 0)) {
      ret = false;
      Swal.fire("", "<p style='font-size: 1.5em'> Capacity for Assessor 1 is mandatory !! </p>", 'error');
      return;
    }

    if (this.selectedAsrId_1 == null || this.selectedAsrId_1 == undefined || (this.selectedAsrId_1 != null && this.selectedAsrId_1 <= 0)) {
      ret = false;
      Swal.fire("", "<p style='font-size: 1.5em'> Assessor 1 is mandatory !! </p>", 'error');
      return;
    }

    if (this.selectedAsrId_1 == this.selectedAsrId_2) {
      ret = false;
      Swal.fire("", "<p style='font-size: 1.5em'> Both Assessor can't be same !! </p>", 'error');
      return;
    }

    if (this.capacity_1 == this.capacity_2) {
      ret = false;
      Swal.fire("", "<p style='font-size: 1.5em'> Both Capacity can't be same !! </p>", 'error');
      return;
    }

    if (this.capacity_1 > 0 && this.selectedAsrId_1 <= 0) {
      ret = false;
      Swal.fire("", "<p style='font-size: 1.5em'> Both Capacity & Assessor 1 are mandatory ! </p>", 'error');
      return;
    }

    if (this.selectedAsrId_1 > 0 && this.capacity_1 <= 0) {
      ret = false;
      Swal.fire("", "<p style='font-size: 1.5em'> Both Capacity & Assessor 1 are mandatory !! </p>", 'error');
      return;
    }

    return ret;
  }

  allocateOAnow() {

    var a = this.SelectedHospAsmtDate.day + "-" + this.SelectedHospAsmtDate.month + "-" + this.SelectedHospAsmtDate.year;
    var b = new Date(this.SelectedHospAsmtDate.year, this.SelectedHospAsmtDate.month - 1, this.SelectedHospAsmtDate.day);
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const todys = formatDate(b, 'yyyy-MM-dd', 'en');
    if (currentDate > todys) {
      Swal.fire("", "<p style='font-size: 1.5em'> The action can not be accepted now as the date has already been passed.</p>");
      return;
    }
    // if (1 == 1) {
    //   return;
    // }
    this.daalloc_loading = true;
    this.oaAllocCls = new OaAllocationCls();

    if (this.canAllocate() != true) {
      this.daalloc_loading = false;
      return;
    }

    this.oaAllocCls.asmt_date = this.SelectedHospAsmtDate;
    this.oaAllocCls.asmt_type = this.selectedAsmtType;
    this.oaAllocCls.capacity_1 = this.capacity_1;
    this.oaAllocCls.capacity_2 = this.capacity_2;
    this.oaAllocCls.hospital_id = this.SelectedHospId;
    this.oaAllocCls.oaid_1 = this.selectedAsrId_1;
    this.oaAllocCls.oaid_2 = this.selectedAsrId_2;

    console.log(" .. Data 2 Allocate ..");
    console.log(this.oaAllocCls);
    // this.daalloc_loading = false;
    // if (1 == 1) return;

    this.adminService.allocateOA(this.oaAllocCls).subscribe(res => {

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

  OpenAssesorHystry(record: HospitalList_AllocationDto, AsrhystryModel: any, type: number) {
    //vk
    this.SelectedHospId2 = record.hosp_id;


    if (type == 1) {
      this.Asrheader = "Assessor 1 History";
      this.asrid = record.principaloaid;
      this.assrname = record.principaloa;
      this.capacity = record.capacity_1;
    } else {
      this.Asrheader = "Assessor 2 History";
      this.asrid = record.oaid;
      this.assrname = record.oa;
      this.capacity = record.capacity_2;
    }
    this.getAssesorHistry()
    this.modalService.open(AsrhystryModel, { size: 'lg' });

  }

  onChange_asmtType(evnt) {
    //console.log(" Selected Asmt type -> " + this.selectedAsmtType);
  }


  getAllAssessorList() {

    this.adminService.getAssessorList().subscribe(res => {

      this.assessorDropdown = res;

    }, error => {
      console.log(error);
    });

  }

  getAllocationHistry() {

    this.adminService.getHospListAllochystry(this.SelectedHospId2).subscribe(res => {

      this.alochistry = res;


    }, error => {
      console.log(error);
    });

  }

  getAssesorHistry() {
    this.cls.hosp_id = this.SelectedHospId2;
    this.cls.asrid = this.asrid;
    this.cls.capacity = this.capacity;
    this.cls.asrname = this.assrname
    this.adminService.getAsrrAllochystry(this.cls).subscribe(res => {

      this.alochistry = res;


    }, error => {
      console.log(error);
    });

  }

} // ends export

export class AssessorHistryAdmin {
  hosp_id: number
  asrid: number
  asrname: string
  capacity: number

}
export class HosptalAssesmnetDateHistryList {

  id: number
  hosp_id: number
  asmt_type: string

  remark: string
  asmt_date: string

  status: boolean | null;

  allocation_Date: string

  allocated_by: string
  assessorname: string
  capacity: string
}
export class OA_AllocationList {
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

  districtid: number;
  district: string;
  total_bed_strength: string;
  assmt_type: string;
  oa_asmt_type: number; // rrc Physical/Virtual
  oa_asmtdate: Date;
  oa_asmtdate_struct: DateStruct;
  capacity_1: number; // rrc Principal Asr/Asr
  capacity_2: number; // rrc Principal Asr/Asr
}
class dropDownData {
  value: number
  text: String
}

class AssessorDetailForAllocation {
  assr_id: number;
  assr_name: string;

  qualification: string;
  experience: number;

  city: string;
  district: string;
  state: string;
  specilities: string;

  da_completed_count: number;
  oa_completed_count: number;

  photourl: string = "";
}

class asmtTypeCls {
  value: string;
  text: string;
}