import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http"
import { FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { DropdownData, DropDownService } from 'src/app/pages/api-services/dropdown.service';
import { FileUploadService } from '../../../api-services/fileupload.service';
import { UserSearchResponse, User, UserFilter } from 'src/app/pages/model/User.model';
import { AsrSearchResponse, AssesorDTO, AsrFilter, StateItem } from 'src/app/pages/model/Asrlist.model';
import { AdminService } from 'src/app/pages/api-services/admin.service';
import { DateStruct } from 'src/app/pages/model/hospital/SupportService.model';
import { AssessorService } from 'src/app/pages/api-services/assessor.service';
import { AssessorCls } from 'src/app/pages/model/Assessor.model';
import * as moment from 'moment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-asrlist',
  templateUrl: './asrlist.component.html',
  styleUrls: ['./asrlist.component.scss']
})
export class AsrlistComponent implements OnInit {
  SearchTerms: string = "";
  SelectedRole: number = 0;
  limit: number = 10;
  asrSearchResponse: AsrSearchResponse = <any>{};
  asrDto: AssesorDTO;
  statelist: StateItem[];
  error = '';
  successmsg = false;
  msg: any;


  // search control rows
  totalCount: number = 0;
  minCount: number = 1;
  maxCount: number = 10;
  skip: number = 0;
  public enties = [25, 50, 100, 200];

  asrFilter: AsrFilter;
  SearchFrom: DateStruct = null;
  SearchTo: DateStruct = null;

  public asrCapacityLst: Array<any> = [
    { id: 1, name: 'Principal Assessor' },
    { id: 2, name: 'Assessor' }
  ];
  today: string;

  //rrc
  currentUser: any;
  currUsrRoleId: number = 0;
  //rrc
  asrData: AssessorCls;
  
  specialitiesids: Array<any> = [

    { id: 1, name: 'Ayurveda', isselected: false },
    { id: 2, name: 'Yoga', isselected: false },
    { id: 3, name: 'Naturopathy', isselected: false },
    { id: 4, name: 'Unani', isselected: false },
    { id: 5, name: 'Siddha', isselected: false },
    { id: 6, name: 'Homeopathy', isselected: false },
    { id: 7, name: 'Sowa-Rigpa', isselected: false }
  ];
  intArr:Array<any> =[];
  @ViewChild('assessorModel') assessorModel;
  @ViewChild('myFileInput', { static: false }) myfileVariable: any;
  fileToUpload: any;
  Imgurl: any = '../../../../assets/images/users/avatar-1.png';
  imageurl:any;
  url = "./assets/profile.png";
  imgurl4save: any;
  asrProfile_image: string = "";
  constructor(private modalService: NgbModal, private http: HttpClient, private asrSrv: AssessorService, private adminService: AdminService, private dropdownservice: DropDownService,private fileUpldSrvc: FileUploadService) {
  }

  ngOnInit() {

    /**
     * Fetches the data
     */

    //rrc
    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));

    if (this.currentUser) {
      if (this.currentUser.roleId && this.currentUser.roleId > 0)
        this.currUsrRoleId = this.currentUser.roleId;
    }
    //rrc

    this.asrFilter = new AsrFilter();

    this.asrFilter.searchtext = "";
    this.SearchFrom = null
    this.SearchTo = null
    this.asrFilter.limit = 10;
    this.asrFilter.offset = 0;
    this.asrFilter.stateid = 0;
    this.asrFilter.districtid = 0;
    this.asrFilter.city = "";
    this.asrFilter.capacity = 0;
    this.asrFilter.profile = null;
    this.getstateDropdownData();
    this.getAssessorData();
    this.today = moment().format("DD-MMM-YYYY");
    this.asrData = new AssessorCls();
   
  }

  /**
   * Fetches the data
   */
  getstateDropdownData() {
    this.asrSrv.getStatelistList().subscribe(result => {

      this.statelist = result;

    },
      error => {
        //console.log(JSON.stringify(error));
      })
  }
  getAssessorData() {

    this.adminService.getAllAsrListWithFilters(this.asrFilter).subscribe(res => {


      this.asrSearchResponse = res;

      console.log(".. Assessor List ..");
      console.log(res);

    }, error => {

      console.log(error);
    });
    // old n working

  }

  exportData() {

    var d = "Assessor Data";
    var e = this.today;
    // var item = "testhost.xlsx";
    var item = d + e + ".xlsx";


    this.adminService.ExportAllAsrListWithFilters(this.asrFilter).subscribe(
      (response) => {
        console.log(response);
        var blob = new Blob([response], {});
        saveAs(blob, item);

      },
      e => { (e); }
    );
  }
  viewassessor(selectedAssesor: AssessorCls) {

    // this.getAsrProfile(selectedAssesor.userid);
    //console.log('yoyo');
    
    console.log(selectedAssesor);
    this.asrData = Object.assign({}, selectedAssesor);
    if (this.asrData.dob != null) {

      // this.asrData.dob_day = this.asrData.dob.getFullYear();
      // this.asrData.dob_month = this.asrData.dob.getMonth() + 1;
      // this.asrData.dob_year = this.asrData.dob.getDate();        

      var aDate = new Date(this.asrData.dob);
      this.asrData.dob_struct = { year: aDate.getFullYear(), month: aDate.getMonth() + 1, day: aDate.getDate() };
    }
    if (this.asrData.specialitiesids != null) {
      // show selected specialities
      var strArr = this.asrData.specialitiesids.split(',');
      

      for (let i = 0; i < strArr.length; i++) {
        this.intArr.push(strArr[i]);
      }

      this.intArr.forEach(value => {

        this.specialitiesids.forEach(data => {
          if (value == data.id)
            data.isselected = true;
        })

      });
      // show selected specialities
    }
    if(this.asrData.photourl==null){
      this.imageurl="./assets/profile.png"
      
    }
   else if(this.asrData.photourl != null && this.asrData.photourl.trim().length > 0){
     this.downloadAsrDP();
    }
    
    this.modalService.open(this.assessorModel, { size: 'xl' });
  }
  downloadAsrDP() {
    var vorgfn = "";

    var str_array = this.asrData.photourl.split('||');
    vorgfn = str_array[0].split('|')[1];

    var result = this.fileUpldSrvc.downloadUploadedFile(vorgfn);
    result.subscribe(res => {
      if (res.isSuccess == true) {
        this.asrProfile_image = res.message;
        this.imageurl = res.message;
      }
      else {
        console.log("Assessor profile pic " + res.message);
      }
    }, error => {
      //console.log(error);
    })
  }
  getAsrProfile(userid) {

    this.asrSrv.getAsrProfile(userid).subscribe(res => {

      this.asrData = res;

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

      // if (this.asrData.photourl != null && this.asrData.photourl.trim().length > 0)
      // this.downloadAsrDP();

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

  }
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





  ////#region rrc Search control row

  searchReset() {
    this.asrFilter.searchtext = "";
    this.asrFilter.stateid = 0;
    this.asrFilter.districtid = 0;
    this.asrFilter.city = "";
    this.asrFilter.capacity = 0;
    this.asrFilter.limit = 10;
    this.asrFilter.offset = 0;
    this.asrFilter.sort = "";

    this.getAssessorData();
  }

  pageChanged(pageNo) {

    this.minCount = 1 + (this.asrFilter.limit * (pageNo - 1));
    this.maxCount = this.asrFilter.limit + (this.asrFilter.limit * (pageNo - 1));

    if (this.totalCount < this.maxCount)
      this.maxCount = this.totalCount;

    this.skip = ((pageNo - 1) * this.asrFilter.limit);
    this.asrFilter.offset = this.skip;

    this.adminService.getAllAsrListWithFilters(this.asrFilter).subscribe(res => {
      this.asrSearchResponse = res;

      console.log(".. on Page changed ..");
      console.log(res);

    }, error => {
      console.log(error);
    });

  }

  showEnteries() {
    this.skip = 0;
    this.asrFilter.offset = this.skip;
    this.getAssessorData();
  }

  ////#endregion


} // ends export





