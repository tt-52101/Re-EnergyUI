import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/pages/api-services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';

@Component({
  selector: 'app-application-tracer',
  templateUrl: './application-tracer.component.html',
  styleUrls: ['./application-tracer.component.scss']
})
export class ApplicationTracerComponent implements OnInit {

  minCount: number = 1;
  totalCount: number = 0;
  public enties = [25, 50, 100, 200];
  maxCount: number = 10;
  skip: number = 0;
  // stateDropdown: dropDownData[]
  // stageDropdown: dropDownData[]
  // SearchTerms: string = "";
  // SearchState: number = 0;
  // SearchType: string = null;
  // SearchStage: number = 0;
  // SearchStatus: string = null;
  // SearchApplicationType: number = 0;
  // SearchFrom: DateStruct = null
  // SearchTo: DateStruct = null
  // limit: number = 10;
  // offset: number = 0;
  // applicationList: PayemntTracker;
  // currentUser: any;
  // currUsrRoleId: number = 0;
  // rptUrl: string;
  dummy_data=[
    {customerid:'REP-C-00005',customer:'XXXX',state:'Vienaa',passcategory:'5-day Pass',amount:'54',paymentdate:'21-Jul-2021',transation:'ABC001'}
  ]
  dummy_datas=[
    {studioid:'500001',name:'Fintness Plants',studiotype:'Fitness Center',totalpayment:''}
  ]
  constructor(private uploadService: FileUploadService, private authenticationService: AuthenticationService, private tostr: CustomTosterServiceService, private dtpip: DatePipe, private router: Router, private modalService: NgbModal, private adminService: AdminService) {
    // this.applicationList = new PayemntTracker();
    // this.rptUrl = this.authenticationService.rptUrl;
    // this.getDropDownData();
  }

  ngOnInit(): void {

    // this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));

    // if (this.currentUser) {
    //   if (this.currentUser.roleId && this.currentUser.roleId > 0)
    //     this.currUsrRoleId = this.currentUser.roleId;
    // }
   

  }

  // getDropDownData() {
  //   this.adminService.getApplicationTrackingDropDownData().subscribe(res => {

  //     this.stateDropdown = res.statedropdown;
  //     this.stageDropdown = res.stagedropdown;

  //     this.getApplicationList()

  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // pageChanged(pageNo) {

  //   this.minCount = 1 + (this.limit * (pageNo - 1));
  //   this.maxCount = this.limit + (this.limit * (pageNo - 1));

  //   if (this.totalCount < this.maxCount) {
  //     this.maxCount = this.totalCount;
  //   }

  //   this.skip = ((pageNo - 1) * this.limit);
  //   this.adminService.getPaymentTracking(this.SearchTerms, this.SearchType, this.SearchStatus, this.SearchState, this.SearchApplicationType, this.SearchStage, this.skip, this.limit, this.SearchTo, this.SearchFrom).subscribe(res => {
  //     this.applicationList = res;
  //   })




  // }

  // downloadPmytReciept(hospid) {


  //   let urlCert = this.rptUrl + "rptPaymentslip.aspx?hcopkid=" + hospid + "&accesstoken=" + this.currentUser.accessToken + "&type=invrcpt" + "&invoicefor=application1";
  //   window.open(urlCert, "_blank");
  // }
  // downloadPmytInvoice(hospid) {

  //   let urlCert = this.rptUrl + "rptPaymentslip.aspx?hcopkid=" + hospid + "&accesstoken=" + this.currentUser.accessToken + "&type=invrpt" + "&invoicefor=application";
  //   debugger
  //   window.open(urlCert, "_blank");
  // }
  // getApplicationList() {
  //   this.adminService.getPaymentTracking(this.SearchTerms, this.SearchType, this.SearchStatus, this.SearchState, this.SearchApplicationType, this.SearchStage, this.offset, this.limit, this.SearchTo, this.SearchFrom).subscribe(res => {
  //     this.applicationList = res;
  //     this.totalCount = this.applicationList.total;
  //   })
  // }

  // exportData() {
  //   let latest_date = this.dtpip.transform(new Date(), 'dd-MMM-yyyy');
  //   console.log(".. latest_date .. " + latest_date);

  //   var d = "Organisation Payment Data ";

  //   var item = d + latest_date + ".xlsx";


  //   this.adminService.exportPayTrackList(this.SearchTerms, this.SearchType, this.SearchStatus, this.SearchState, this.SearchApplicationType, this.SearchFrom, this.SearchTo).subscribe(
  //     (response) => {
  //       console.log(response);
  //       var blob = new Blob([response], {});
  //       saveAs(blob, item);

  //     },
  //     e => { (e); }
  //   );
  // }

  // downloadUploadFile(item) {

  //   var result = this.uploadService.downloadUploadedFile(item);
  //   result.subscribe(res => {
  //     if (res.isSuccess == true) {
  //       window.open(res.message);
  //     }
  //     else {
  //       this.tostr.error(res.message);
  //     }
  //   }, error => {
  //     //console.log(error);
  //   })
  // }
  // searchReset() {
  //   this.SearchTerms = "";
  //   this.SearchState = 0;
  //   this.SearchType = null;
  //   this.SearchStage = 0;
  //   this.SearchStatus = null;
  //   this.SearchApplicationType = null
  //   this.SearchFrom = null
  //   this.SearchTo = null
  //   this.limit = 10;
  //   this.getApplicationList();

  // }
}
class dropDownData {
  value: number
  text: String

}