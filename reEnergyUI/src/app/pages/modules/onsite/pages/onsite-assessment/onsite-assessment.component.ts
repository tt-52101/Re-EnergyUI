import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { CommiteeService } from 'src/app/pages/api-services/commitee.service';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import { onsiteAssessmentService } from 'src/app/pages/api-services/onsiteAssessment.service';
import { CCPEningDecisionSearchResponses, CommitteeDto } from 'src/app/pages/model/committee.model';
import { GenAndSosDto, GenralInfoResponseByAsr, ScopeAyurveda, ScopeHemopathy, ScopeNeuropathy, ScopeSidhha, ScopeYunani, SosResponseApp, UpdatedStage } from 'src/app/pages/model/GenAndSosDto.model';
import { OANcHospitalOrCenterDetails, OANcHospitalOrCenterDetailsItem, uploadedDocsCls } from 'src/app/pages/model/OANcHospitalOrCenterDetails';
import { onsiteFormData } from 'src/app/pages/model/Onsite';
import { AssessorSummaryDTO, SecondAssessorfeedbackSumm } from 'src/app/pages/model/summery_assesor.model';
import Swal from 'sweetalert2';
import { FormBuilderDataShareService } from '../../../formbuilder/datashareservices/FormBuilderDataShareService';
import { HospitalDataShareService } from '../../../hospital/hospital/datashareservice/hospitalDataShare.service';

@Component({
  selector: 'app-onsite-assessment',
  templateUrl: './onsite-assessment.component.html',
  styleUrls: ['./onsite-assessment.component.scss']
})
export class OnsiteAssessmentComponent implements OnInit {

  formdata: onsiteFormData;
  formdata2: onsiteFormData;
  formgendata: GenAndSosDto;
  assessment_id = 0;
  hospital_id = 0;
  currentUser: any;
  imgvalue: any;
  genral_tab: GenralInfoResponseByAsr;
  scope_tab: SosResponseApp;
  ayushcount: number = 0;
  yunanicount: number = 0;
  homopathycount: number = 0;
  nuropathycount: number = 0;
  siddhacount: number = 0;
  asrImage: string = "";
  orgbuildingImage: string = "";
  certCordinatorimg: string = "";
  orgnameImg: string = "";

  @ViewChild('feedbackModel', { static: false }) FeedbackModel: any;
  @ViewChild('OACompleteRejectModal') OACompleteRejectModal;
  questiontext: string;
  questionid: number;
  questionserial: number;
  OANcHospitalOrCenterDetailsItem: OANcHospitalOrCenterDetailsItem;
  OANcHospitalOrCenterDetails: OANcHospitalOrCenterDetails;
  isNcClosePreviousStage: boolean;
  rootUrl: any;
  arryNcUploadedDocs: any[];
  saveLadda: boolean = false;
  ncRemark: string = "";
  hideNCcontrol: boolean = false;
  hidesubmit: boolean = false;
  hidesubmitOA: boolean = false;
  hidesrefresh: boolean = false;
  showsumary: boolean = false;
  acceptremark: any;
  rejectremark: any;
  value: number = 0;

  error = '';
  successmsg = false;
  msg: any;
  assessermentSummary: AssessorSummaryDTO;
  isFinalSubmit: boolean;
  formSubmitted: boolean = false;
  @ViewChild('dicisionForm') dicisionForm: NgForm;

  @ViewChild('openAssessmentModel', { static: false }) OpenAssessmentModel: any;
  @ViewChild('assessmentfeedbackForm') assessmentfeedbackForm: NgForm;
  @ViewChild('summaryForm') summaryForm: NgForm;
  sec: SecondAssessorfeedbackSumm;
  hidefeedback: boolean = false;
  hidesummary: boolean = false;
  stagedata: UpdatedStage;
  stageid: number = 0;
  isSubmitNcLadda: boolean = false;
  committeeRespone: CommitteeDto;
  ccpening: CCPEningDecisionSearchResponses;
  loading: boolean;
  loading2: boolean;
  @ViewChild('ccModel') ccModel;
  constructor(private http: HttpClient, private committeeService: CommiteeService, private tostr: CustomTosterServiceService, private router: Router, private uploadService: FileUploadService, private authenticationService: AuthenticationService, private hospdataserv: HospitalDataShareService, private fileUpldSrvc: FileUploadService, private dataservc: FormBuilderDataShareService, private onsiteservc: onsiteAssessmentService, private modalService: NgbModal) {
    this.formdata = new onsiteFormData();
    this.formgendata = new GenAndSosDto();
    this.genral_tab = new GenralInfoResponseByAsr();
    this.scope_tab = new SosResponseApp();
    this.scope_tab.scopeayurveda = new ScopeAyurveda();
    this.scope_tab.scopeHemopathy = new ScopeHemopathy();
    this.scope_tab.scopenuropathy = new ScopeNeuropathy();
    this.scope_tab.scopesidhha = new ScopeSidhha();
    this.scope_tab.scopeyunani = new ScopeYunani();
    this.committeeRespone = new CommitteeDto();
    this.ccpening = new CCPEningDecisionSearchResponses();
    this.stagedata = new UpdatedStage();
    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.rootUrl = authenticationService.apiUrl;
    this.OANcHospitalOrCenterDetails = new OANcHospitalOrCenterDetails();
    //start by rrk
    isFinalSubmit: false;
    this.assessermentSummary = new AssessorSummaryDTO();

    this.assessermentSummary.asmtdate = new Date;
    this.assessermentSummary.asmtid = 0;
    this.assessermentSummary.pasr_id = 0;
    this.assessermentSummary.sasr_id = 0;
    this.assessermentSummary.sasr_name = "";
    this.assessermentSummary.pasr_name = "";
    this.assessermentSummary.summary = "";
    this.assessermentSummary.feedbackbyAsr = new SecondAssessorfeedbackSumm();
    this.ccpening = new CCPEningDecisionSearchResponses();

    //end by rrk

  }

  ngOnInit(): void {
    if (this.currentUser) {
      if (this.currentUser.roleId == 5) {
        this.dataservc.getVendorDataByasr().subscribe(data => {

          // this.assessment_id=data
          this.assessment_id = data.hosp_id;
          // this.hospital_id = data.hosp_id;
          // this.vendor_name=data.name
          // this.hidesubmitOA = false;
        })
      } else if (this.currentUser.roleId == 1 || this.currentUser.roleId == 2 || this.currentUser.roleId == 8) {
        this.dataservc.getVendorData().subscribe(data => {

          // this.assessment_id=data
          this.assessment_id = data.hosp_id;
          this.hidesubmitOA = true;
          this.hidesubmit = true;
          // this.hospital_id = data.hosp_id;
          // this.vendor_name=data.name

        })
      } else {
        this.dataservc.getVendorDatahosp().subscribe(data => {

          // this.assessment_id=data
          this.assessment_id = data;

          // this.hospital_id = data.hosp_id;
          // this.vendor_name=data.name
          // this.hidesubmitOA = false;
        })
      }

    }

    this.getGendata();
    //  this.getFormData();

  }
  saveCCDecision(savetype: number) {
    let u_id = Number(history.state.uid);
    this.committeeRespone;
    debugger
    if ((this.committeeRespone.recommended == null || this.committeeRespone.non_recommended == null || this.committeeRespone.non_recommended == null) && (this.committeeRespone.da_advisary == null || this.committeeRespone.da_advisary == '') && (this.committeeRespone.oa_advisary == null || this.committeeRespone.oa_advisary == '')) {
      Swal.fire("Please fill mandatory fiels ");
      return 0;
    }
    this.committeeService.saveupdateCommetedecsion(this.committeeRespone, this.assessment_id, savetype).subscribe(res => {
      console.log(res);
      if (res.isSuccess == true) {

        // this.successmsg = true;
        this.loading = false;
        this.loading2 = false;

        this.positionSuccess(res.message);
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
    // let hospital_id = 101;
    this.committeeService.getCommiteeData(this.assessment_id).subscribe(res => {
      this.committeeRespone = res;
      if (this.committeeRespone.scope_tab != null) {
        this.ayushcount = this.committeeRespone.scope_tab.scopeayurveda.sosvalues.length;
        this.homopathycount = this.committeeRespone.scope_tab.scopeHemopathy.sosvalues.length;
        this.siddhacount = this.committeeRespone.scope_tab.scopesidhha.sosvalues.length;
        this.yunanicount = this.committeeRespone.scope_tab.scopeyunani.sosvalues.length;
        this.nuropathycount = this.committeeRespone.scope_tab.scopenuropathy.sosvalues.length;
      }

      console.log(".....committee Response......")
      console.log(this.committeeRespone)
    })
  }
  openCCpopup() {
    this.getComitteData();
    this.modalService.open(this.ccModel, { size: 'xl' });
  }
  goCCdashboard() {
    this.router.navigateByUrl("ccdashboard");
  }
  redirectToDA() {

    if (this.formdata.org_type.trim() == "Hospital") {
      this.router.navigateByUrl('assessment/hospitalapplication', { state: { uid: this.formdata.hospital_id } })
      // this.router.navigateByUrl('comettee/hospitalapplicationDa', { state: { uid: data.hosp_id } })

    } else if (this.formdata.org_type.trim() == "Centre") {
      this.router.navigateByUrl('assessment/centerHospitalapplication', { state: { uid: this.formdata.hospital_id } })
    }
    else {

    }
  }
  getFormData() {

    this.hospdataserv.setLoaderStatus(true);
    this.onsiteservc.getAssessmentData(this.assessment_id).subscribe(result => {
      this.hospdataserv.setLoaderStatus(false);

      this.formdata = result;


      console.log(this.formdata);
      this.getStageData();
    }, error => {
      this.hospdataserv.setLoaderStatus(false);

    });


  }
  getFormData2() {

    // this.hospdataserv.setLoaderStatus(true);
    this.onsiteservc.getAssessmentData2(this.assessment_id).subscribe(result => {
      // this.hospdataserv.setLoaderStatus(false);

      this.formdata2 = result;
      this.formdata.getSectionWebs = this.formdata2.getSectionWebs;

      console.info(this.formdata2);
      // this.getStageData();
    }, error => {
      // this.hospdataserv.setLoaderStatus(false);

    });


  }
  getStageData() {


    this.onsiteservc.getStageData(this.assessment_id).subscribe(result => {


      this.stagedata = result;
      this.stageid = this.stagedata.stage_id;
      console.log(this.stagedata);
      this.getFormData2();
    }, error => {


    });


  }

  getGendata() {
    this.hospdataserv.setLoaderStatus(true);
    // this.asrImage = "";
    // this.certCordinatorimg = "";
    // this.orgbuildingImage = "";
    // this.orgnameImg = "";
    this.onsiteservc.getGenData(this.assessment_id).subscribe(result => {

      this.formgendata = result;
      this.genral_tab = result.genral_tab;
      if (this.genral_tab == null) {
        this.genral_tab = new GenralInfoResponseByAsr();
      }
      this.scope_tab = result.scope_tab;
      console.error(this.formgendata);
      console.error(this.scope_tab);
      if (this.scope_tab != null) {
        this.ayushcount = this.scope_tab.scopeayurveda.sosvalues.length;
        this.homopathycount = this.scope_tab.scopeHemopathy.sosvalues.length;
        this.siddhacount = this.scope_tab.scopesidhha.sosvalues.length;
        this.yunanicount = this.scope_tab.scopeyunani.sosvalues.length;
        this.nuropathycount = this.scope_tab.scopenuropathy.sosvalues.length;
      } else {
        this.scope_tab = new SosResponseApp();
      }


      this.hospdataserv.setLoaderStatus(false);


      this.getFormData();

    }, error => {
      this.hospdataserv.setLoaderStatus(false);

    });
  }

  downloadAsrDP1(photourl, urlFor) {
    var vorgfn = "";
    if (photourl != null && photourl != '' && photourl != undefined) {
      var str_array = photourl.split('||');
      vorgfn = str_array[0].split('|')[1];

      var result = this.fileUpldSrvc.downloadUploadedFile(vorgfn);
      result.subscribe(res => {
        if (res.isSuccess == true) {
          if (urlFor == 1) { // asr image
            this.asrImage = res.message;
            console.error(res.message);
          }

          if (urlFor == 2) { // org building img
            this.orgbuildingImage = res.message;
            console.error(res.message);
          }
          if (urlFor == 3) { // cert coordinator img
            this.certCordinatorimg = res.message;
            console.error(res.message);
          }
          if (urlFor == 4) { // org name img
            this.orgnameImg = res.message;
            console.error(res.message);

          }
        }
        else {
          console.log("pic " + res.message);
        }
      }, error => {
        //console.log(error);
      })
    }
  }
  OpenDocUrl(docUrl) {
    window.open(docUrl, '_blank');
  }

  opendeclarationModal(declarationModel: any) {
    this.modalService.open(declarationModel, { size: 'lg' });
  }

  openFeedbackmodel(FeedbackModel: any) {

    this.modalService.open(FeedbackModel, { size: 'xl' });
  }

  openNcmodel(ncModel: any, questiontext: string, questionid: number, questionserial: number, ncremakr: string) {
    // debugger
    // if (this.currentUser.userId == this.formdata.assessor2_id) {
    //   return 0;
    // }
    this.questiontext = questiontext;
    this.questionid = questionid;
    this.questionserial = questionserial;
    this.ncRemark = ncremakr;
    this.getQuesWiseNc();
    this.modalService.open(ncModel, { size: 'lg' });
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
  getQuesWiseNc() {
    this.OANcHospitalOrCenterDetailsItem = new OANcHospitalOrCenterDetailsItem();//resetting data

    this.http.get<OANcHospitalOrCenterDetailsItem>(this.authenticationService.apiUrl + 'daNc/OaqueWiseNc/' + this.assessment_id + "?quest_id=" + this.questionid)
      .subscribe(res => {
        ////debugger
        if (res.total > 0) {
          this.OANcHospitalOrCenterDetailsItem = res;
          this.OANcHospitalOrCenterDetails = Object.assign({}, res.rows[0]);
          // debugger
          this.isNcClosePreviousStage = true;
          this.NcDocsArrayGenerator(this.OANcHospitalOrCenterDetails.uploadUrl);
          //this.daNcHospitalOrCenterDetails.uploadUrl = null;
          if (this.currentUser.roleId == 5 && this.currentUser.stage_id > 0 && this.OANcHospitalOrCenterDetailsItem.rows.length == 1) {
            this.OANcHospitalOrCenterDetails.isOpen = null;
            this.OANcHospitalOrCenterDetails.finalRemark = null;

          }


          if (this.currentUser.roleId == 5 && this.currentUser.stage_id > 0 && this.OANcHospitalOrCenterDetailsItem.rows.length == 2) {
            if (this.OANcHospitalOrCenterDetails.isOpen == false) {
              this.isNcClosePreviousStage = false;
            }
            this.OANcHospitalOrCenterDetails.isOpen == null;
            this.OANcHospitalOrCenterDetails.finalRemark == null;
          }
          //rkk

          //  if(this.hospitalPages.stage_id == 80 && this.currUsrRole == 5){
          //   if(this.daNcHospitalOrCenterDetails.isOpen==false){
          //     this.isNcClosePreviousStage === false;
          //   }


          // }
        }
        this.getFormData2();

      }, error => {
        console.log(error);
      })
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
            let docCls = new uploadedDocsCls();
            docCls.fn = str_array[i].split('|')[0];
            docCls.orgfn = str_array[i].split('|')[1];
            this.arryNcUploadedDocs.push(docCls);
          }

        }
      }
    }
  }
  openById = {}
  panelChange(event) {
    this.openById[event.panelId] = event.nextState;
  }
  notrecmndPendngHide() {
    this.committeeRespone.non_recommended = false;

    this.committeeRespone.pending_recommended = false;
    this.committeeRespone.non_recommend_remark = null;
    this.committeeRespone.pending_recommended = null;
  }
  recmndPandngHide() {
    this.committeeRespone.recommended = false;
    this.committeeRespone.pending_recommended = false;
    this.committeeRespone.recommend_remark = null;
    this.committeeRespone.pending_remark = null;

  }
  recomndNotcomndHide() {
    this.committeeRespone.non_recommended = false;
    this.committeeRespone.recommended = false;
    this.committeeRespone.non_recommend_remark = null;
    this.committeeRespone.recommend_remark = null;

  }

  RaiseNc(action) {

    // this.OANcHospitalOrCenterDetails.isOpen = true;
    if (this.OANcHospitalOrCenterDetails.finalRemark == null || this.OANcHospitalOrCenterDetails.finalRemark == "") {
      Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
      return;
    }
    if (this.OANcHospitalOrCenterDetails.isOpen == null || this.OANcHospitalOrCenterDetails.isOpen == undefined) {
      Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
      return;
    }
    this.NcAddUpdate(action)
  }
  NcAddUpdate(action) {


    if (this.questionid <= 0) {
      //console.log("error");
      return;
    }
    if (this.assessment_id <= 0) {
      //console.log("error");
      return;
    }
    if (action == -1) {
      this.saveLadda = false;
    } else {
      this.saveLadda = true;
    }
    this.OANcHospitalOrCenterDetails.hospital_id = this.assessment_id;
    this.http.post<any>(this.authenticationService.apiUrl + 'daNc/updateOAnc', this.OANcHospitalOrCenterDetails)
      .subscribe(res => {
        if (action == 0) {
          if (res.isSuccess) {
            this.OANcHospitalOrCenterDetails.id = res.id;
            this.tostr.success(res.message);
            this.saveLadda = false;
            this.getQuesWiseNc()
            //this.getAllQueNc();
            this.modalService.dismissAll();

          }
        }

      }, error => {
        console.log(error);
        this.modalService.dismissAll();
        this.saveLadda = false
      })

  }

  SubmitNc() {
    this.isSubmitNcLadda = true;

    var hospitalId = this.assessment_id;

    this.http.post<any>(this.authenticationService.apiUrl + 'daNc/SubmitOANC', hospitalId)
      .subscribe(res => {

        if (res.isSuccess) {
          if (res.id == 1) {
            this.OpenOACompleteRejectModal(res.id);
          } else if (res.id == 2) {
            this.OpenOACompleteRejectModal(res.id);

          } else if (res.id == 3) {

            this.alertSweet(3);
          }

          this.isSubmitNcLadda = false;
        } else {
          this.tostr.warning(res.message);
          this.isSubmitNcLadda = false;
        }




      }, error => {
        console.log(error);
        this.isSubmitNcLadda = false;
      })
  }

  public oaCompleteRejHead: string = '';
  public OARemarkText: string = "";
  isDaComplete: boolean;
  public messageShown: string = "";
  public classshown: string = "";
  public colorclass: string = "";
  OpenOACompleteRejectModal(datype: number) {
    if (datype == 1) {
      // this.isDaComplete = true;
      this.oaCompleteRejHead = "OA Accept Remarks";
      this.messageShown = "The Onsite Assessment for the organisation will be accepted as there are no open NC in the application. Please enter the remarks.";
      this.classshown = "alert alert-success  fade show mb-2";
      this.colorclass = "text-success mt-2";
      this.value = 1;
    }
    else if (datype == 2) {
      // this.isDaComplete = false;
      this.oaCompleteRejHead = "OA Reject Remarks";
      this.messageShown = "The Onsite Assessment for the organisation will be rejected as there are  open NC in the application. Please enter the remarks.";
      this.classshown = "alert alert-danger  fade show mb-2";
      this.colorclass = "text-danger mt-2";
      this.value = 2;
    }

    this.modalService.open(this.OACompleteRejectModal, { size: 'lg' });


  }


  alertSweet(val) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2',
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure you want to submit the On-site Assessment? ',
        text: 'The details once submitted cannot be edited.',

        icon: 'warning',
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        showLoaderOnConfirm: true,

        allowOutsideClick: () => !Swal.isLoading()

      })
      .then(result => {
        this.hospdataserv.setLoaderStatus(true);
        if (result.isConfirmed) {

          if (val == 1) {
            this.SaveFinalNcByOA(1);
          } else if (val == 2) {
            this.SaveFinalNcByOA(2);
          }
          else if (val == 3) {
            this.SaveFinalNcByOA(3);
          }

          this.hospdataserv.setLoaderStatus(false);
          // this.hospdataserv.setLoaderStatus(false);
        } else if (

          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel

        ) {

          // this.loading = false;
          return this.hospdataserv.setLoaderStatus(false);
        }
      });


  }

  SaveFinalNcByOA(savetype: number) {
    var hospitalId = this.assessment_id;

    this.http.post<any>(this.authenticationService.apiUrl + 'daNc/FinalRemark', { hospitalId: hospitalId, OARemarkText: this.OARemarkText, savetype: savetype })
      .subscribe(res => {

        if (res.isSuccess) {
          this.modalService.dismissAll();

          this.tostr.success(res.message);
          this.getStageData();

        } else {
          this.modalService.dismissAll();

          this.tostr.warning(res.message);
          this.getStageData();
        }


      }, error => {
        console.log(error);
        // this.isSubmitNcLadda = false;
      })
  }



  //start by rrk
  openAssessmentModel(OpenAssessmentModel: any) {

    this.modalService.open(OpenAssessmentModel, { size: 'xl' });
  }
  //end by rrk


  saveAsseserSummaryData() {
    this.assessermentSummary.hospital_id = this.assessment_id;
    this.assessermentSummary.asmtid = this.genral_tab.assessment_id;
    // this.assessermentSummary.sasr_id = this.formdata.
    console.log("assessermentSummary")
    console.log(this.assessermentSummary)
    this.onsiteservc.saveSummaeryData(this.assessermentSummary).subscribe(res => {

      console.log(res);
      if (res.isSuccess) {

        this.successmsg = true;
        this.msg = res.message;
        this.positionSuccess(this.msg);
        this.modalService.dismissAll();
        this.getStageData();
        //this.getGendata();
      }
      else {
        this.successmsg = false;
        this.msg = "";
        this.error = res.message;
        this.positionError(this.error);

      }
    })
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
  alertSweet2() {
    // if (this.dicisionForm.invalid) {
    //   Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
    //   this.formSubmitted = true;
    //   this.loading2 = false;
    //   this.loading = false;
    //   return;
    // }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure you want to submit the assessment summary form?',
        text: 'The details once entered cannot be edited.',
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {

          this.saveAsseserSummaryData();
        } else if (

          result.dismiss === Swal.DismissReason.cancel
        ) {

          return;
        }
      });
  }
  saveAssesserSummary() {
    if (this.assessmentfeedbackForm.invalid) {
      Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
      this.formSubmitted = true;
      return;
    } else {
      this.isFinalSubmit = true;

      this.alertSweet2();

    }
  }
}
