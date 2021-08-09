import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { HospitalPages, HospitalPagesQuestionBank } from 'src/app/pages/model/hospital/HospitalPages.model';
import { HospitalDataShareService } from './datashareservice/hospitalDataShare.service';
import { View } from '@fullcalendar/core';
import { QualityOfCareComponent } from './pages/qualityofcare/quality-of-care.component';
import { TrainingComponent } from './pages/training/training.component';
import { PatientrecordComponent } from './pages/patientrecord/patientrecord.component';
import { InfectionControlComponent } from './pages/infection-control/infection-control.component';
import { AdmissionDischargeComponent } from './pages/admission-discharge/admission-discharge.component';
import { FormGroup, NgForm } from '@angular/forms';
import { GenralformComponent } from './pages/genralform/genralform.component';
import { AdminrecordComponent } from './pages/adminrecord/adminrecord.component';
import { HumanResourceComponent } from './pages/human-resource/human-resource.component';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { StatutaryComplianceComponent } from './pages/statutary-compliance/statutary-compliance.component';
import { ScopeOfServiceComponent } from './pages/scope-of-service/scope-of-service.component';
import { SupportServiceComponent } from './pages/support-service/support-service.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DaNcHospitalOrCenterDetails, DaNcHospitalOrCenterDetailsItem, uploadedDocsCls, DaRejectCls } from 'src/app/pages/model/DaNcHospitalOrCenterDetails';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import { FormBuilderDataShareService } from '../../formbuilder/datashareservices/FormBuilderDataShareService';
import { CCPEningDecisionSearchResponses, CommitteeDto } from 'src/app/pages/model/committee.model';
import { CommiteeService } from '../../../api-services/commitee.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})

export class HospitalComponent implements OnInit {

  rootUrl: string;
  hospitalPages: HospitalPages;
  hospitalPagesQueBank: HospitalPagesQuestionBank;
  @ViewChild(GenralformComponent) genralInfoformComponent: GenralformComponent;
  @ViewChild(QualityOfCareComponent) qocComponent: QualityOfCareComponent;
  @ViewChild(TrainingComponent) trainingComponent: TrainingComponent;
  @ViewChild(PatientrecordComponent) patientrecordComponent: PatientrecordComponent;
  @ViewChild(InfectionControlComponent) infectionControlComponent: InfectionControlComponent;
  @ViewChild(AdmissionDischargeComponent) admissionDischargeComponent: AdmissionDischargeComponent;
  @ViewChild(AdminrecordComponent) adminrecordComponent: AdminrecordComponent;
  @ViewChild(HumanResourceComponent) humanResourceComponent: HumanResourceComponent;
  @ViewChild(StatutaryComplianceComponent) statutaryComplianceComponent: StatutaryComplianceComponent;
  @ViewChild(ScopeOfServiceComponent) scopeOfServiceComponent: ScopeOfServiceComponent;
  @ViewChild(SupportServiceComponent) supportServiceComponent: SupportServiceComponent;



  genIfoFrom: NgForm;
  qocform: NgForm;
  trainingform: NgForm;
  patientrecordform: NgForm;
  infectioncontrolform: NgForm;
  admissiondischargeform: NgForm;
  adminrecordform: NgForm;
  humanResourceform: NgForm;
  statutaryComplianceform: NgForm;
  scopeOfServiceform: NgForm;
  supportServiceForm: NgForm;
  declarationForm: NgForm;
  dicisionDAForm: NgForm;
  dicisionForm: NgForm;
  dicisionOAForm: NgForm;



  formSubmitted: boolean = false;
  currentUser: any;

  public currUsrRole: number;
  @ViewChild('daNcModel') daNcModel;
  @ViewChild('DaCompleteRejectModal') DaCompleteRejectModal;
  @ViewChild('decForm') decForm: NgForm;
  @ViewChild('decDaForm') decDaForm: NgForm;
  @ViewChild('decOaForm', { static: false }) decOaForm: NgForm;
  @ViewChild('ccModel') ccModel;
  daNcHospitalOrCenterDetails: DaNcHospitalOrCenterDetails;
  daNcHospitalOrCenterDetailsItem: DaNcHospitalOrCenterDetailsItem;
  public ncFormTabInfo: any;
  public daCompletebtn: boolean = false;
  public daRejectbtn: boolean = false;
  public daNcReviewbtn: boolean = false;
  public hcoNcResponsebtn: boolean = false;
  arryNcUploadedDocs: uploadedDocsCls[] = new Array();
  isNcClosePreviousStage: Boolean = true;

  //#region rrc
  public invalidFldAry = [];
  public invalidFldCnt: number = 0;
  public remainingFldCnt: number = 0;
  public totalRemainingFldCnt: number = 0;
  public FldCnt_all: number = 0;
  public totCtrl_hosp: number = 0;

  aplcProgress: number;
  isFinalSubmit: boolean;
  DisableBtn: boolean;
  //#endregion

  //#region rupendra
  committee_model: CommitteeDto;
  committeeRespone: CommitteeDto;
  ccpening: CCPEningDecisionSearchResponses;
  //#endregion
  recommended: boolean | null;
  non_recommended: boolean | null;
  pending_recommended: boolean | null;
  ayushcount: number = 0;
  homopathycount: number = 0;
  siddhacount: number = 0;
  yunanicount: number = 0;
  nuropathycount: number = 0;
  savetype: number = 0;
  loading: boolean;
  loading2: boolean;
  classshown: string = "";
  colorclass: string = "";
  messageShown: any = "";
  declartion_new: Boolean = false;
  constructor(private http: HttpClient, private committeeService: CommiteeService, private dataservc: FormBuilderDataShareService, private authenticationService: AuthenticationService, private hospdataserv: HospitalDataShareService, private _cdRef: ChangeDetectorRef, private tostr: CustomTosterServiceService, private router: Router, private modalService: NgbModal, private uploadService: FileUploadService) {

    this.rootUrl = authenticationService.apiUrl;
    const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.currentUser = currentUser;

    //rrc
    this.totCtrl_hosp = authenticationService.totalCtrl_hospp;
    this.aplcProgress = 0;
    this.isFinalSubmit = false;
    //rrc

    //#region rupendra
    this.committee_model = new CommitteeDto();
    this.committeeRespone = new CommitteeDto();
    this.ccpening = new CCPEningDecisionSearchResponses();
    //#endregion

    this.currUsrRole = this.currentUser.roleId;
    this.hospitalPages = new HospitalPages();
    this.hospitalPagesQueBank = new HospitalPagesQuestionBank();
    this.daNcHospitalOrCenterDetails = new DaNcHospitalOrCenterDetails();

    this.GetQuestionBank();

    if (history.state != undefined && history.state != null) {
      if (history.state.uid != undefined && history.state.uid != null) {
        let u_id = Number(history.state.uid);
        this.getDataForAssessor(u_id)
      }
      else {
        this.GetGenForm();
      }
    }
    else {
      this.GetGenForm();
    }


    this.hospdataserv.ncFormTabInfo.subscribe(value => {
      this.ncFormTabInfo = value;
    })

  }

  ngOnInit(): void {


    // this.route.queryParams
    // .subscribe(params => {

    //   //debugger
    //   let uid_exist=params.hasOwnProperty("uid");
    //   if(uid_exist==false)
    //   {
    //     this.GetGenForm();

    //   }
    //   else
    //   {
    //     let u_id=Number(params.uid);
    //     this.getDataForAssessor(u_id)




    //   }


    //
    // })
    this.ccpening = new CCPEningDecisionSearchResponses();
    // this.committeeRespone.ccpening.rows.find(x=>x.hospital_id=101);
    // this.committeeRespone.ccpening.rows.find(x=>x.decision_id=0);
    // this.committeeRespone.scope_tab.hospital_id = 101;
    // this.committeeRespone.scope_tab.assessment_id = 0

  }
  alertSweet2(savetype: number) {
    // this.decForm;
    // debugger
    // if (this.dicisionForm.invalid || this.dicisionDAForm.invalid || this.dicisionOAForm.invalid) {
    //   Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
    //   // this.formSubmitted = true;
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
  saveCCDecision(savetype: number) {
    let u_id = Number(history.state.uid);
    this.committeeRespone;
    debugger
    this.committeeService.saveupdateCommetedecsion(this.committeeRespone, u_id, savetype).subscribe(res => {
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
  getComitteData() {
    // let hospital_id = 101;
    let u_id = Number(history.state.uid);
    this.committeeService.getCommiteeData(u_id).subscribe(res => {
      this.committeeRespone = res;
      // debugger
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

  getDataForAssessor(hospid) {
    this.hospdataserv.currentStage.next(0);
    this.http.get<HospitalPages>(this.rootUrl + "assessors/HospitalSectionData?hospid=" + hospid).subscribe(data => {
      console.log("hospitalSections data");
      console.log(data);

      let test = data.support_service.imaging_service_list;
      this.hospitalPages = data;

      if (this.hospitalPages.hosp_progress && this.hospitalPages.hosp_progress > 0) {
        this.aplcProgress = this.hospitalPages.hosp_progress;
      }
      else {
        this.aplcProgress = 5;
      }

      this.hospdataserv.currentStage.next(this.hospitalPages.stage_id);

      if (this.currUsrRole != 3) {
        this.hospdataserv.setButtonsHide(true);
      }
      if (this.currUsrRole == 3 && this.hospitalPages.stage_id > 20) {
        this.hospdataserv.setButtonsHide(true);
      }
      if (this.hospitalPages.stage_id > 40) {
        this.getAllQueNc();
      }

      if (this.hospitalPages.stage_id == 50 && this.currUsrRole == 3) {
        this.daNcReviewbtn = false;
        this.hcoNcResponsebtn = true;
      }
      if (this.hospitalPages.stage_id == 70 && this.currUsrRole == 3) {

        this.daRejectbtn = false;
        this.daCompletebtn = false;

        this.daNcReviewbtn = false;
        this.hcoNcResponsebtn = true;
      }

      if (this.hospitalPages.isFinalSubmit) {

        this.genIfoFrom.form.disable();
        this.qocform.form.disable();
        this.trainingform.form.disable();
        this.patientrecordform.form.disable();
        this.infectioncontrolform.form.disable();
        this.admissiondischargeform.form.disable();
        this.adminrecordform.form.disable();
        this.admissiondischargeform.form.disable();
        this.humanResourceform.form.disable();
        this.scopeOfServiceform.form.disable();
        this.supportServiceForm.form.disable();
        this.statutaryComplianceform.form.disable();



        let licienceGroup = this.statutaryComplianceform.form.controls.licienceDetails as FormGroup

        // Object.keys(licienceGroup.controls).forEach(key=>
        //   {
        //     licienceGroup.get(key).disable();
        //   })



      }
      this.hospdataserv.setData(this.hospitalPages);


    },
      error => {

        console.log(JSON.stringify(error));

      });

  }
  ngAfterViewInit() {



    this._cdRef.detectChanges();
    this.genIfoFrom = this.genralInfoformComponent.GeneralForm
    this.qocform = this.qocComponent.qualityofcareform;
    this.trainingform = this.trainingComponent.trainingform;
    this.patientrecordform = this.patientrecordComponent.patientrecordform;
    this.infectioncontrolform = this.infectionControlComponent.infectioncontrolform;
    this.admissiondischargeform = this.admissionDischargeComponent.admissiondisform;
    this.adminrecordform = this.adminrecordComponent.adminrecordform;
    this.admissiondischargeform = this.admissionDischargeComponent.admissiondisform;

    this.scopeOfServiceform = this.scopeOfServiceComponent.scopeOfServiceform;


    this.supportServiceForm = this.supportServiceComponent.supportServiceForm;
    this.declarationForm = this.supportServiceComponent.Declarationform;

    this.statutaryComplianceform = this.statutaryComplianceComponent.statutaryform;

    console.log('statutory compilance')
    console.log(this.statutaryComplianceform.form);

    this.humanResourceform = this.humanResourceComponent.humanResourceform;
  }


  async GetGenForm() {
    this.hospdataserv.currentStage.next(0);
    this.http.get<HospitalPages>(this.rootUrl + "hospitalSections").subscribe(data => {
      console.log("hospitalSections data");
      console.log(data);

      this.hospitalPages = data;

      // rrc
      if (this.hospitalPages.hosp_progress && this.hospitalPages.hosp_progress > 0) {
        this.aplcProgress = this.hospitalPages.hosp_progress;
      }
      else {
        this.aplcProgress = 5;
      }
      // rrc

      this.hospdataserv.setData(this.hospitalPages);

      this.hospdataserv.currentStage.next(this.hospitalPages.stage_id);

      if (this.currUsrRole != 3) {
        this.hospdataserv.setButtonsHide(true);

      }
      if (this.currUsrRole == 3 && this.hospitalPages.stage_id > 20) {
        this.hospdataserv.setButtonsHide(true);
      }

      if (this.hospitalPages.stage_id > 40) {
        this.getAllQueNc();
      }

      if (this.hospitalPages.stage_id == 50 && this.currUsrRole == 3) {
        this.daNcReviewbtn = false;
        this.hcoNcResponsebtn = true;
      }
      if (this.hospitalPages.stage_id == 70 && this.currUsrRole == 3) {

        this.daRejectbtn = false;
        this.daCompletebtn = false;

        this.daNcReviewbtn = false;
        this.hcoNcResponsebtn = true;
      }

      if (this.hospitalPages.isFinalSubmit) {
        this.genIfoFrom.form.disable();
        this.qocform.form.disable();
        this.trainingform.form.disable();
        this.patientrecordform.form.disable();
        this.infectioncontrolform.form.disable();
        this.admissiondischargeform.form.disable();
        this.adminrecordform.form.disable();

        this.humanResourceform.form.disable();
        this.scopeOfServiceform.form.disable();
        this.supportServiceForm.form.disable();
        this.statutaryComplianceform.form.disable();


        //let licienceGroup=this.statutaryComplianceform.form.controls.licienceDetails as FormGroup

        // Object.keys(licienceGroup.controls).forEach(key=>
        //   {
        //     licienceGroup.get(key).disable();
        //   })

      }



    },
      error => {

        console.log(JSON.stringify(error));

      });
  }



  async GetQuestionBank() {

    this.http.get<any>(this.rootUrl + "unauthorized/questionBanks").subscribe(data => {
      console.log("question bank data");
      console.log(data);
      this.hospitalPagesQueBank = data;
      this.hospdataserv.setQuestionBankData(this.hospitalPagesQueBank);



    },
      error => {

        console.log(JSON.stringify(error));

      });
  }
  submitForm(saveType: number) {



    this.hospitalPages.saveType = saveType;
    if (saveType == 0) {
      this.hospitalPages.saveType = saveType;
      // this.alertSweet(); //vk
      this.saveoUpdateHospitalForm();

    }

    if (saveType == -1) {
      this.hospitalPages.saveType = saveType;
      this.saveoUpdateHospitalForm();

    }
    if (saveType == 1) { // final submit
      this.formSubmitted = true; // rrc
      this.hospdataserv.setFormSubmissionStatus(true);
      // //debugger
      console.log('gen-form');
      console.log(this.genIfoFrom.invalid);

      console.log('Error in Form(s) on Final Submit ');

      if (this.qocform.invalid) {
        console.log(".. this.qocform ..")
        console.log(this.qocform.form);
      }

      if (this.trainingform.invalid) {
        console.log(".. this.trainingform ..")
        console.log(this.trainingform.form);
      }

      if (this.patientrecordform.invalid) {
        console.log(".. this.patientrecordform ..")
        console.log(this.patientrecordform.form);
      }

      if (this.infectioncontrolform.invalid) {
        console.log(".. this.infectioncontrolform ..")
        console.log(this.infectioncontrolform.form);
      }

      if (this.admissiondischargeform.invalid) {
        console.log(".. this.admissiondischargeform ..")
        console.log(this.admissiondischargeform.form);
      }

      if (this.adminrecordform.invalid) {
        console.log(".. this.adminrecordform ..")
        console.log(this.adminrecordform.form);
      }

      if (this.humanResourceform.invalid) {
        console.log(".. this.humanResourceform ..")
        console.log(this.humanResourceform.form);
      }

      if (this.statutaryComplianceform.invalid) {
        console.log(".. this.statutaryComplianceform ..")
        console.log(this.statutaryComplianceform.form);
      }

      if (this.scopeOfServiceform.invalid) {
        console.log(".. this.scopeOfServiceform ..")
        console.log(this.scopeOfServiceform.form);
      }

      if (this.supportServiceForm.invalid) {
        console.log(".. this.supportServiceForm ..")
        console.log(this.supportServiceForm.form);
      }

      if (this.declarationForm.invalid) {
        console.log(".. this.declarationForm ..")
        console.log(this.declarationForm.form);
      }

      if (this.genIfoFrom.invalid || this.qocform.invalid || this.trainingform.invalid || this.patientrecordform.invalid || this.infectioncontrolform.invalid || this.admissiondischargeform.invalid || this.adminrecordform.invalid || this.humanResourceform.invalid || this.statutaryComplianceform.invalid || this.scopeOfServiceform.invalid || this.supportServiceForm.invalid || this.declarationForm.invalid) {
        Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");

        return;
      } else {
        this.isFinalSubmit = true;

        this.alertSweet();
        // this.saveoUpdateHospitalForm();
      }



    }



  }


  alertSweet() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure you want to submit the registration form?',
        text: 'The details once entered cannot be edited.',
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {

          this.saveoUpdateHospitalForm();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {

          return;
        }
      });
  }

  saveoUpdateHospitalForm() {

    // rrc
    if (this.isFinalSubmit != true) {
      this.CalculateApplicationProgress();

      if (this.aplcProgress && this.aplcProgress > 0)
        this.hospitalPages.hosp_progress = this.aplcProgress;
    }
    else {
      this.aplcProgress = 100;
      this.hospitalPages.hosp_progress = this.aplcProgress;
    }
    // rrc

    let tt = this.hospitalPages.patient_record.performa_of_the_consent_in_the_language
    this.http.post<any>(this.authenticationService.apiUrl + 'hospitalSections/hospital', this.hospitalPages).subscribe(res => {

      this.isFinalSubmit = false; // rrc
      if (res.isSuccess) {

        if (this.hospitalPages.saveType == -1) {
          this.hospdataserv.setDeleteRecordStatus(true);

          this.tostr.success("Delete succussfully");
        } else if (this.hospitalPages.saveType == 1) {
          this.tostr.success(res.message);
          this.router.navigate(['hospital/applicationFee']);
        } else {
          this.tostr.success(res.message);
        }

        this.GetGenForm();
      } else {
        this.tostr.success(res.message);
      }

    }, error => {
      console.log(error);
    })
  }


  //#region  DaNc block
  //daNcModel: any;

  public saveLadda: boolean = false;
  public fileUploadLadda: boolean = false;
  public selectedFile: any;
  filename: string;
  public ques_text: string = '';

  openNcModelForChild(data: any) {

    this.daNcHospitalOrCenterDetails = new DaNcHospitalOrCenterDetails();

    this.daNcHospitalOrCenterDetails.classObject = data.ObjName;;
    this.daNcHospitalOrCenterDetails.propertyName = data.propName;
    this.daNcHospitalOrCenterDetails.ques_id = data.quesObj.ques_id;
    this.ques_text = data.quesObj.ques_text;
    this.getQuesWiseNc();
    this.modalService.open(this.daNcModel, { size: 'lg' });
  }



  getQuesWiseNc() {
    this.daNcHospitalOrCenterDetailsItem = new DaNcHospitalOrCenterDetailsItem();//resetting data

    this.http.get<DaNcHospitalOrCenterDetailsItem>(this.authenticationService.apiUrl + 'daNc/queWiseNc/' + this.hospitalPages.hospital_id + "?classObject=" + this.daNcHospitalOrCenterDetails.classObject + "&propertyName=" + this.daNcHospitalOrCenterDetails.propertyName)
      .subscribe(res => {
        ////debugger
        if (res.total > 0) {
          this.daNcHospitalOrCenterDetailsItem = res;
          this.daNcHospitalOrCenterDetails = Object.assign({}, res.rows[0]);
          this.isNcClosePreviousStage = true;
          this.NcDocsArrayGenerator(this.daNcHospitalOrCenterDetails.uploadUrl);
          //this.daNcHospitalOrCenterDetails.uploadUrl = null;
          if (this.currUsrRole == 5 && this.hospitalPages.stage_id == 60 && this.daNcHospitalOrCenterDetailsItem.rows.length == 1) {
            this.daNcHospitalOrCenterDetails.isOpen = null;
            this.daNcHospitalOrCenterDetails.finalRemark = null;

          }


          if (this.currUsrRole == 5 && this.hospitalPages.stage_id == 80 && this.daNcHospitalOrCenterDetailsItem.rows.length == 2) {
            if (this.daNcHospitalOrCenterDetails.isOpen == false) {
              this.isNcClosePreviousStage = false;
            }
            this.daNcHospitalOrCenterDetails.isOpen == null;
            this.daNcHospitalOrCenterDetails.finalRemark == null;
          }
          //rkk

          //  if(this.hospitalPages.stage_id == 80 && this.currUsrRole == 5){
          //   if(this.daNcHospitalOrCenterDetails.isOpen==false){
          //     this.isNcClosePreviousStage === false;
          //   }


          // }
        }


      }, error => {
        console.log(error);
      })
  }



  getAllQueNc() {

    this.hospdataserv.ncFormTabInfo.next(null);
    var hosid = this.hospitalPages.hospital_id;
    this.http.get<any>(this.authenticationService.apiUrl + 'daNc/getAllnc/' + hosid)
      .subscribe(res => {

        if (res) {
          // var test = JSON.parse(res);
          this.hospdataserv.ncFormTabInfo.next(res);
          //this.ncFormTabInfo=res;
          //console.log("All nc by hospital iD=============");
          //console.log(this.ncFormTabInfo);

          if (this.hospitalPages.stage_id == 45 && this.currUsrRole == 5) {

            if (Object.keys(this.ncFormTabInfo.opennc).length == 0) {
              this.daCompletebtn = true;
              this.daNcReviewbtn = false;

            }
            else {
              this.daCompletebtn = false;
              this.daNcReviewbtn = true;

            }
          }


          //  else if (this.hospitalData.stageid == 60 && this.currUsrRole ==  && this.hospitalData.isGoldOrSilver == false) {
          else if (this.hospitalPages.stage_id == 60 && this.currUsrRole == 5) {
            if (Object.keys(this.ncFormTabInfo.opennc).length == 0) {
              this.daCompletebtn = true;
              this.daRejectbtn = false;
              this.daNcReviewbtn = false;
            }
            else {
              this.daCompletebtn = false;
              this.daRejectbtn = false;
              this.daNcReviewbtn = true;

            }
          }


          if (this.hospitalPages.stage_id == 80 && this.currUsrRole == 5) {

            if (Object.keys(this.ncFormTabInfo.opennc).length == 0) {
              this.daCompletebtn = true;
              this.daRejectbtn = false;
              //  this.daNcReviewbtn = true;


            }
            else {
              this.daCompletebtn = false;
              this.daRejectbtn = true;
              //  this.daNcReviewbtn = true;


            }
          }



        }
      }, error => {

      })
  }

  isNcFormValidation: Boolean = false;
  AddorUpdateNc(action) {
    ////debugger
    this.daNcHospitalOrCenterDetails.isNc = true;
    if ((this.daNcHospitalOrCenterDetails.reply == null || this.daNcHospitalOrCenterDetails.reply == "" || this.daNcHospitalOrCenterDetails.uploadUrl == null || this.daNcHospitalOrCenterDetails.uploadUrl == "") && this.currUsrRole == 3) {
      Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
      return;
    }
    if ((this.daNcHospitalOrCenterDetails.finalRemark == null || this.daNcHospitalOrCenterDetails.isOpen == null || this.daNcHospitalOrCenterDetails.finalRemark == "") && this.currUsrRole == 5) {
      Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
      return;
    }
    this.NcAddUpdate(action)
  }

  RaiseNc(action) {
    this.daNcHospitalOrCenterDetails.isNc = true;
    if ((this.daNcHospitalOrCenterDetails.finalRemark == null || this.daNcHospitalOrCenterDetails.finalRemark == "") && this.currUsrRole == 5) {
      Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
      return;
    }
    this.NcAddUpdate(action)
  }

  RemoveNc(action) {
    this.daNcHospitalOrCenterDetails.isNc = false;
    this.NcAddUpdate(action)
  }


  NcAddUpdate(action) {


    if (!this.hospitalPages.hospital_id) {
      //console.log("error");
      return;
    }
    if (action == -1) {
      this.saveLadda = false;
    } else {
      this.saveLadda = true;
    }
    this.daNcHospitalOrCenterDetails.hospital_id = this.hospitalPages.hospital_id;
    this.hospitalPages.stage_id
    this.http.post<any>(this.authenticationService.apiUrl + 'daNc/updatenc', this.daNcHospitalOrCenterDetails)
      .subscribe(res => {
        if (action == 0) {
          if (res.isSuccess) {
            this.daNcHospitalOrCenterDetails.id = res.id;
            this.tostr.success(res.message);
            this.saveLadda = false;
            this.getAllQueNc();
            this.modalService.dismissAll();

          }
        }
        if (action == -1) {
          this.tostr.success("Deleted Successfully");
          this.saveLadda = false;
        }
      }, error => {
        console.log(error);
        this.modalService.dismissAll();
        this.saveLadda = false
      })

  }

  public isSubmitNcLadda: boolean = false;
  SubmitNc(hospitalid) {
    this.isSubmitNcLadda = true;
    this.http.post<any>(this.authenticationService.apiUrl + 'daNc/submitnc', hospitalid)
      .subscribe(res => {
        if (res.isSuccess) {
          this.tostr.success(res.message);
        }
        if (this.currUsrRole == 3) {
          if (res.id == 3) {
            this.tostr.warning(res.message);
          } else {
            this.router.navigate(['hospitaldashboard'])
          }
        }

        if (this.currUsrRole == 5) {
          if (res.id == 1) {
            this.tostr.warning(res.message);
          } else if (res.id == 2) {
            this.tostr.warning(res.message);
          } else {
            this.router.navigate(['assessor/assessmentallocated'])
          }
        }

        this.isSubmitNcLadda = false;

      }, error => {
        //console.log(error);
        this.isSubmitNcLadda = false;
      })
  }


  getUploadFilesPath(files: FileList) {
    const fileItem = files.item(0);

    if (fileItem) {

      this.selectedFile = fileItem;
      this.filename = fileItem.name;
      this.UploadNcFile()
    }

  }
  redirectonsite() {
    let u_id = Number(history.state.uid);
    this.dataservc.setVendorDataHosp(u_id);
    this.router.navigateByUrl('onsiteassessment/assessmentDataFromMobile');
  }
  goCCdashboard() {
    this.router.navigateByUrl("ccdashboard");
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
      // var isfound = this.uploadService.checkImageFromate1(this.selectedFile.name)
      // if (isfound) {
      //   Swal.fire("","<p style='font-size: 1.5em'> Invalid file!! Only  pdf, jpg, jpeg, png can be uploaded </p>");
      //   this.fileUploadLadda = false;
      //   return;
      // }

    }

    this.uploadService.fileUpload(this.selectedFile).subscribe(data => {
      // //console.log("hssgd  ---------------- s3");
      // //console.log(data);

      this.selectedFile = null;
      if (data.body) {
        if (data.body.isSuccess) {

          this.daNcHospitalOrCenterDetails.uploadUrl == null ? this.daNcHospitalOrCenterDetails.uploadUrl = data.body.message : this.daNcHospitalOrCenterDetails.uploadUrl += data.body.message;
          this.tostr.success('File uploaded');
          this.NcDocsArrayGenerator(this.daNcHospitalOrCenterDetails.uploadUrl);
          this.selectedFile = null;
          this.filename = null;
          //this.myfileVariable.nativeElement.value = ""; 
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
  // Nc Delete Image
  DeleteNcUpload(obj) {
    if (!confirm("Are you sure to delete file")) {
      return;
    }
    //console.log(this.arryNcUploadedDocs);
    this.arryNcUploadedDocs = this.arryNcUploadedDocs.filter(item => item != obj)

    var latestString = null;
    for (var i = 0; i < this.arryNcUploadedDocs.length; i++) {
      latestString == null ? latestString = this.arryNcUploadedDocs[i].fn + "|" + this.arryNcUploadedDocs[i].orgfn + "||" : latestString += this.arryNcUploadedDocs[i].fn + "|" + this.arryNcUploadedDocs[i].orgfn + "||";
    }
    this.daNcHospitalOrCenterDetails.uploadUrl = latestString;
    this.NcAddUpdate(-1);
  }


  setNcHidden(obj: any) {

    if (obj == null || obj == "") {
      return (this.currUsrRole == 2 || this.currUsrRole == 3 || this.currUsrRole == 1 || this.currUsrRole == 7) ? true : (this.currUsrRole == 5 && (this.hospitalPages.stage_id == 60 || this.hospitalPages.stage_id == 80 || this.hospitalPages.stage_id == 84)) ? true : false;
    } else {

      // //console.log('sggggghhhhhhhhhhh')
      // //console.log(obj)
      // return (this.currUsrRole == 2 && (this.hospitalData.stageid != 50)) ? true : false
    }

  }



  Review(msg) {

    if (msg == 'reply') {
      Swal.fire("", "<p style='font-size: 1.5em'> Are you sure, you want to submit the Replies?</p>").then((res1) => {
        if (res1.value) {
          // return;     
          this.SubmitNc(this.hospitalPages.hospital_id);
        }
      });
      // this.SubmitNc(this.hospitalData.hospital_id);

    }
    else {
      // if (!Swal.fire("Are you sure you want to submit the " + msg + " form !!")) {
      //   return;
      // }
      Swal.fire("", "<p style='font-size: 1.5em'> Are you sure you want to submit the " + msg + " form !! </p>").then((res1) => {
        if (res1.value) {
          // return;     
          this.SubmitNc(this.hospitalPages.hospital_id);
        }
      });
      // this.SubmitNc(this.hospitalData.hospital_id);
    }
  }

  public daCompleteRejHead: string = '';
  public DaRemarkText: string = "";
  isDaComplete: boolean;

  OpenDaCompleteRejectModal(datype: string) {
    if (datype == "DaComplete") {
      this.isDaComplete = true;
      this.daCompleteRejHead = "DA Accept Remarks";
      this.classshown = "alert alert-success  fade show mb-2";
      this.colorclass = "text-success mt-2";
      this.messageShown = "The Desktop Assessment for the organisation will be accepted as there are no open NC in the application. Please enter the remarks."
    }
    else {
      this.isDaComplete = false;
      this.daCompleteRejHead = "DA Reject Remarks";
      this.classshown = "alert alert-danger  fade show mb-2";
      this.colorclass = "text-danger mt-2";
      this.messageShown = "The Desktop Assessment for the organisation will be rejected as there are  open NCs in the application. Please enter the remarks."
    }

    this.modalService.open(this.DaCompleteRejectModal, { size: 'lg' });


  }

  public isFilnalSubmitNcLadda: boolean = false;
  SaveFinalNcByDa() {

    let data: DaRejectCls = new DaRejectCls();
    this.isFilnalSubmitNcLadda = true;
    data.id = this.hospitalPages.hospital_id;
    data.isDaComplete = this.isDaComplete;
    data.remarks = this.DaRemarkText;
    data.declare = this.declartion_new;

    this.http.post<any>(this.authenticationService.apiUrl + "daNc/finalnc", data)
      .subscribe(res => {
        if (res.isSuccess) {
          this.tostr.success(res.message);
          this.isFilnalSubmitNcLadda = false;
          this.modalService.dismissAll();
          this.DaRemarkText = null;
          this.router.navigate(['assessor/assessmentallocated'])
        }
        else {
          this.tostr.warning(res.message);
          this.isFilnalSubmitNcLadda = false;
          this.modalService.dismissAll();
          this.DaRemarkText = null;

        }


      })




  }

  DoNothing() {
    this.tostr.success("Sucessfully Saved");
  }

  //#endregion


  ////#region rrc

  CalculateApplicationProgress() {
    let totalPerct: number = 0.0;

    this.FldCnt_all = 0;
    this.totalRemainingFldCnt = 0;
    //rrc      
    this.invalidFldCnt = 0;
    this.remainingFldCnt = 0
    const Ctrls_gen = this.genIfoFrom.controls;
    console.log(".. this.genIfoFrom.invalid " + this.genIfoFrom.invalid);

    if (this.genIfoFrom.invalid) {
      for (const namee in Ctrls_gen) {
        this.FldCnt_all += 1;
        if (Ctrls_gen[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 3;
      //console.log(".. this.totalRemainingFldCnt - Sec 1 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in General Info Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 9.09;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_sos = this.scopeOfServiceform.controls;
    console.log(".. this.scopeOfServiceform.invalid " + this.scopeOfServiceform.invalid);

    if (this.scopeOfServiceform.invalid) {
      for (const namee in Ctrls_sos) {
        this.FldCnt_all += 1;
        if (Ctrls_sos[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 2 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in Scope Of Service Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 9.09;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_sc = this.statutaryComplianceform.controls;
    console.log(".. this.statutaryComplianceform.invalid " + this.statutaryComplianceform.invalid);

    if (this.statutaryComplianceform.invalid) {
      for (const namee in Ctrls_sc) {
        this.FldCnt_all += 1;
        if (Ctrls_sc[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 3 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in Statutary Compliance Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 9.09;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_ic = this.infectioncontrolform.controls;
    console.log(".. this.infectioncontrolform.invalid " + this.infectioncontrolform.invalid);

    if (this.infectioncontrolform.invalid) {
      for (const namee in Ctrls_ic) {
        this.FldCnt_all += 1;
        if (Ctrls_ic[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 4 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in Infection Control Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 9.09;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_qco = this.qocform.controls;
    console.log(".. this.qocform.invalid " + this.qocform.invalid);

    if (this.qocform.invalid) {
      for (const namee in Ctrls_qco) {
        this.FldCnt_all += 1;
        if (Ctrls_qco[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 5 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in Quality of Care (qco) Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 9.09;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_hr = this.humanResourceform.controls;
    console.log(".. this.humanResourceform.invalid " + this.humanResourceform.invalid);

    if (this.humanResourceform.invalid) {
      for (const namee in Ctrls_hr) {
        this.FldCnt_all += 1;
        if (Ctrls_hr[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 6 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in Human Resource Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 9.09;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_trn = this.trainingform.controls;
    console.log(".. this.trainingform.invalid " + this.trainingform.invalid);

    if (this.trainingform.invalid) {
      for (const namee in Ctrls_trn) {
        this.FldCnt_all += 1;
        if (Ctrls_trn[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 7 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in Training Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 9.09;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_pr = this.patientrecordform.controls;
    console.log(".. this.patientrecordform.invalid " + this.patientrecordform.invalid);

    if (this.patientrecordform.invalid) {
      for (const namee in Ctrls_pr) {
        this.FldCnt_all += 1;
        if (Ctrls_pr[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 8 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in Patient Records Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 9.09;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_ad = this.admissiondischargeform.controls;
    console.log(".. this.admissiondischargeform.invalid " + this.admissiondischargeform.invalid);

    if (this.admissiondischargeform.invalid) {
      for (const namee in Ctrls_ad) {
        this.FldCnt_all += 1;
        if (Ctrls_ad[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 9 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in Admission Discharge Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 9.09;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_ar = this.adminrecordform.controls;
    console.log(".. this.adminrecordform.invalid " + this.adminrecordform.invalid);

    if (this.adminrecordform.invalid) {
      for (const namee in Ctrls_ar) {
        this.FldCnt_all += 1;
        if (Ctrls_ar[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 10 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in Admin Record Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 9.09;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_ss = this.supportServiceForm.controls;
    console.log(".. this.supportServiceForm.invalid " + this.supportServiceForm.invalid);

    if (this.supportServiceForm.invalid) {
      for (const namee in Ctrls_ss) {
        this.FldCnt_all += 1;
        if (Ctrls_ss[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 11 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in Support Service Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 4.55;

    this.invalidFldAry = [];
    this.invalidFldCnt = 0;
    this.FldCnt_all = 0;
    const Ctrls_dec = this.declarationForm.controls;
    console.log(".. this.declarationForm.invalid " + this.declarationForm.invalid);

    if (this.declarationForm.invalid) {
      for (const namee in Ctrls_dec) {
        this.FldCnt_all += 1;
        if (Ctrls_dec[namee].invalid) {
          this.invalidFldAry.push(namee);
          this.invalidFldCnt += 1;
        }
      }

      //this.totalRemainingFldCnt += 5;
      //console.log(".. this.totalRemainingFldCnt - Sec 12 " + this.totalRemainingFldCnt);
      // this.remainingFldCnt = (this.FldCnt_all - this.invalidFldCnt);
      // this.totalRemainingFldCnt += this.remainingFldCnt;
      // console.log("Invalid field count in S.S. Declaration Sec. => " + this.invalidFldCnt + " Total Flds -> " + this.FldCnt_all + " Remang Flds -> " + this.remainingFldCnt + " Total Remains Flds -> " + this.totalRemainingFldCnt);
      // console.log(this.invalidFldAry);
    }
    else
      this.totalRemainingFldCnt += 4.55;

    console.log(".. this.totalRemainingFldCnt After all Sec " + this.totalRemainingFldCnt);
    totalPerct = (this.totalRemainingFldCnt * 10) * 100 / this.totCtrl_hosp;
    this.aplcProgress = Math.round(totalPerct);
    console.log("... totalPerct " + totalPerct + " .. Math.round(totalPerct) " + this.aplcProgress);
  }

  ////#endregion



} // ends export

