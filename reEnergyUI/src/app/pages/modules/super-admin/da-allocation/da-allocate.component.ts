import { Component, OnInit } from '@angular/core';
import { DateStruct } from 'src/app/pages/model/hospital/SupportService.model';
import { AdminService } from 'src/app/pages/api-services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
@Component({
  selector: 'app-da-allocate',
  templateUrl: './da-allocate.component.html',
  styleUrls: ['./da-allocate.component.scss']
})
export class DaAllocateComponent implements OnInit {
  hospitalList: DA_AllocationList
  stateDropdown: dropDownData[]
  stageDropdown: dropDownData[]
  assessorDropdown: AssessorDetailForAllocation[]
  assessorFilterDropdown: dropDownData[]
  SelectedAssessorId: number
  currentAssessorName: string
  SelectedHospId: number
  SelectedHospAssessmentDate: DateStruct
  SelectedAssessorDetails: AssessorDetailForAllocation
  CurrentAssessorid: number

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

  // rrc
  currentUser: any;
  currUsrRoleId: number = 0;
  name: String = "";
  type: String = "";
  senction_beds: string = "";
  district: string = "";
  state: String = "";
  asrProfile_image: string = "";

  Imgurl: any = '../../../../assets/images/users/avatar-1.png';
  tt: AssessorDetailForAllocation[];
  ttt: AssessorDetailForAllocation[];
  // rrc

  constructor(private modalService: NgbModal, private adminService: AdminService, private fileUpldSrvc: FileUploadService) {

    this.hospitalList = new DA_AllocationList();
    this.getDropDownData();

  }

  ngOnInit(): void {
    //rrc
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
      this.stageDropdown = res.stagedropdown.filter(x => x.value == 40 || x.value == 45 || x.value == 50 || x.value == 60 || x.value == 70 || x.value == 80 || x.value == 90 || x.value == 100);;

      this.assessorFilterDropdown = res.assessordropdown;

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
    this.SearchAssessor = 0;
    this.SearchApplicationType = null
    this.SearchFrom = null
    this.SearchTo = null
    this.limit = 10;
    this.getHospitalList();

  }

  getHospitalList() {


    let tt = this.SearchFrom;
    this.adminService.getHospListDaAllocation(this.SearchTerms, this.SearchType, this.SearchAssessor, this.SearchState, this.SearchStage, this.SearchApplicationType, this.SearchFrom, this.SearchTo, 0, this.limit).subscribe(res => {

      this.hospitalList = res;
      this.totalCount = this.hospitalList.total;
      console.log(res);

    }, error => {
      console.log(error);
    });

  }
  exportData() {

    var d = "Hospital DA List";
    var e = this.today;
    // var item = "testhost.xlsx";
    var item = d + e + ".xlsx";


    this.adminService.exportHDAList(this.SearchTerms, this.SearchType, this.SearchAssessor, this.SearchState, this.SearchStage, this.SearchApplicationType, this.SearchFrom, this.SearchTo).subscribe(
      (response) => {
        console.log(response);
        var blob = new Blob([response], {});
        saveAs(blob, item);

      },
      e => { (e); }
    );
  }
  pageChanged(pageNo) {

    this.minCount = 1 + (this.limit * (pageNo - 1));
    this.maxCount = this.limit + (this.limit * (pageNo - 1));

    if (this.totalCount < this.maxCount) {
      this.maxCount = this.totalCount;
    }

    this.skip = ((pageNo - 1) * this.limit);
    this.adminService.getHospListDaAllocation(this.SearchTerms, this.SearchType, this.SearchAssessor, this.SearchState, this.SearchStage, this.SearchApplicationType, this.SearchFrom, this.SearchTo, this.skip, this.limit).subscribe(res => {

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
  daAllocate(record: HospitalList_DaAllocationDto, daAllocatemodal: any) {

    this.SelectedAssessorDetails = null;
    this.SelectedHospAssessmentDate = null;
    this.adminService.getAssessorList().subscribe(res => {


      this.assessorDropdown = res;

      //  this.CurrentAssessorid=record.current_da_id;
      this.SelectedHospId = record.hosp_id;
      this.SelectedAssessorId = record.current_da_id;
      this.name = record.org_name;
      this.type = record.type;
      this.senction_beds = record.senction_bed;
      this.district = record.district;
      this.state = record.state



      this.tt = this.assessorDropdown.filter(x => x.assr_id == record.current_da_id)

      if (this.tt.length > 0) {
        if (this.tt[0].photourl != null && this.tt[0].photourl.trim().length > 0) {
          this.downloadAsrDP();
        } else {
          this.Imgurl = '../../../../assets/images/users/avatar-1.png';
        }
        this.SelectedAssessorDetails = this.tt[0];
      }


    }, error => {
      console.log(error);
    });

    this.modalService.open(daAllocatemodal, { size: 'lg' });

  }

  downloadAsrDP() {
    var vorgfn = "";

    var str_array = this.tt[0].photourl.split('||');
    vorgfn = str_array[0].split('|')[1];

    var result = this.fileUpldSrvc.downloadUploadedFile(vorgfn);
    result.subscribe(res => {
      if (res.isSuccess == true) {
        this.asrProfile_image = res.message;
        this.Imgurl = res.message;
      }
      else {
        console.log("Assessor profile pic " + res.message);
      }
    }, error => {
      //console.log(error);
    })
  }
  downloadAsrDP1() {
    var vorgfn = "";

    var str_array = this.ttt[0].photourl.split('||');
    vorgfn = str_array[0].split('|')[1];

    var result = this.fileUpldSrvc.downloadUploadedFile(vorgfn);
    result.subscribe(res => {
      if (res.isSuccess == true) {
        this.asrProfile_image = res.message;
        this.Imgurl = res.message;
      }
      else {
        console.log("Assessor profile pic " + res.message);
      }
    }, error => {
      //console.log(error);
    })
  }
  assessorSelection(data) {

    this.ttt = this.assessorDropdown.filter(x => x.assr_id == this.SelectedAssessorId)
    if (this.ttt.length > 0) {

      if (this.ttt[0].photourl != null && this.ttt[0].photourl.trim().length > 0) {
        //debugger
        this.downloadAsrDP1();
      } else {
        this.Imgurl = '../../../../assets/images/users/avatar-1.png';
      }
      this.SelectedAssessorDetails = this.ttt[0];
    }


  }

  allocateDa() {

    this.daalloc_loading = true;


    this.adminService.allocateDa(this.SelectedHospId, this.SelectedAssessorId, this.SelectedHospAssessmentDate).subscribe(res => {

      if (res.isSuccess) {
        this.modalService.dismissAll();
        Swal.fire("", "<p style='font-size: 1.5em'>" + res.message + " </p>", 'success');

      }
      else {
        Swal.fire("", "<p style='font-size: 1.5em'>" + res.message + " </p>", 'error');
      }


      this.daalloc_loading = false;
      this.getHospitalList()



    }, error => {
      this.daalloc_loading = false;
      console.log(error);
    });


  }


}
export class DA_AllocationList {
  current: number
  total: number
  rowCount: number
  rows: HospitalList_DaAllocationDto[]
}

export class HospitalList_DaAllocationDto {
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
  district: string
  senction_bed: string

}
class dropDownData {
  value: number
  text: String

}
class AssessorDetailForAllocation {
  assr_id: number
  assr_name: string

  qualification: string
  experience: number

  city: string
  district: string
  state: string
  specilities: string

  da_completed_count: number
  photourl: string = "";
}