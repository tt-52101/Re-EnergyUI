import { Component, OnInit, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart, transactions, statData } from '../asrdashboard/statsdata';
//import { ChartType } from '../admindashboard/admindashboard.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http"
import { AssessorService } from "../../api-services/assessor.service";
import { DropdownData, DropDownService } from '../../api-services/dropdown.service';
import Swal from 'sweetalert2';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AssessorCls, StateItem } from '../../model/Assessor.model';
import { QualificationItem } from '../../model/Assessor.model';
import { FileUploadService } from '../../api-services/fileupload.service';
import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-asrdashboard',
  templateUrl: './asrdashboard.component.html',
  styleUrls: ['./asrdashboard.component.css']
})


export class AsrdashboardComponent implements OnInit {

  transactions;
  statData;
  qualificationlist: QualificationItem[];
  statelist: StateItem[];
  rolesList: DropdownData[] = [];
  SearchTerms: string = "";
  SelectedRole: number = 0;
  limit: number = 10;
  asrData: AssessorCls;
  error = '';
  successmsg = false;
  msg: any;
  showExclamationGen: number = 0;
  showExclamationQua: number = 0;
  showExclamationLoc: number = 0;
  showExclamationBank: number = 0;
  @ViewChild('addUserModel', { static: false }) AddUserModel: any;

  specialitiesids: Array<any> = [

    { id: 1, name: 'Ayurveda', isselected: false },
    { id: 2, name: 'Yoga', isselected: false },
    { id: 3, name: 'Naturopathy', isselected: false },
    { id: 4, name: 'Unani', isselected: false },
    { id: 5, name: 'Siddha', isselected: false },
    { id: 6, name: 'Homeopathy', isselected: false },
    { id: 7, name: 'Sowa-Rigpa', isselected: false }
  ];

  // @ViewChild('myForm') myForm: NgForm;  
  @ViewChild('myFileInput', { static: false }) myfileVariable: any;
  fileToUpload: any;
  // Imgurl: any = '../../../../assets/images/profile.jpg';
  Imgurl: any = '../../../../assets/images/users/avatar-1.png';

  url = "./assets/profile.png";
  imgurl4save: any;
  asrProfile_image: string = "";

  constructor(private router: Router, private modalService: NgbModal, private http: HttpClient, private asrSrv: AssessorService, private dropdownservice: DropDownService, private fileUpldSrvc: FileUploadService) {
  }

  ngOnInit() {
    this.asrData = new AssessorCls();
    // this.getquaificationDropdownData();

    this.fetchData();
    this.getLoggedInAsrProfile();

  }

  getDashboardData() {
    this.asrSrv.getDashBoardData().subscribe(result => {


      this.statData = [{

        icon: 'bx bx-laptop text-primary',
        title: 'DA Allocation',
        value: result.da_alloc_count,
        // route: '/assessor/assessmentallocated',
        action: 0,

      }, {
        //bgchange: 'bg-soft-primary',
        icon: 'bx bx-reply text-danger',
        title: 'DA NC Reply',
        value: result.da_nc_reply_count,
        action: 1,
        // route:'/superadmin/hospitals'
      }, {
        //bgchange: 'bg-soft-warning',
        icon: 'bx bx-file-find text-success',
        title: 'DA NC Review',
        value: result.da_nc_review_count,
        action: 2,
      },
      {
        //bgchange: 'bg-soft-danger',
        icon: 'bx bx-laptop  text-primary',
        title: 'OA Allocated',
        value: result.oa_alloc_count,
        action: 3,
      },
      {
        //bgchange: 'bg-soft-danger',
        icon: 'bx bx-reply text-danger',
        title: 'OA NC Reply',
        value: result.oa_nc_reply_count,
        action: 4,
      },
      {
        //bgchange: 'bg-soft-danger',
        icon: 'bx bx-file-find text-success',
        title: 'OA NC Review',
        value: result.oa_nc_review_count,
        action: 5,
      }]

      this.getstateDropdownData();



    },
      error => {

      })


  }

  anallyticAction(action) {
    // const stages = JSON.parse(localStorage.getItem('stages'));
    localStorage.setItem('stages', JSON.stringify(action));

    switch (action) {
      case 0:
        this.router.navigateByUrl('assessor/dAallocated', { state: { uid: 0 } });

        break;
      case 1:
        this.router.navigateByUrl('assessor/dAallocated', { state: { uid: 1 } });


        break;
      case 2:
        this.router.navigateByUrl('assessor/dAallocated', { state: { uid: 2 } });


        break;
      case 3:
        this.router.navigateByUrl('assessor/dAallocated', { state: { uid: 3 } });
        break;
      case 4:
        this.router.navigateByUrl('assessor/dAallocated', { state: { uid: 4 } });
        break;
      case 5:
        this.router.navigateByUrl('assessor/dAallocated', { state: { uid: 5 } });



        break;
    }

  }


  private fetchData() {
    this.transactions = transactions;
    this.statData = statData;


  }

  getquaificationDropdownData() {
    this.asrSrv.getQualificationlistList().subscribe(result => {
      this.qualificationlist = result;
      this.getDashboardData();
    })

  }
  // getquaificationDropdownData() {
  //   this.asrSrv.getQualificationlistList().subscribe(result => {
  //     this.qualificationlist = result;

  //     this.asrSrv.getDashBoardData().subscribe(result => {


  //       this.statData=[{

  //         icon:  'bx bx-laptop text-primary',
  //         title: 'DA Allocation',
  //         value: result.da_alloc_count,
  //        // route: '/superadmin/users'

  //     }, {
  //         //bgchange: 'bg-soft-primary',
  //         icon: 'bx bx-reply text-danger',
  //         title: 'DA NC Reply',
  //         value: result.da_nc_reply_count,
  //        // route:'/superadmin/hospitals'
  //     }, {
  //         //bgchange: 'bg-soft-warning',
  //         icon: 'bx bx-file-find text-success',
  //         title: 'DA NC Review',
  //         value: result.da_nc_review_count
  //     },
  //     {
  //         //bgchange: 'bg-soft-danger',
  //         icon: 'bx bx-laptop  text-primary',
  //         title: 'OA Allocated',
  //         value: result.oa_alloc_count
  //           },
  //           {
  //             //bgchange: 'bg-soft-danger',
  //             icon: 'bx bx-reply text-danger',
  //             title: 'OA NC Reply',
  //             value: result.oa_nc_reply_count
  //               },
  //               {
  //                 //bgchange: 'bg-soft-danger',
  //                 icon: 'bx bx-file-find text-success',
  //                 title: 'OA NC Review',
  //                 value: result.oa_nc_review_count
  //                   }]



  //   },
  //     error => {

  //     })

  //   },
  //     error => {
  //       //console.log(JSON.stringify(error));
  //     })
  // }

  getstateDropdownData() {
    this.asrSrv.getStatelistList().subscribe(result => {

      this.statelist = result;

    },
      error => {
        //console.log(JSON.stringify(error));
      })
  }

  private getLoggedInAsrProfile() {
    this.asrSrv.getLoggedInAsrProfile().subscribe(res => {

      this.asrData = res;
      this.getquaificationDropdownData();
      if (this.asrData.dob != null) {

        // this.asrData.dob_day = this.asrData.dob.getFullYear();
        // this.asrData.dob_month = this.asrData.dob.getMonth() + 1;
        // this.asrData.dob_year = this.asrData.dob.getDate();        

        var aDate = new Date(this.asrData.dob);
        this.asrData.dob_struct = { year: aDate.getFullYear(), month: aDate.getMonth() + 1, day: aDate.getDate() };
      }

      console.log(".. getLoggedInAsrProfile() ..");
      console.log(res);
      console.log("... this.asrData ...");
      console.log(this.asrData);

      if (this.asrData.photourl != null && this.asrData.photourl.trim().length > 0)
        this.downloadAsrDP();

      if (this.asrData.specialitiesids != null) {
        // show selected specialities
        var strArr = this.asrData.specialitiesids.split(',');
        var intArr = [];

        for (let i = 0; i < strArr.length; i++) {
          intArr.push(strArr[i]);
        }

        intArr.forEach(value => {

          this.specialitiesids.forEach(data => {
            if (value == data.id)
              data.isselected = true;
          })

        });
        // show selected specialities
      }


    }, error => {
      console.log(error);
    });
    // this.getquaificationDropdownData();
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

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  onlyNosNdecimalKey(event) {
    //console.log("Key press event.charCode ;" + event.charCode);
    return (event.charCode == 8 || event.charCode == 0) ? null : (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46;
  }
  IsProfileOK() {
    let ret: boolean = true;
    let retMsg: string = "";
    this.showExclamationGen = 0;
    this.showExclamationQua = 0;
    this.showExclamationLoc = 0;
    this.showExclamationBank = 0;
    if (this.asrData.asrname.trim().length <= 0) {
      retMsg = "Assessor Name required";
      this.showExclamationGen = this.showExclamationGen + 1;
    }
    if (this.asrData.email.trim().length <= 0) {
      retMsg += ", Assessor Email required";
      this.showExclamationGen = this.showExclamationGen + 1;
    }

    if (this.asrData.mobileno1 == null || this.asrData.mobileno1 == undefined || (this.asrData.mobileno1 != null && this.asrData.mobileno1.trim().length <= 0)) {
      retMsg += ", Assessor Mobile required";
      this.showExclamationGen = this.showExclamationGen + 1;
    }

    if (this.asrData.dob_struct == null || this.asrData.dob_struct == undefined) {
      retMsg += ", Assessor DOB required";
      this.showExclamationGen = this.showExclamationGen + 1;
    }
    if (this.asrData.aadharnumber == null || this.asrData.aadharnumber == undefined || (this.asrData.aadharnumber != null && this.asrData.aadharnumber.trim().length <= 0)) {
      this.showExclamationGen = this.showExclamationGen + 1;
      retMsg += ", Assessor Aadhar Number required";
    }

    if (this.asrData.qualificationid == null || this.asrData.qualificationid == undefined) {
      this.showExclamationQua = this.showExclamationQua + 1;
      retMsg += ", Assessor Qualification required";
    }
    if (this.asrData.totalworkexp == null || this.asrData.totalworkexp == undefined || (this.asrData.totalworkexp != null && this.asrData.totalworkexp <= 0)) {
      this.showExclamationQua = this.showExclamationQua + 1;
      retMsg += ", Assessor Experience required";
    }
    if (this.asrData.currentorg == null || this.asrData.currentorg == undefined || (this.asrData.currentorg != null && this.asrData.currentorg.trim().length <= 0)) {
      this.showExclamationQua = this.showExclamationQua + 1;
      retMsg += ", Assessor Current Organisation required";
    }
    if (this.asrData.designation == null || this.asrData.designation == undefined || (this.asrData.designation != null && this.asrData.designation.trim().length <= 0)) {
      this.showExclamationQua = this.showExclamationQua + 1;
      retMsg += ", Assessor Designation required";
    }
    if (this.asrData.orgaddress == null || this.asrData.orgaddress == undefined || (this.asrData.orgaddress != null && this.asrData.orgaddress.trim().length <= 0)) {
      this.showExclamationQua = this.showExclamationQua + 1;
      retMsg += ", Assessor Organisation Address required";
    }

    if (this.asrData.stateid == null || this.asrData.stateid == undefined) {
      this.showExclamationLoc = this.showExclamationLoc + 1;
      retMsg += ", Assessor State required"
    };
    if (this.asrData.city == null || this.asrData.city == undefined || (this.asrData.city != null && this.asrData.city.trim().length <= 0)) {
      this.showExclamationLoc = this.showExclamationLoc + 1;
      retMsg += ", Assessor City required";
    };
    if (this.asrData.residentialaddress == null || this.asrData.residentialaddress == undefined || (this.asrData.residentialaddress != null && this.asrData.residentialaddress.trim().length <= 0)) {
      this.showExclamationLoc = this.showExclamationLoc + 1;
      retMsg += ", Assessor Residential Address required";
    };
    if (this.asrData.pin == null || this.asrData.pin == undefined || (this.asrData.pin != null && this.asrData.pin.trim().length <= 0)) {
      this.showExclamationLoc = this.showExclamationLoc + 1;
      retMsg += ", Assessor Pin code required";
    };
    // if (this.asrData.latitude == null || this.asrData.latitude == undefined || (this.asrData.latitude != null && this.asrData.latitude <= 0)) retMsg += ", Assessor Latitude required";
    // if (this.asrData.longitude == null || this.asrData.longitude == undefined || (this.asrData.longitude != null && this.asrData.longitude <= 0)) retMsg += ", Assessor Longitude required";

    if (this.asrData.bankname == null || this.asrData.bankname == undefined || (this.asrData.bankname != null && this.asrData.bankname.trim().length <= 0)) {
      this.showExclamationBank = this.showExclamationBank + 1;
      retMsg += ", Assessor Bank Name required";
    }
    if (this.asrData.bankbranchname == null || this.asrData.bankbranchname == undefined || (this.asrData.bankbranchname != null && this.asrData.bankbranchname.trim().length <= 0)) {
      this.showExclamationBank = this.showExclamationBank + 1;
      retMsg += ", Assessor Branch Name required";
    }
    if (this.asrData.bankaccountnumber == null || this.asrData.bankaccountnumber == undefined || (this.asrData.bankaccountnumber != null && this.asrData.bankaccountnumber <= 0)) {
      this.showExclamationBank = this.showExclamationBank + 1;
      retMsg += ", Assessor Bank Account Number required";
    }
    if (this.asrData.accountholdername == null || this.asrData.accountholdername == undefined || (this.asrData.accountholdername != null && this.asrData.accountholdername.trim().length <= 0)) {
      this.showExclamationBank = this.showExclamationBank + 1;
      retMsg += ", Assessor Account holder Name required";
    }
    if (this.asrData.ifsc_code == null || this.asrData.ifsc_code == undefined || (this.asrData.ifsc_code != null && this.asrData.ifsc_code.trim().length <= 0)) {
      this.showExclamationBank = this.showExclamationBank + 1;
      retMsg += ", Assessor Account IFSC code required";
    }
    if (this.asrData.pannumber == null || this.asrData.pannumber == undefined || (this.asrData.pannumber != null && this.asrData.pannumber.trim().length <= 0)) {
      this.showExclamationBank = this.showExclamationBank + 1;
      retMsg += ", Assessor Account PAN Number required";
    }
    if (this.asrData.photourl == null || this.asrData.photourl == undefined || (this.asrData.photourl != null && this.asrData.photourl.trim().length <= 0)) {
      this.showExclamationGen = this.showExclamationGen + 1;
      retMsg += ", Assessor Photo required";
    }
    // else {
    //   this.showExclamationGen = false;
    // }

    if (retMsg.trim().length > 0) {
      ret = false

      console.log(".. IsProfileOK() ..");
      console.log(retMsg);

      //  this.positionError("Please fill all mandatory fields (Red star) \n" + retMsg);
      this.positionError("Fill all Mandatory Fields ");
    }

    return ret;
  }
  // IsProfileOK() {
  //   let ret: boolean = true;
  //   let retMsg: string = "";

  //   if (this.asrData.asrname.trim().length <= 0) retMsg = "Assessor Name required"; 
  //   if (this.asrData.email.trim().length <= 0) retMsg += ", Assessor Email required";
  //   if (this.asrData.mobileno1 == null || this.asrData.mobileno1 == undefined || (this.asrData.mobileno1 != null && this.asrData.mobileno1.trim().length <= 0)) retMsg += ", Assessor Mobile required";
  //   if (this.asrData.dob_struct == null || this.asrData.dob_struct == undefined) retMsg += ", Assessor DOB required";
  //   if (this.asrData.aadharnumber == null || this.asrData.aadharnumber == undefined || (this.asrData.aadharnumber != null && this.asrData.aadharnumber.trim().length <= 0)) retMsg += ", Assessor Aadhar Number required";

  //   if (this.asrData.qualificationid == null || this.asrData.qualificationid == undefined) retMsg += ", Assessor Qualification required";
  //   if (this.asrData.totalworkexp == null || this.asrData.totalworkexp == undefined || (this.asrData.totalworkexp != null && this.asrData.totalworkexp <= 0)) retMsg += ", Assessor Experience required";
  //   if (this.asrData.currentorg == null || this.asrData.currentorg == undefined || (this.asrData.currentorg != null && this.asrData.currentorg.trim().length <= 0)) retMsg += ", Assessor Current Organisation required";
  //   if (this.asrData.designation == null || this.asrData.designation == undefined || (this.asrData.designation != null && this.asrData.designation.trim().length <= 0)) retMsg += ", Assessor Designation required";
  //   if (this.asrData.orgaddress == null || this.asrData.orgaddress == undefined || (this.asrData.orgaddress != null && this.asrData.orgaddress.trim().length <= 0)) retMsg += ", Assessor Organisation Address required";

  //   if (this.asrData.stateid == null || this.asrData.stateid == undefined) retMsg += ", Assessor State required";
  //   if (this.asrData.city == null || this.asrData.city == undefined || (this.asrData.city != null && this.asrData.city.trim().length <= 0)) retMsg += ", Assessor City required";
  //   if (this.asrData.residentialaddress == null || this.asrData.residentialaddress == undefined || (this.asrData.residentialaddress != null && this.asrData.residentialaddress.trim().length <= 0)) retMsg += ", Assessor Residential Address required";
  //   if (this.asrData.pin == null || this.asrData.pin == undefined || (this.asrData.pin != null && this.asrData.pin.trim().length <= 0)) retMsg += ", Assessor Pin code required";
  //   // if (this.asrData.latitude == null || this.asrData.latitude == undefined || (this.asrData.latitude != null && this.asrData.latitude <= 0)) retMsg += ", Assessor Latitude required";
  //   // if (this.asrData.longitude == null || this.asrData.longitude == undefined || (this.asrData.longitude != null && this.asrData.longitude <= 0)) retMsg += ", Assessor Longitude required";

  //   if (this.asrData.bankname == null || this.asrData.bankname == undefined || (this.asrData.bankname != null && this.asrData.bankname.trim().length <= 0)) retMsg += ", Assessor Bank Name required";
  //   if (this.asrData.bankbranchname == null || this.asrData.bankbranchname == undefined || (this.asrData.bankbranchname != null && this.asrData.bankbranchname.trim().length <= 0)) retMsg += ", Assessor Branch Name required";
  //   if (this.asrData.bankaccountnumber == null || this.asrData.bankaccountnumber == undefined || (this.asrData.bankaccountnumber != null && this.asrData.bankaccountnumber <= 0)) retMsg += ", Assessor Bank Account Number required";
  //   if (this.asrData.accountholdername == null || this.asrData.accountholdername == undefined || (this.asrData.accountholdername != null && this.asrData.accountholdername.trim().length <= 0)) retMsg += ", Assessor Account holder Name required";
  //   if (this.asrData.ifsc_code == null || this.asrData.ifsc_code == undefined || (this.asrData.ifsc_code != null && this.asrData.ifsc_code.trim().length <= 0)) retMsg += ", Assessor Account IFSC code required";
  //   if (this.asrData.pannumber == null || this.asrData.pannumber == undefined || (this.asrData.pannumber != null && this.asrData.pannumber.trim().length <= 0)) retMsg += ", Assessor Account PAN Number required";
  //   if (this.asrData.photourl == null || this.asrData.photourl == undefined || (this.asrData.photourl != null && this.asrData.photourl.trim().length <= 0)) retMsg += ", Assessor Photo required";

  //   if (retMsg.trim().length > 0) {
  //     ret = false

  //     console.log(".. IsProfileOK() ..");
  //     console.log(retMsg);

  //   //  this.positionError("Please fill all mandatory fields (Red star) \n" + retMsg);
  //   this.positionError("Fill all Mandatory Fields ");
  //   }

  //   return ret;
  // }

  updateAsrProfile() {
    let splIds: string = "";
    // console.log(".. specialitiesids ..");
    // console.log(this.specialitiesids);

    this.specialitiesids.forEach(itm => {
      if (itm.isselected == true) {

        if (splIds.toString().trim().length > 0)
          splIds += "," + itm.id.toString();
        else
          splIds = itm.id.toString();
      }

    });

    // console.log(".. Selected specialities ..");
    // console.log(splIds);

    this.asrData.specialitiesids = splIds;

    if (this.IsProfileOK() != true)
      return;

    this.asrData.dob_day = this.asrData.dob_struct.day;
    this.asrData.dob_month = this.asrData.dob_struct.month;
    this.asrData.dob_year = this.asrData.dob_struct.year;
    // this.asrData.photourl = "";

    console.log(".. this.asrData 2 be Updated ..");
    console.log(this.asrData);

    // console.log(".. Validate bfr Save ..");
    // var tt = this.myForm.control;
    // if (!this.myForm.valid) {
    //   console.log(this.myForm);
    //   return;
    // }        

    // if (1 == 1) return;

    var result = this.asrSrv.updateAssessor(this.asrData);

    result.subscribe(res => {
      if (res.isSuccess) {
        this.successmsg = true;
        this.msg = res.message;
        this.positionSuccess(this.msg);
        this.getLoggedInAsrProfile();

      } else {
        this.successmsg = false;
        this.msg = "";
        this.error = res.message;
        this.positionError(this.error);

      }
    }, error => {

      console.log(error);
      this.error = error ? error.message : '';
      this.getLoggedInAsrProfile();
    })

  }


  ////#region profile pic

  handleFileInput(files: FileList) {
    const fileItem = files.item(0);
    console.log('file input has changed. The file is', fileItem)
    this.fileToUpload = fileItem;
    this.checkfile();

  }

  checkfile() {
    if (this.fileToUpload != null) {
      var isfound = this.fileUpldSrvc.checkAsrDPformat(this.fileToUpload.name)

      if (isfound) {
        Swal.fire({
          icon: 'error', title: '', text: "Invalid file !! Only jpg,jpeg,png files can be uploaded",
        });
        this.fileToUpload = null;
        this.myfileVariable.nativeElement.value = "";
        this.Imgurl = '../../../../../assets/img/profile.png';
        return;
      }
      else {
        if (this.fileToUpload) {
          var reader = new FileReader();
          reader.readAsDataURL(this.fileToUpload);
          reader.onload = (event: any) => {
            this.Imgurl = event.target.result;
          }
          this.OKUpload();
        }
      }
    }

  }

  OKUpload() {

    this.fileUpldSrvc.fileUpload(this.fileToUpload).subscribe(data => {

      console.log("DP uploaded");
      console.log(data);

      if (data.body) {
        if (data.body.isSuccess) {
          this.imgurl4save = data.body.message;

          console.error(this.imgurl4save);

          this.asrProfile_image = this.imgurl4save;
          this.asrData.photourl = this.asrProfile_image;
        }
        else {
          this.fileToUpload = null;
          this.myfileVariable.nativeElement.value = "";
        }
      }
      else {
        this.fileToUpload = null;
        this.myfileVariable.nativeElement.value = "";
      }

    }, error => {
      console.log('Server error on Assessor Profile Pic');
      console.log(JSON.stringify(error));
      console.log(error);

      this.fileToUpload = null;
      this.myfileVariable.nativeElement.value = "";

    });

  }

  downloadAsrDP() {
    var vorgfn = "";

    var str_array = this.asrData.photourl.split('||');
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

  ////#endregion


} // ends export

export interface specialitiesids {
  id: number;
  name: string;
  isselected: boolean;

}