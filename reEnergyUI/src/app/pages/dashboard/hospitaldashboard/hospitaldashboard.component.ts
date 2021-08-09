import { Component, OnInit, ViewChild } from '@angular/core';

import { emailSentBarChart, monthlyEarningChart, transactions, statData } from '../hospitaldashboard/hospitaldata';

import { ChartType } from '../hospitaldashboard/hospitaldashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http"

import { AdminService } from "../../api-services/admin.service";
import { UserSearchResponse } from "../../model/User.model";
import { environment } from 'src/environments/environment';
import { WizardComponent } from 'angular-archwizard';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FormBuilderDataShareService } from '../../modules/formbuilder/datashareservices/FormBuilderDataShareService';

import { formatDate } from '@angular/common';
import { UpdatedStage } from '../../model/GenAndSosDto.model';
import { onsiteAssessmentService } from '../../api-services/onsiteAssessment.service';
import { CCPEningDecisionSearchResponses, CommitteeDto, UploadDocsClss } from '../../model/committee.model';
import { CommiteeService } from '../../api-services/commitee.service';
import { FileUploadService } from '../../api-services/fileupload.service';


@Component({
  selector: 'app-admindashboard',
  templateUrl: '../hospitaldashboard/hospitaldashboard.component.html',
  styleUrls: ['../hospitaldashboard/hospitaldashboard.component.scss']
})

/**
 * Dashboard component
 */
export class HospitalDashboardComponent implements OnInit {

  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions;
  statData;

  SearchTerms: string = "";
  SelectedRole: number = 0;
  limit: number = 10;
  currentUser: any;
  org_type: string = "";
  userSearchResponse: UserSearchResponse = <any>{};
  hospdata: hospitalDashboardData;
  @ViewChild('ccModel') ccModel;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  StageClassName = null;

  public apiUrl: string;
  public abc: string = "alert alert-danger  fade show";
  step_1_class;
  step_1_icon_class: any =
    {
      'fa fa-check': true,
      'customIconSteppers': true

    }
  step_2_class;
  step_2_icon_class: any =
    {
      'fa fa-check': true,
      'customIconSteppers': true

    }
  step_3_class;
  step_3_icon_class: any =
    {
      'fa fa-notes-medical': true,
      'customIconSteppers': true,
      'left-44': true

    }
  step_4_class;
  step_4_icon_class: any =
    {
      'fa fa-rupee-sign': true,
      'customIconSteppers': true,
      'left-44': true

    }
  step_5_class;
  step_5_icon_class: any =
    {
      'fa fa-desktop': true,
      'customIconSteppers': true,
      // 'left-44':true

    }
  step_6_class;
  step_6_icon_class: any =
    {
      'fa fa-reply-all': true,
      'customIconSteppers': true,
      // 'left-44':true

    }
  step_7_class;
  step_7_icon_class: any =
    {
      'fa fa-calendar-check': true,
      'customIconSteppers': true,
      'left-44': true

    }
  step_8_class;
  step_8_icon_class: any =
    {
      'fa fa-mobile-alt': true,
      'customIconSteppers': true,
      'left-44': true

    }
  step_9_class;
  step_9_icon_class: any =
    {
      'fa fa-comment': true,
      'customIconSteppers': true,
      //'left-44':true

    }
  step_10_class;
  step_10_icon_class: any =
    {
      'fa fa-reply-all': true,
      'customIconSteppers': true,
      //'left-44':true

    }
  step_11_class;
  step_11_icon_class: any =
    {
      'fa fa-users': true,
      'customIconSteppers': true,
      //'left-44':true

    }
  step_12_class;
  step_12_icon_class: any =
    {
      'fa fa-certificate': true,
      'customIconSteppers': true,
      //'left-44':true

    }
  messageShown: string = "";
  classshown: string = "";
  isMessageShw: boolean = false;
  showRapply: boolean = false
  @ViewChild('actionModal', { static: false }) actionModal: any;
  oa_AssessemtHistry: Oa_AssessemtHistry;
  action_status: boolean = null;
  remarks: string = "";
  oaAllocationAction: OaAllocationAction;
  asmt_type_oa: string = "";
  asmt_date_oa: string = "";
  hosp_id: number;
  reapplyOrRenew: ReapplyOrRenew;
  loading: boolean = false;
  stagedata: UpdatedStage;
  stageid: number = 0;
  ccpening: CCPEningDecisionSearchResponses;
  committeeRespone: CommitteeDto;
  arryNcUploadedDocs: UploadDocsClss[] = new Array();
  public selectedFile: any;
  filename: string;
  fileUploadLadda: boolean;
  loading2: boolean;
  constructor(private modalService: NgbModal, private uploadService: FileUploadService, private committeeService: CommiteeService, private onsiteservc: onsiteAssessmentService, private auth: AuthenticationService, private formBuilderdataservc: FormBuilderDataShareService, private tostr: CustomTosterServiceService, private http: HttpClient, private adminService: AdminService, private router: Router) {
    this.apiUrl = environment.apiUrl;
    this.hospdata = new hospitalDashboardData();
    this.oa_AssessemtHistry = new Oa_AssessemtHistry();
    this.oaAllocationAction = new OaAllocationAction();
    this.reapplyOrRenew = new ReapplyOrRenew();
  }

  ngOnInit() {


    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.committeeRespone = new CommitteeDto();
    this.org_type = this.currentUser.org_type;
    /**
     * Fetches the data
     */
    this.fetchData();
    // this.getUserData();
    this.getHospitalDashboardData();
    this.action_status = null;
    this.remarks = "";

  }
  DeleteCCUpload(obj) {
    if (!confirm("Are you sure to delete file")) {
      return;
    }
    //console.log(this.arryNcUploadedDocs);
    this.arryNcUploadedDocs = this.arryNcUploadedDocs.filter(item => item != obj)

    var latestString = null;
    for (var i = 0; i < this.arryNcUploadedDocs.length; i++) {
      latestString == null ? latestString = this.arryNcUploadedDocs[i].fn + "|" + this.arryNcUploadedDocs[i].orgfn + "||" : latestString += this.arryNcUploadedDocs[i].fn + "|" + this.arryNcUploadedDocs[i].orgfn + "||";
    }
    this.committeeRespone.uploadurl = null;
    // this.committeeRespone.scope_ = latestString;
    // this.NcAddUpdate(-1);
  }
  getUploadFilesPath(files: FileList) {
    const fileItem = files.item(0);

    if (fileItem) {

      this.selectedFile = fileItem;
      this.filename = fileItem.name;
      this.UploadNcFile()
    }

  }
  UploadNcFile() {

    this.fileUploadLadda = true;

    //console.log(this.selectedFile);
    if (this.selectedFile == null) {
      this.tostr.warning("Please Select File first");
      this.fileUploadLadda = false;
      return;
    }

    if (this.selectedFile != null) {
      var isfound = this.uploadService.checkImageFormat2(this.selectedFile.name)
      if (isfound) {
        Swal.fire("", "<p style='font-size: 1.5em'> Invalid file!! Only  pdf, jpg, jpeg, png can be uploaded </p>");
        this.fileUploadLadda = false;
        this.selectedFile = null;
        this.filename = null;
        this.arryNcUploadedDocs.splice(0, this.arryNcUploadedDocs.length);
        return;
      }

    }

    this.uploadService.fileUpload(this.selectedFile).subscribe(data => {
      // //console.log("hssgd  ---------------- s3");
      // //console.log(data);

      this.selectedFile = null;
      if (data.body) {
        if (data.body.isSuccess) {

          this.committeeRespone.uploadurl == null ? this.committeeRespone.uploadurl = data.body.message : this.committeeRespone.uploadurl += data.body.message;
          this.tostr.success('File uploaded');
          this.NcDocsArrayGenerator(this.committeeRespone.uploadurl);
          this.selectedFile = null;
          this.filename = null;
          // this.arryNcUploadedDocs.splice(0, this.arryNcUploadedDocs.length);
          // this.myfileVariable.nativeElement.value = ""; 
          // this.fileUploadLadda=false;

        }
        else {
          this.tostr.error(data.body.message);
          this.selectedFile = null;

          // this.myfileVariable.nativeElement.value = "";
        }
        // this.fileUploadLadda = false;
      }

      this.fileUploadLadda = false;
    }
      , error => {
        //console.log(error);
        this.fileUploadLadda = false;
      });

  }
  openCCpopup() {
    if (this.hospdata.stage_id == 204) {

      this.getComitteData();
      this.modalService.open(this.ccModel, { size: 'xl' });
    }
  }
  NcDocsArrayGenerator(arrayString) {
    this.arryNcUploadedDocs = [];
    if (arrayString == null || arrayString == "") {
      return;
    }
    var str_array = arrayString.split('||');
    if (str_array) {
      if (str_array.length > 1) {
        for (var i = 0; i < str_array.length; i++) {

          if (str_array[i] && str_array[i].length > 0) {
            let docCls = new UploadDocsClss();
            docCls.fn = str_array[i].split('|')[0];
            docCls.orgfn = str_array[i].split('|')[1];
            this.arryNcUploadedDocs.push(docCls);
          }

        }
      }
    }
  }
  downloadUploadFile(item) {

    var result = this.uploadService.downloadUploadedFile(item.orgfn);
    result.subscribe(res => {
      if (res.isSuccess == true) {
        window.open(res.message);
      }
      else {
        this.tostr.error(res.message);
      }
    }, error => {
      //console.log(error);
    })
  }
  saveCCDecision(savetype: number) {
    let u_id = Number(history.state.uid);
    this.committeeRespone;

    this.committeeService.saveupdateCommetedecsion(this.committeeRespone, this.hospdata.id, savetype).subscribe(res => {
      console.log(res);
      if (res.isSuccess == true) {

        // this.successmsg = true;
        this.loading = false;
        this.loading2 = false;

        this.positionSuccess(res.message);
        this.arryNcUploadedDocs.splice(0, this.arryNcUploadedDocs.length);
        this.getHospitalDashboardData();
        // this.getAssessorDta();
        // if (savetype == 1) {
        //   this.router.navigateByUrl('hospitaldashboard');
        // }
      }
      else {
        // this.successmsg = false;
        this.loading = false;
        this.loading2 = false;
        // this.msg = "";
        // this.error = res.message;
        this.positionError(res.message);
        // this.getAssessorDta();
      }

    }, error => {
      this.loading = false;
      this.loading2 = false;
    });
  }
  getComitteData() {

    this.committeeService.getCommiteeData(this.hospdata.id).subscribe(res => {
      this.committeeRespone = res;


      console.log(".....committee Response......")
      console.log(this.committeeRespone)
    })
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
  alertSweet2(savetype: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure you want to submit ?',
        text: 'The details once entered cannot be edited.',
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {

          this.saveCCDecision(savetype);
        } else if (

          result.dismiss === Swal.DismissReason.cancel
        ) {

          return;
        }
      });
  }
  getHospitalDashboardData() {
    this.http.get<hospitalDashboardData>(this.apiUrl + "dashboard").pipe(map((data: hospitalDashboardData) => {

      data.hosp_id = data.hosp_id.replace(/\s/g, '');
      data.application_number = data.application_number.replace(/\s/g, '');

      let dshboarddata = data;

      return dshboarddata;

    })).
      subscribe(result => {

        this.hospdata = result
        this.setStepperStage()

      }, error => {

      })
  }
  setStepperStage() {

    if (this.hospdata.stage_id == 10 || this.hospdata.stage_id == 20) {
      this.step_1_class = "currentstageaccepted"
      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageinprogress"

      this.step_4_class = "currentStageDafault"
      this.step_5_class = "currentStageDafault"
      this.step_6_class = "currentStageDafault"
      this.step_7_class = "currentStageDafault"
      this.step_8_class = "currentStageDafault"
      this.step_9_class = "currentStageDafault"
      this.step_10_class = "currentStageDafault"
      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"


    }
    else if (this.hospdata.stage_id == 30) {
      this.step_1_class = "currentstageaccepted";
      this.step_2_class = "currentstageaccepted";
      this.step_3_class = "currentstageaccepted";
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }

      this.step_4_class = "currentstageinprogress"
      this.step_5_class = "currentStageDafault"
      this.step_6_class = "currentStageDafault"
      this.step_7_class = "currentStageDafault"
      this.step_8_class = "currentStageDafault"
      this.step_9_class = "currentStageDafault"
      this.step_10_class = "currentStageDafault"
      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"
    }
    else if (this.hospdata.stage_id == 35 || this.hospdata.stage_id == 38 || this.hospdata.stage_id == 39 || this.hospdata.stage_id == 40 || this.hospdata.stage_id == 45) {
      this.step_1_class = "currentstageaccepted"
      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }

      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageinprogress"
      this.step_6_class = "currentStageDafault"
      this.step_7_class = "currentStageDafault"
      this.step_8_class = "currentStageDafault"
      this.step_9_class = "currentStageDafault"
      this.step_10_class = "currentStageDafault"
      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"
    }
    else if (this.hospdata.stage_id == 50 || this.hospdata.stage_id == 60 || this.hospdata.stage_id == 70 || this.hospdata.stage_id == 80) {
      this.step_1_class = "currentstageaccepted"
      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }

      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //'left-44':true

      }
      this.step_6_class = "currentstageinprogress"
      this.step_7_class = "currentStageDafault"
      this.step_8_class = "currentStageDafault"
      this.step_9_class = "currentStageDafault"
      this.step_10_class = "currentStageDafault"
      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"
    }

    else if (this.hospdata.stage_id == 90) {
      this.step_1_class = "currentstageaccepted"
      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_6_class = "currentstageaccepted"
      this.step_6_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }

      this.step_7_class = "currentstageinprogress"
      this.step_8_class = "currentStageDafault"
      this.step_9_class = "currentStageDafault"
      this.step_10_class = "currentStageDafault"
      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"

    }
    else if (this.hospdata.stage_id == 100) {

      this.step_1_class = "currentstageaccepted"
      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_6_class = "currentstagerejected"
      //icon change
      this.step_6_icon_class =
      {
        'fa fa-times': true,
        'customIconSteppers': true,
        // 'left-44':true

      }

      this.step_7_class = "currentStageDafault"
      this.step_8_class = "currentStageDafault"
      this.step_9_class = "currentStageDafault"
      this.step_10_class = "currentStageDafault"
      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"


    }
    else if (this.hospdata.stage_id == 110 || this.hospdata.stage_id == 112 || this.hospdata.stage_id == 115) {
      this.step_1_class = "currentstageaccepted"
      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //  'left-44':true

      }
      this.step_6_class = "currentstageaccepted"
      this.step_6_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_7_class = "currentstageinprogress"
      this.step_7_icon_class =
      {

        'fa fa-calendar-check': true,
        'customIconSteppers': true,
        'left-44': true


      }
      this.step_8_class = "currentStageDafault"

      this.step_9_class = "currentStageDafault"
      this.step_10_class = "currentStageDafault"
      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"

    }
    else if (this.hospdata.stage_id == 120 || this.hospdata.stage_id == 130) {
      this.step_1_class = "currentstageaccepted"
      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_6_class = "currentstageaccepted"
      this.step_6_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_7_class = "currentstageaccepted"
      this.step_7_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_8_class = "currentstageinprogress"
      this.step_8_icon_class =
      {

        'fa fa-mobile-alt': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_9_class = "currentStageDafault"

      this.step_10_class = "currentStageDafault"
      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"


    }
    else if (this.hospdata.stage_id == 140) {
      this.step_1_class = "currentstageaccepted"
      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_6_class = "currentstageaccepted"
      this.step_6_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_7_class = "currentstageaccepted"
      this.step_7_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_8_class = "currentstageaccepted"
      this.step_8_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_9_class = "currentstageinprogress"

      this.step_10_class = "currentStageDafault"
      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"


    }
    else if (this.hospdata.stage_id == 150 || this.hospdata.stage_id == 160 || this.hospdata.stage_id == 170 || this.hospdata.stage_id == 180) {

      this.step_1_class = "currentstageaccepted"
      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //'left-44':true

      }
      this.step_6_class = "currentstageaccepted"
      this.step_6_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_7_class = "currentstageaccepted"
      this.step_7_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_8_class = "currentstageaccepted"
      this.step_8_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_9_class = "currentstageaccepted"
      this.step_9_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //  'left-44':true

      }
      this.step_10_class = "currentstageinprogress"

      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"


    }
    else if (this.hospdata.stage_id == 190) {
      this.step_1_class = "currentstageaccepted"
      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //   'left-44':true

      }
      this.step_6_class = "currentstageaccepted"
      this.step_6_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_7_class = "currentstageaccepted"
      this.step_7_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_8_class = "currentstageaccepted"
      this.step_8_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_9_class = "currentstageaccepted"
      this.step_9_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_10_class = "currentstagerejected"
      //rejected
      this.step_10_icon_class =
      {
        'fa fa-times': true,
        'customIconSteppers': true,
        'left-44': true

      }

      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"

    }
    else if (this.hospdata.stage_id == 200) {
      this.step_1_class = "currentstageaccepted"

      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //  'left-44':true

      }
      this.step_6_class = "currentstageaccepted"
      this.step_6_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_7_class = "currentstageaccepted"
      this.step_7_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_8_class = "currentstageaccepted"
      this.step_8_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_9_class = "currentstageaccepted"
      this.step_9_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_10_class = "currentstageaccepted"
      this.step_10_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //'left-44':true

      }

      this.step_11_class = "currentStageDafault"
      this.step_12_class = "currentStageDafault"

    }

    else if (this.hospdata.stage_id == 202 || this.hospdata.stage_id == 204 || this.hospdata.stage_id == 206) {
      this.step_1_class = "currentstageaccepted"

      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //  'left-44':true

      }
      this.step_6_class = "currentstageaccepted"
      this.step_6_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_7_class = "currentstageaccepted"
      this.step_7_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_8_class = "currentstageaccepted"
      this.step_8_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_9_class = "currentstageaccepted"
      this.step_9_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_10_class = "currentstageaccepted"
      this.step_10_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //   'left-44':true

      }

      this.step_11_class = "currentstageinprogress"
      this.step_12_class = "currentStageDafault"

    }

    else if (this.hospdata.stage_id == 210) {
      this.step_1_class = "currentstageaccepted"

      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //  'left-44':true

      }
      this.step_6_class = "currentstageaccepted"
      this.step_6_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_7_class = "currentstageaccepted"
      this.step_7_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_8_class = "currentstageaccepted"
      this.step_8_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_9_class = "currentstageaccepted"
      this.step_9_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_10_class = "currentstageaccepted"
      this.step_10_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //   'left-44':true

      }

      this.step_11_class = "currentstageaccepted"
      this.step_11_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //   'left-44':true

      }
      this.step_12_class = "currentstageaccepted"
      this.step_12_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //   'left-44':true

      }

    }
    else if (this.hospdata.stage_id == 220) {
      this.step_1_class = "currentstageaccepted"

      this.step_2_class = "currentstageaccepted"
      this.step_3_class = "currentstageaccepted"
      this.step_3_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_4_class = "currentstageaccepted"
      this.step_4_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_5_class = "currentstageaccepted"
      this.step_5_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //  'left-44':true

      }
      this.step_6_class = "currentstageaccepted"
      this.step_6_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_7_class = "currentstageaccepted"
      this.step_7_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_8_class = "currentstageaccepted"
      this.step_8_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        'left-44': true

      }
      this.step_9_class = "currentstageaccepted"
      this.step_9_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        // 'left-44':true

      }
      this.step_10_class = "currentstageaccepted"
      this.step_10_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //   'left-44':true

      }

      this.step_11_class = "currentstageaccepted"
      this.step_11_icon_class =
      {
        'fa fa-check': true,
        'customIconSteppers': true,
        //   'left-44':true

      }
      this.step_12_class = "currentstagerejected"
      this.step_12_icon_class =
      {
        'fa fa-times': true,
        'customIconSteppers': true,
        'left-44': true

      }

    }

    this.setMessage();

  }

  setMessage() {
    this.isMessageShw = true;
    if (this.currentUser.stage_id == 20) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "Kindly fill and submit the application form within the stipulated timeline to avoid deactivation of your application. Please refer to the guidelines and guidebook carefully before filling the application form.";
        this.classshown = "alert alert-success  fade show";
      } else {
        // this.messageShown = "The application has been deactivated due to the delay in submission of the application form within the stipulated timeline. In order to reactivate, request you to kindly send your request to the NABH Secretariat.";
        this.messageShown = "The application has been deactivated due to the delay in submission of the application form within the stipulated timeline. Click on Reapply button to reapply for certification.";
        this.classshown = "alert alert-danger  fade show";
        this.showRapply = true;

      }
    } else if (this.currentUser.stage_id == 38) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The application has been rejected.  Click on Reapply button to reapply for certification.";
        this.classshown = "alert alert-danger  fade show";
        this.showRapply = true;
      }
    }
    else if (this.currentUser.stage_id == 30) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The application form has been submitted. Kindly pay the certification fees by clicking on the Fee Submission in the progress bar.";
        this.classshown = "alert alert-success  fade show";
      } else {
        this.messageShown = "The application has been deactivated due to the delay in submission of the application form within the stipulated timeline. Click on Reapply button to reapply for certification.";
        this.classshown = "alert alert-danger  fade show"
      }

    }
    else if (this.currentUser.stage_id == 35) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The certification fees for your application has been successfully submitted.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 40) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The Desktop Assessment of your application is In Progress.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 45) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The Desktop Assessment of your application is In Progress.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 50) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The Non-Compliances (NCs) has been raised against certain documents on the Desktop Assessment. Kindly reply to the NCs raised in the application.";
        this.classshown = "alert alert-success  fade show";
      } else {
        this.messageShown = "The application has been deactivated due to the delay in submission of Non-Compliances response within the stipulated timeline. In order to reactivate, kindly send your request through the Remarks section.";
        this.classshown = "alert alert-danger  fade show";
      }

    } else if (this.currentUser.stage_id == 60) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The responses submitted by you against the raised Non-Compliances are being reviewed by the Assessor.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 70) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The Non-Compliances (NCs) has been raised against certain documents on the Desktop Assessment. Kindly reply to the NCs raised in the application.";
        this.classshown = "alert alert-success  fade show";
      } else {
        this.messageShown = "The application has been deactivated due to the delay in submission of Non-Compliances response within the stipulated timeline. In order to reactivate, kindly send your request through the Remarks section.";
        this.classshown = "alert alert-danger  fade show";
      }

    }
    else if (this.currentUser.stage_id == 80) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The responses submitted by you against the raised Non-Compliances are being reviewed by the Assessor.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 90) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The application has been accepted on Desktop Assessment.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 100) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The application has been rejected at Desktop Assessment due to failure in providing satisfactory evidence against the raised non-compliances. Click on Reapply button to reapply for certification.";
        this.classshown = "alert alert-danger  fade show";
        this.showRapply = true;
      }

    }
    else if (this.currentUser.stage_id == 110) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The On-site Assessment date has been allocated for your organisation. Kindly click on OA Schedule in the progress bar to Accept or Reject the date.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 112) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The On-site Assessment date has been rejected by the organisation. Please wait until the new date is assigned.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 115) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The On-site Assessment of your application has been scheduled. The details about the assessment have been sent on the registered email id.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 120) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The On-site Assessment of your application is In Progress.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 130) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The On-site Assessment of your application has been completed. Kindly click on OA Feedback in the progress bar to give feedback on the assessment.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 140) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The On-site Assessment of your application is under review.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 150) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The Non-Compliances (NCs) has been raised on the On-site Assessment. Kindly reply to the NCs raised in the application.";
        this.classshown = "alert alert-success  fade show";
      } else {
        this.messageShown = "The application has been deactivated due to the delay in submission of Non-Compliances response within the stipulated timeline. In order to reactivate, kindly send your request through the Remarks section.";
        this.classshown = "alert alert-danger  fade show";
      }

    }
    else if (this.currentUser.stage_id == 160) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The response submitted by you against the raised Non-Compliances are being reviewed by the Assessor.";
        this.classshown = "alert alert-success  fade show";
      }

    }
    else if (this.currentUser.stage_id == 170) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The Non-Compliances (NCs) has been raised on the On-site Assessment. Kindly reply to the NCs raised in the application.";
        this.classshown = "alert alert-success  fade show";
      } else {
        this.messageShown = "The application has been deactivated due to the delay in submission of Non-Compliances response within the stipulated timeline. In order to reactivate, kindly send your request through the Remarks section.";
        this.classshown = "alert alert-danger  fade show";
      }

    }
    else if (this.currentUser.stage_id == 180) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The response submitted by you against the raised Non-Compliances are being reviewed by the Assessor.";
        this.classshown = "alert alert-success  fade show";
      }
    }
    else if (this.currentUser.stage_id == 200) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The On-site Assessment has been reviewed by the Assessor. The Committee Verification of your application shall be allocated soon.";
        this.classshown = "alert alert-success  fade show";
      }
    }
    else if (this.currentUser.stage_id == 190) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The application has been rejected at On-site Assessment due to failure in providing satisfactory evidence against the raised non-compliances. Click on Reapply button to reapply for certification.";
        this.classshown = "alert alert-danger  fade show";
        this.showRapply = true;
      }
    }
    else if (this.currentUser.stage_id == 202) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The application is being reviewed by the Certification Committee.";
        this.classshown = "alert alert-success  fade show";
      }
    }
    else if (this.currentUser.stage_id == 204) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The Certification Committee has requested for few documents. Kindly click on Committee Verification in the progress bar to view and reply.";
        this.classshown = "alert alert-success  fade show";
      }
      else {
        this.messageShown = "The application has been deactivated due to the delay in submission of response within the stipulated timeline. In order to reactivate, kindly send your request through the Remarks section.";
        this.classshown = "alert alert-danger  fade show";
      }
    }
    else if (this.currentUser.stage_id == 206) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The response submitted by you against the pending documents are being reviewed by the Certification Committee.";
        this.classshown = "alert alert-success  fade show";
      }
    }
    else if (this.currentUser.stage_id == 210) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The application has been recommended by the Certification Committee. Kindly refer to the Certification History tab to view certificate details.";
        this.classshown = "alert alert-success  fade show";
      }
    }
    else if (this.currentUser.stage_id == 220) {
      if (this.currentUser.isactive == true) {
        this.messageShown = "The application has not been recommended by the Certification Committee. Click on Reapply button to reapply for certification.";
        this.classshown = "alert alert-danger  fade show";
        this.showRapply = true;
      }
    }
    this.getAcceptRejectData();
  }
  FeesPayment() {

    if (this.hospdata.stage_id == 30) {
      let url = "hospital/applicationFee";

      this.router.navigateByUrl(url);
    }
    else {

    }

  }

  navigatetoOA() {
    if (this.hospdata.stage_id == 145 || this.hospdata.stage_id == 140) {
      this.router.navigateByUrl("hospital/oafeedback");
    }
  }
  navReply() {
    if (this.hospdata.stage_id == 150 || this.hospdata.stage_id == 170) {
      this.formBuilderdataservc.setVendorDataHosp(this.hospdata.id);
      this.router.navigateByUrl('onsiteassessment/assessmentDataFromMobile');
    }
  }
  navigateToApplicationForm() {

    if (this.hospdata.organisation_type == 'Hospital') {
      let url = "hospital/hospitalapplication";

      this.router.navigateByUrl(url);
    }
    else {
      let url = "hospital/centerHospitalapplication";

      this.router.navigateByUrl(url);
    }

  }
  /**
   * Fetches the data
   */
  private fetchData() {

    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;
    this.transactions = transactions;
    this.statData = statData;

  }

  private getUserData() {

    this.adminService.getUserList(this.SearchTerms, this.SelectedRole, 0, this.limit).subscribe(res => {

      this.userSearchResponse = res;


    }, error => {
      console.log(error);
    });

  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  openActionModal(actionModal: any) {
    if (this.hospdata.stage_id == 110) {
      this.modalService.open(actionModal, { size: 'lg' });
    }

  }

  getAcceptRejectData() {

    this.hosp_id = this.hospdata.id;
    if (this.hosp_id != null && this.hosp_id > 0) {
      this.adminService.getAccepptRejectData(this.hosp_id).subscribe(res => {

        this.oa_AssessemtHistry = res;
        this.asmt_type_oa = res.asmt_type_oa;
        this.asmt_date_oa = res.asmt_date_oa;
        this.getStageData();
      }, error => {
        console.log(error);
      });
    }
  }

  getStageData() {


    this.onsiteservc.getStageData(this.hosp_id).subscribe(result => {


      this.stagedata = result;
      this.stageid = this.stagedata.stage_id;
      console.log(this.stagedata);
      this.getComitteData();
    }, error => {


    });


  }
  actionbyhco() {
    this.hosp_id = this.hospdata.id;
    this.oaAllocationAction.date_reject_remarks = this.remarks;
    this.oaAllocationAction.date_rejected_by_hco = this.action_status;
    if (this.action_status == null) {
      Swal.fire("", "<p style='font-size: 1.5em'> Status cannot be null</p>");
      return
    } else if (this.action_status == false) {
      if (this.remarks == "" || this.remarks == null) {
        Swal.fire("", "<p style='font-size: 1.5em'> Remarks cannot be empty</p>");
        return
      }
    }
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const todys = formatDate(this.asmt_date_oa, 'yyyy-MM-dd', 'en');
    if (currentDate > todys) {
      Swal.fire("", "<p style='font-size: 1.5em'> The action can not be accepted now as the date has already been passed.</p>");
      return;
    }



    this.adminService.actionByHco(this.hosp_id, this.oaAllocationAction).subscribe(result => {

      if (result.isSuccess) {


        this.tostr.success(result.message);
      } else {
        this.tostr.error(result.message);
      }
      this.getAcceptRejectData();
    }, error => {
      console.log(error);
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

  alertSweet(application_type) {
    this.loading = true;
    var hospital_apply_for = application_type;
    this.reapplyOrRenew.application_type = hospital_apply_for;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2',

      },
      buttonsStyling: false
    });
    if (hospital_apply_for == 1) {

      const ipAPI = this.auth.apiUrl + "unauthorized/delay";
      swalWithBootstrapButtons
        .fire({
          title: 'You have selected to Reapply for AYUSH Entry Level Certification. After clicking on Proceed, you will be redirected to fill the new application form.',
          text: 'The current application will not be accessible.',

          icon: 'warning',
          confirmButtonText: 'Proceed',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          showLoaderOnConfirm: true,

          preConfirm: () => {
            return fetch(ipAPI).then
              (response => response.json())
              .then(data => Swal.insertQueueStep(data.ip))
              .catch(() => {
                Swal.insertQueueStep({
                  icon: 'error',
                  title: 'Internal Error Please Try later!'
                })
              })
          },
          allowOutsideClick: () => !Swal.isLoading()

        })
        .then(result => {
          if (result.isConfirmed) {

            this.HospReapplySubbmission();
          } else if (

            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel

          ) {


            this.loading = false;

          }
        });
    }
    else if (hospital_apply_for == 2) {
      const ipAPI = this.auth.apiUrl + "unauthorized/delay";
      swalWithBootstrapButtons
        .fire({
          title: 'You have selected to Renew your  AYUSH Entry Level Certification. After clicking on Proceed, you will be redirected to fill the Application Form.',
          text: 'The current application will not be accessible.',
          icon: 'warning',
          confirmButtonText: 'Proceed',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          showLoaderOnConfirm: true,

          preConfirm: () => {
            return fetch(ipAPI).then
              (response => response.json())
              .then(data => Swal.insertQueueStep(data.ip))
              .catch(() => {
                Swal.insertQueueStep({
                  icon: 'error',
                  title: 'Internal Error Please Try later!'
                })
              })

          },
          allowOutsideClick: () => !Swal.isLoading()
        })
        .then(result => {
          if (result.value) {
            !Swal.isLoading();

            this.HospReapplySubbmission();


          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            this.loading = false
            return;
          }

        });

    }
  }

  HospReapplySubbmission() {
    this.reapplyOrRenew;
    this.reapplyOrRenew.userId = 0;


    var result = this.adminService.ReapplyOrRennewFormByHosp(this.reapplyOrRenew);


    result.subscribe(res => {

      if (res.isSuccess) {

        // this.HospReapplyModel.hide();
        this.tostr.success(res.message);
        var refreshToken = this.currentUser.refreshToken;
        var grantType = "refresh_token";
        this.auth.refreshToken_1(refreshToken).subscribe(data => {
          localStorage.setItem('ayushCurrentUser', JSON.stringify(data));
          if (data != null) {
            const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
            console.log("---REFRESHED tOKEN---");
            console.log(currentUser);

            this.router.navigateByUrl('account/basicCert');



          }
        }, error => {


          this.tostr.error(res.message);
          // this.HospReapplyModel.hide();

        })

      }
      else {
        this.tostr.success(res.message);
        // this.HospReapplyModel.hide();
      }




    }, error => {

      // this.HospReapplyModel.hide();

    })

  }
}
export class ReapplyOrRenew {
  application_type: number;
  userId: number;
}
class hospitalDashboardData {
  id: number
  hospital_name: String
  hosp_id: String
  application_number: String
  state: String
  stage_id: number
  organisation_type: String
  stage_history: HospitalStage[] = []
  application_type: String



}
class HospitalStage {
  stage: String
  stage_id: number
  creation_date: Date

}


export class Oa_AssessemtHistry {
  asmt_type_oa: string;
  asmt_date_oa: string | null;
  hospital_name: string;
  bedstrength: string;
  district: string;
  state: string;

  hosp_type: string;
  ret: Oa_AssessemtHistryList[];
}

export class Oa_AssessemtHistryList {
  id: number;
  hosp_id: number;
  asmt_type: string;
  remark: string;
  asmt_date: string | null;
  status: boolean;
}

export class OaAllocationAction {


  date_reject_remarks: string;

  date_rejected_by_hco: boolean;
}