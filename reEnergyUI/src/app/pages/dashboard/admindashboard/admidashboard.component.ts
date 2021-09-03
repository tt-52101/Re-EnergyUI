import { Component, OnInit, ViewChild } from '@angular/core';

import { statData } from '../admindashboard/admindata';

import { ChartType } from '../admindashboard/admindashboard.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http"

import { AdminService } from "../../api-services/admin.service";
import { UserSearchResponse, User } from "../../model/User.model";
import { DropdownData, DropDownService } from '../../api-services/dropdown.service';
import Swal from 'sweetalert2';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexLegend, ApexPlotOptions, ApexXAxis, ApexStroke, ApexTooltip, ApexYAxis, ApexFill } from 'ng-apexcharts';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admindashboard',
  templateUrl: '../admindashboard/admindashboard.component.html',
  styleUrls: ['../admindashboard/admindashboard.component.scss']
})

/**
 * Dashboard component
 */
export class AdminDashboardComponent implements OnInit {

  // emailSentBarChart: ChartType;
  // monthlyEarningChart: ChartType;
  // transactions;
  statData;
  rolesList: DropdownData[] = [];
  SearchTerms: string = "";
  SelectedRole: number = 0;
  limit: number = 10;
  editUser: EditUserCls;
  userSearchResponse: UserSearchResponse = <any>{};
  error = '';
  successmsg = false;
  msg: any;
  public appStatusChart: Partial<ChartOptions>;
  appStatus_count = 0
  public desktopAssessmentChart: Partial<ChartOptions>;
  desktopAssessment_count = 0;
  public onsiteAssessmentChart: Partial<ChartOptions>;
  onsiteAssessment_count = 0;
  public certificteCommitte: Partial<ChartOptions>;
  certificteCommitte_count = 0;
  analticAction = analytic_action;
  currentUser;
  currUsrRole




  @ViewChild('addUserModel', { static: false }) AddUserModel: any;
  constructor(private router: Router, private modalService: NgbModal, private http: HttpClient, private adminService: AdminService, private dropdownservice: DropDownService,) {
    const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.currentUser = currentUser;

    this.currUsrRole = this.currentUser.roleId;
  }

  ngOnInit() {


    /**
     * Fetches the data
     */
    this.fetchData();
   // this.getUserData();
    this.getRolesList();


    this.editUser = new EditUserCls();

  }


  /**
   * Fetches the data
   */
  private fetchData() {





  }

  // private getUserData() {

  //   this.adminService.getUserList(this.SearchTerms, this.SelectedRole, 0, this.limit).subscribe(res => {
  //     this.userSearchResponse = res;
  //     console.log(".. getUserData() ..");
  //     console.log(res);

  //     this.adminService.getAdminDashboardData().subscribe(data => {
  //       this.statData = [{

  //         icon: 'bx bx-building-house text-primary',
  //         title: 'Hospital Application',
  //         value: data.hosp_application_count,
  //         // route:"#",
  //         // route:this.currUsrRole==1? 'superadmin/applicationtracker':'admin/applicationtracker',
  //         action: this.analticAction.view_hosp_tracker


  //       }, {
  //         //bgchange: 'bg-soft-primary',
  //         icon: 'bx bx-badge-check text-success',
  //         title: 'Hospital Certified',
  //         value: data.certified_hosp_count,
  //         // route:"#",
  //         //  route:this.currUsrRole==1? 'superadmin/certified':'admin/certified'
  //         action: this.analticAction.view_hosp_certified

  //       }, {
  //         //bgchange: 'bg-soft-warning',
  //         icon: 'bx bx-store-alt text-primary',
  //         title: 'Centre Application',
  //         value: data.centre_hosp_application_count,
  //         // route:"#",
  //         //  route:this.currUsrRole==1? 'superadmin/applicationtracker':'admin/applicationtracker'
  //         action: this.analticAction.view_central_hospital_tracker

  //       },
  //       {
  //         //bgchange: 'bg-soft-danger',
  //         icon: 'bx bx-badge-check text-success',
  //         title: 'Centre Certified',
  //         value: data.centre_certified_hosp_count,
  //         // route:"#",
  //         //  route:this.currUsrRole==1? 'superadmin/certified':'admin/certified'
  //         action: this.analticAction.view_central_hosp_certified

  //       }]

  //       //Chart

  //       this.appStatus_count = data.application_status.total;
  //       this.desktopAssessment_count = data.desktop_assment_status.total;
  //       this.onsiteAssessment_count = data.onsite_assment_status.total;
  //       this.certificteCommitte_count = data.certificate_commiittee.total;

  //       this.appStatusChart = {
  //         series: [
  //           {
  //             name: "Organisation",
  //             data: data.application_status.organisation
  //           },
  //           {
  //             name: "Hospital",
  //             data: data.application_status.hospital
  //           },
  //           {
  //             name: "Centre",
  //             data: data.application_status.center
  //           },

  //         ],
  //         chart: {
  //           type: "bar",
  //           height: 350,
  //           stacked: true,
  //           toolbar: { show: false }
  //         },
  //         plotOptions: {
  //           bar: {
  //             horizontal: true
  //           }
  //         },
  //         stroke: {
  //           width: 1,
  //           colors: ["#fff"]
  //         },
  //         // title: {
  //         //   text: "Fiction Books Sales"
  //         // },
  //         xaxis: {
  //           categories: ['Registration', 'Specialities Selection', 'Application In Progress', 'Fee Submission', 'Payment Completed', 'Application Rejected'],
  //           labels: {
  //             formatter: function (val) {


  //               return val;
  //             }
  //           }
  //         },
  //         yaxis: {
  //           title: {
  //             text: undefined
  //           }
  //         },
  //         tooltip: {
  //           y: {
  //             formatter: function (val) {
  //               return val + "";

  //             }
  //           }
  //           , marker:
  //           {
  //             fillColors: ['#32a887', '#ff8080', '#ffbf00']
  //           }
  //         },
  //         fill: {
  //           opacity: 1,
  //           colors: ['#32a887', '#ff8080', '#ffbf00']

  //         },
  //         legend: {
  //           position: "bottom",
  //           horizontalAlign: "center",
  //           offsetX: 40,
  //           markers:
  //           {
  //             fillColors: ['#32a887', '#ff8080', '#ffbf00']
  //           }


  //         },


  //       };

  //       this.desktopAssessmentChart = {
  //         series: [
  //           {
  //             name: "Hospital",
  //             data: data.desktop_assment_status.hospital
  //           },
  //           {
  //             name: "Centre",
  //             data: data.desktop_assment_status.center
  //           }
  //         ],
  //         chart: {
  //           type: "bar",
  //           height: 350,
  //           stacked: true,
  //           toolbar: { show: false }
  //         },
  //         plotOptions: {
  //           bar: {
  //             horizontal: true
  //           }
  //         },
  //         stroke: {
  //           width: 1,
  //           colors: ["#fff"]
  //         },
  //         // title: {
  //         //   text: "Fiction Books Sales"
  //         // },
  //         xaxis: {
  //           categories: ['DA Allocated', 'DA In Progress', 'DA NC Reply-1', 'DA NC Review-1', 'DA NC Reply-2', 'DA NC Review-2', 'DA Accepted', 'DA Rejected'],
  //           labels: {
  //             formatter: function (val) {
  //               //  return parseFloat(val).toFixed(0);
  //               return val;
  //             }
  //           }
  //         },
  //         yaxis: {
  //           title: {
  //             text: undefined
  //           }
  //         },
  //         tooltip: {
  //           y: {
  //             formatter: function (val) {
  //               return val + "";

  //             }
  //           }
  //           , marker:
  //           {
  //             fillColors: ['#ff8080', '#ffbf00']
  //           }
  //         },
  //         fill: {
  //           opacity: 1,
  //           colors: ['#ff8080', '#ffbf00']

  //         },
  //         legend: {
  //           position: "bottom",
  //           horizontalAlign: "center",
  //           offsetX: 40,
  //           markers:
  //           {
  //             fillColors: ['#ff8080', '#ffbf00']
  //           }


  //         },

  //       };

  //       this.onsiteAssessmentChart = {
  //         series: [
  //           {
  //             name: "Hospital",
  //             data: data.onsite_assment_status.hospital
  //           },
  //           {
  //             name: "Centre",
  //             data: data.onsite_assment_status.center
  //           }
  //         ],
  //         chart: {
  //           type: "bar",
  //           height: 350,
  //           stacked: true,
  //           toolbar: { show: false }
  //         },
  //         plotOptions: {
  //           bar: {
  //             horizontal: true
  //           }
  //         },
  //         stroke: {
  //           width: 1,
  //           colors: ["#fff"]
  //         },
  //         // title: {
  //         //   text: "Fiction Books Sales"
  //         // },
  //         xaxis: {
  //           categories: ['OA Allocated', 'OA Date Rejected', 'OA Scheduled', 'OA In Progress', 'OA Completed', 'OA Feedback', 'OA NC Reply-1', 'OA NC Review-1', 'OA NC Reply-2', 'OA NC Review-2', 'OA Review Submitted'],
  //           labels: {
  //             formatter: function (val) {
  //               //return parseFloat(val).toFixed(0);
  //               return val;
  //             }
  //           }
  //         },
  //         yaxis: {
  //           title: {
  //             text: undefined
  //           }
  //         },
  //         tooltip: {
  //           y: {
  //             formatter: function (val) {
  //               return val + "";

  //             }
  //           }
  //           , marker:
  //           {
  //             fillColors: ['#ff8080', '#ffbf00']
  //           }
  //         },
  //         fill: {
  //           opacity: 1,
  //           colors: ['#ff8080', '#ffbf00']

  //         },
  //         legend: {
  //           position: "bottom",
  //           horizontalAlign: "center",
  //           offsetX: 40,
  //           markers:
  //           {
  //             fillColors: ['#ff8080', '#ffbf00']
  //           }


  //         },

  //       };

  //       this.certificteCommitte = {
  //         series: [
  //           {
  //             name: "Hospital",
  //             data: data.certificate_commiittee.hospital
  //           },
  //           {
  //             name: "Centre",
  //             data: data.certificate_commiittee.center
  //           }
  //         ],
  //         chart: {
  //           type: "bar",
  //           height: 350,
  //           stacked: true,
  //           toolbar: { show: false }
  //         },
  //         plotOptions: {
  //           bar: {
  //             horizontal: true
  //           }
  //         },
  //         stroke: {
  //           width: 1,
  //           colors: ["#fff"]
  //         },
  //         // title: {
  //         //   text: "Fiction Books Sales"
  //         // },
  //         xaxis: {
  //           categories: ['CC Allocated', 'CC Document Pending', 'CC Document Submitted', 'Recommended', 'Not Recommended'],


  //           labels: {

  //             formatter: function (val) {

  //               return val;
  //               //return parseFloat(val).toFixed(0);
  //             }
  //           }
  //         },

  //         yaxis: {
  //           labels: {
  //             formatter: function (value) {

  //               if (!isNaN(value)) {
  //                 return value.toFixed(1)
  //               }
  //               else {
  //                 return value + "";

  //               }

  //             }
  //           },
  //           title: {
  //             text: undefined
  //           }


  //         },
  //         tooltip: {
  //           y: {
  //             formatter: function (val) {
  //               return val + "";

  //             }
  //           }
  //           , marker:
  //           {
  //             fillColors: ['#ff8080', '#ffbf00']
  //           }
  //         },
  //         fill: {
  //           opacity: 1,
  //           colors: ['#ff8080', '#ffbf00']

  //         },
  //         legend: {
  //           position: "bottom",
  //           horizontalAlign: "center",
  //           offsetX: 40,
  //           markers:
  //           {
  //             fillColors: ['#ff8080', '#ffbf00']
  //           }


  //         },

  //       };



  //       //


  //     }, error => {

  //     });





  //   }, error => {
  //     console.log(error);
  //   });

  // }
  anallyticAction(action) {
    // //debugger
    switch (action) {
      case 0:
        this.router.navigateByUrl(this.currUsrRole == 1 ? 'superadmin/applicationtracker' : 'admin/applicationtracker', { state: { type: "hospital" } })

        break;
      case 2:
        this.router.navigateByUrl(this.currUsrRole == 1 ? 'superadmin/certified' : 'admin/certified', { state: { type: "hospital" } })


        break;
      case 1:
        this.router.navigateByUrl(this.currUsrRole == 1 ? 'superadmin/applicationtracker' : 'admin/applicationtracker', { state: { type: "centre" } })


        break;
      case 3:
        this.router.navigateByUrl(this.currUsrRole == 1 ? 'superadmin/certified' : 'admin/certified', { state: { type: "centre" } })



        break;
    }

  }

  getRolesList() {

    this.dropdownservice.getDropDown().subscribe
      (
        data => {
          this.rolesList = data
          console.log(".. getRolesList() ..");
          console.log(data);
        },
        error => {

        }
      )
  }

  positionSuccess(msg) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 3000
    });
  }

  positionError(msg) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      text: msg,
      showConfirmButton: false,
      timer: 1500
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  addUser(addUserModel: any) {
    this.editUser = new EditUserCls();
    this.editUser.isactive = true;
    this.modalService.open(addUserModel, { size: 'lg' });

  }



  // Save(userData: User) {

  //   var result = this.adminService.saveUser(userData);
  //   result.subscribe(res => {
  //     if (res.isSuccess) {
  //       this.successmsg = true;
  //       this.msg = res.message;
  //       this.positionSuccess(this.msg);

  //       this.getUserData();
  //       // this.toaster.success(res.message, "Success");
  //       this.modalService.dismissAll(this.addUser);
  //       this.clearAfterSave();
  //     } else {
  //       this.successmsg = false;
  //       this.msg = "";
  //       this.error = res.message;
  //       this.positionError(this.error);
  //       this.clearAfterSave();
  //       // this.toaster.error(res.message, "Error");
  //       this.modalService.dismissAll(this.addUser);

  //     }
  //   }, error => {
  //     //console.log(error);
  //     console.log(error);
  //     this.error = error ? error.message : '';
  //     this.modalService.dismissAll(this.addUser);
  //     this.clearAfterSave();
  //   })
  // }


  // update(userData: User) {

  //   var result = this.adminService.updateUser(userData);
  //   result.subscribe(res => {
  //     if (res.isSuccess) {
  //       this.getUserData();
  //       this.successmsg = true;
  //       this.msg = res.message;
  //       this.positionSuccess(this.msg);
  //       // this.toaster.success(res.message, "Success");
  //       // this.addUserModal.hide();

  //       this.modalService.dismissAll(this.addUser);
  //       this.editUser = new EditUserCls();
  //       this.clearAfterSave();
  //     } else {
  //       this.successmsg = false;
  //       this.msg = "";
  //       this.error = res.message;
  //       this.positionError(this.error);
  //       // this.toaster.error(res.message, "Error");
  //       this.modalService.dismissAll(this.addUser);
  //       this.clearAfterSave();
  //       this.editUser = new EditUserCls();

  //     }
  //   }, error => {

  //     console.log(error);
  //     this.error = error ? error.message : '';
  //     //console.log(error);
  //     this.modalService.dismissAll(this.addUser);
  //     this.clearAfterSave();
  //     this.editUser = new EditUserCls();
  //   })
  //   this.clearAfterSave();
  //   this.editUser = new EditUserCls();
  // }

  // Delete(userData: User) {
  //   if (confirm("Are you sure you want to delete" + userData.firstname)) {
  //     var result = this.adminService.deleteUser(userData.id);
  //     result.subscribe(res => {
  //       if (res.isSuccess) {
  //         let index = this.userSearchResponse.rows.findIndex(d => d.id === userData.id); //find index in your array
  //         this.userSearchResponse.rows.splice(index, 1);
  //         this.successmsg = true;
  //         this.msg = res.message;
  //         this.positionSuccess(this.msg);
  //       } else {
  //         this.successmsg = false;
  //         this.msg = "";
  //         this.error = res.message;
  //         this.positionError(this.error);
  //       }
  //     }, error => {
  //       console.log(error);
  //       this.error = error ? error.message : '';
  //     })
  //   }

  // }

  Edit(data) {

    this.editUser = Object.assign({}, data);
    this.modalService.open(this.AddUserModel);

  }
  // Action(User) {

  //   if (User.id > 0) {
  //     this.update(User);
  //   }
  //   else {

  //     this.Save(User);
  //   }
  // }

  clearAfterSave() {
    this.editUser.email = "";
    this.editUser.firstname = "";
    this.editUser.lastname = "";
    this.editUser.mobile = "";
    this.editUser.roleid = null;


  }
}

export enum analytic_action {
  view_hosp_tracker,
  view_central_hospital_tracker,
  view_hosp_certified,
  view_central_hosp_certified



}




class EditUserCls {

  id: number;
  roleid: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  userpassword: string;
  isactive: boolean;
  notes: string
  otplogid: number;
  isFirstTimeLogin: true;
  creationdatems: number;
  rolename: string;
  fullname: string;
}
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

