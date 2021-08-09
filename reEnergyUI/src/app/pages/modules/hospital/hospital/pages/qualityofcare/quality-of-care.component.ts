import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HospitalDataShareService } from '../../datashareservice/hospitalDataShare.service';
import { HospitalPages, HospitalPagesQuestionBank } from 'src/app/pages/model/hospital/HospitalPages.model';
import { QualityOfCare } from 'src/app/pages/model/hospital/QualityOfCare.model';
import { NgForm } from '@angular/forms';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import Swal from 'sweetalert2';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { FileViewOrDelete } from 'src/app/pages/model/FileViewOrDelete.model';
import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quality-of-care',
  templateUrl: './quality-of-care.component.html',
  styleUrls: ['./quality-of-care.component.scss', '../../hospital.component.scss']
})
export class QualityOfCareComponent implements OnInit {

  openById = {};
  hospitalPages: HospitalPages;
  hospitalPagesQueBank: HospitalPagesQuestionBank;
  quality_care: QualityOfCare;
  public currentObj: any;
  public propertyname: any;
  public selectedFile: any;
  qocformSubmitted = false;
  ary_uploadedDocs: FileViewOrDelete[] = new Array();
  scopeOfServiceformImageDeleteSuccess = false;
  @Output() deleteFile = new EventEmitter();
  @Output() openNcModelQualityCare = new EventEmitter();
  @ViewChild('qualityofcareForm', { static: false }) qualityofcareform: NgForm;
  @ViewChild('acc') accordion: NgbAccordion;
  ncFormTabInfo: any;
  // currentUser: any;
  // public currUsrRole: number;
  stageId: number;
  Stage_id: number;
  progress: number;
  showUploadMsg: boolean | null;
  @ViewChild('documentuploadModel', { static: false }) documentuploadModel: any;
  currentUser: any;
  currUsrRole: any;
  hidebtns = false;
  constructor(private hospdataserv: HospitalDataShareService, private uploadService: FileUploadService, private tostr: CustomTosterServiceService, private modalService: NgbModal) {

    this.openById["static-1"] = true;
    this.hospitalPages = new HospitalPages();
    this.hospitalPagesQueBank = new HospitalPagesQuestionBank();
    this.quality_care = new QualityOfCare();
    this.hospdataserv.currentStage.subscribe(data => {

      this.Stage_id = data
    });
    this.hospdataserv.getData().subscribe(data => {

      if (data != null || data != undefined) {

        this.hospitalPages = data;
        this.stageId = this.hospitalPages.stage_id;
        this.quality_care = this.hospitalPages.quality_care;

        if (this.quality_care.qoc_nonclncl_service.length == 0) {
          this.quality_care.qoc_nonclncl_service = [
            {
              service: "Dietetics",
              inhouse: false,
              outsource: false,
              not_applicable: false
            },
            {
              service: "Physiotherapy",
              inhouse: false,
              outsource: false,
              not_applicable: false
            }
          ]
        }





      }


    });

    this.hospdataserv.getQuestionBankData().subscribe(data => {

      if (data != null || data != undefined) {

        this.hospitalPagesQueBank = data;




      }


    });
    this.hospdataserv.getFormSubmissionStatus().subscribe(data => {

      if (data != null || data != undefined) {

        this.qocformSubmitted = data;


      }


    });
    this.hospdataserv.ncFormTabInfo.subscribe(data => {

      this.ncFormTabInfo = data
    });
    this.hospdataserv.getButtonsHide().subscribe(data => {

      if (data != null || data != undefined) {

        this.hidebtns = data;


      }


    });
    const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.currentUser = currentUser;
    this.currUsrRole = this.currentUser.roleId;
  }

  ngOnInit(): void {
    this.showUploadMsg = null;
    this.progress = null;
  }
  openDocModel(objName, propName) {
    this.currentObj = objName;
    this.propertyname = propName;
    this.showUploadMsg = null;
    this.progress = null;
    this.modalService.open(this.documentuploadModel, { size: 'md' });
  }

  handleFileInput(files: FileList) {
    const fileItem = files.item(0);
    this.selectedFile = fileItem;

  }

  Upload2(myFileInput) {
    //debugger
    if (this.selectedFile == null) {

      Swal.fire("Please Select Document");
      // this.myfileVariable.nativeElement.value = null;
      myFileInput.value = "";
      return;


    }
    if (this.selectedFile != null) {
      if (this.selectedFile.size > 20000000) {
        Swal.fire("", "<p style='font-size: 1.5em'> Invalid file!! The maximum file size allowed in 20 MB. </p>");
        this.selectedFile = null;
        myFileInput.value = "";
        return;
      }
      var isfound = this.uploadService.checkImageFormat2(this.selectedFile.name)
      if (isfound) {
        // this.fileUploadLadda = false;
        Swal.fire("", "<p style='font-size: 1.5em'> Invalid file!! Only PDF, JPEG, JPG, PNG can be uploaded </p>");
        this.selectedFile = null;
        // this.myfileVariable.nativeElement.value = null;
        myFileInput.value = "";
        return;
      }


    }
    this.showUploadMsg = false;
    this.hospdataserv.setLoaderStatus(true);
    this.progress = 10; // starts spinner
    this.progress = 20; // sets progress bar to 50%

    this.uploadService.fileUpload(this.selectedFile).subscribe(data => {
      if (data.body) {

        if (data.body.isSuccess) {
          this.progress = 50;
          this.currentObj[this.propertyname] == null || this.currentObj[this.propertyname] == undefined || this.currentObj[this.propertyname] == "" ? this.currentObj[this.propertyname] = data.body.message : this.currentObj[this.propertyname] = this.currentObj[this.propertyname] + data.body.message;
          // this.tostr.success('File uploaded');
          this.hospdataserv.setLoaderStatus(false);
          this.progress = 100;
          this.showUploadMsg = true;

          // let tempp = this.ClinicalServiceForm.daignostic_services.labservice_ac_credited_url
          //console.log(this.ClinicalServiceForm);
          // starts spinner

          this.selectedFile = null;
          myFileInput.value = "";
          // this.myfileVariable.nativeElement.value = null;

        }
        else {
          this.showUploadMsg = null;
          this.tostr.error(data.body.message);


          this.selectedFile = null;
          myFileInput.value = "";

          this.hospdataserv.setLoaderStatus(false);

        }
      }

    }
      , error => {
        console.log(error);
        this.showUploadMsg = null;
        this.selectedFile = null;
        myFileInput.value = "";
        this.hospdataserv.setLoaderStatus(false);
      });

  }
  /****File Upload Region****/
  previewImage(ref, files: FileList, obj, _propertyname) {


    const fileItem = files.item(0);
    //console.log("fileItem");
    //console.log(fileItem);

    this.selectedFile = fileItem;
    this.currentObj = obj;
    this.propertyname = _propertyname;



    this.Upload();
    ref.value = "";

  }

  panelChange(event) {
    this.openById[event.panelId] = event.nextState;
  }
  Upload() {

    if (this.selectedFile == null) {

      Swal.fire("please select file");

      return;


    }
    if (this.selectedFile != null) {
      var isfound = this.uploadService.checkImageFromate1(this.selectedFile.name)
      if (isfound) {
        // this.fileUploadLadda = false;
        Swal.fire("", "<p style='font-size: 1.5em'> Invalid file!! Only pdf can be uploaded </p>");
        return;
      }

    }
    this.hospdataserv.setLoaderStatus(true);
    this.uploadService.fileUpload(this.selectedFile).subscribe(data => {
      if (data.body) {
        if (data.body.isSuccess) {

          this.currentObj[this.propertyname] == null || this.currentObj[this.propertyname] == undefined || this.currentObj[this.propertyname] == "" ? this.currentObj[this.propertyname] = data.body.message : this.currentObj[this.propertyname] = this.currentObj[this.propertyname] + data.body.message;
          this.tostr.success('File uploaded');
          this.selectedFile = null;
          this.hospdataserv.setLoaderStatus(false);
          // let tempp = this.ClinicalServiceForm.daignostic_services.labservice_ac_credited_url
          //console.log(this.ClinicalServiceForm);
        }
        else {
          this.tostr.error(data.body.message);
          this.selectedFile = null;
          this.hospdataserv.setLoaderStatus(false);
        }
      }

    }
      , error => {
        console.log(error);
        this.hospdataserv.setLoaderStatus(false);
      });

  }

  openNcModel(objName, propName, quesObj: any) {
    //this.modalService.open(ncModel, { size: 'lg' });

    this.openNcModelQualityCare.emit({ ObjName: objName, propName: propName, quesObj })

  }
  openUploadedDocsModal(viewmodel, obj, _propertyname) {

    this.currentObj = obj;
    this.propertyname = _propertyname;
    this.ary_uploadedDocs = [];
    if (obj[_propertyname] == null || obj[_propertyname] == "" || obj[_propertyname] == undefined) {
      this.tostr.warning("No document uploaded.");
      return;
    }
    var str_array = obj[_propertyname].split('||');

    if (str_array) {
      if (str_array.length > 1) {
        for (var i = 0; i < str_array.length; i++) {

          if (str_array[i] && str_array[i].length > 0) {
            let docCls = new FileViewOrDelete();

            docCls.fn = str_array[i].split('|')[0];
            docCls.orgfn = str_array[i].split('|')[1];
            this.ary_uploadedDocs.push(docCls);
          }

        }
      }
    }
    this.modalService.open(viewmodel, { size: 'md' });
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

  deleteUploadFile(item) {

    // this.deleteFile.emit(-1);
    // if (this.scopeOfServiceformImageDeleteSuccess == false) {
    //   this.tostr.error("File not deleted plez try again");
    //   return;
    // }
    var result = this.uploadService.deleteUploadedFile(item.orgfn);
    result.subscribe(res => {

      if (res.isSuccess == true) {

        this.ary_uploadedDocs = this.ary_uploadedDocs.filter(objitem => objitem != item);//here current obj removed       
        var latestString = null;
        for (var i = 0; i < this.ary_uploadedDocs.length; i++) {
          latestString == null ? latestString = this.ary_uploadedDocs[i].fn + "|" + this.ary_uploadedDocs[i].orgfn + "||" : latestString += this.ary_uploadedDocs[i].fn + "|" + this.ary_uploadedDocs[i].orgfn + "||";
        }

        this.currentObj[this.propertyname] = latestString;
        this.deleteFile.emit(-1);
        this.tostr.success("Selected file has been deleted successfully");
      }
      else {
        this.tostr.error(res.message);
      }
    }, error => {
      console.log(error);
    })
  }

  // U


  performInvasiveProSelection() {

    if (this.quality_care.performs_invasive_procedures_operative_procedures.ques_selected_opt != true) {
      this.quality_care.operative_notes_procedure_notes_and_post_operative.ques_selected_opt = null;
      this.quality_care.pre_operative_diagnosis_performing_invasive_procedure.ques_selected_opt = null;
      // this.quality_care.who_conducts_the_pre_operative_diagnosis.ques_selected_opt = null;
      this.quality_care.applicable_for_both_emergency_and_routine_cases.ques_selected_opt = null;


    }

  }
  // setNcHidden(obj: any) {
  //   //debugger
  //   if (obj == null || obj == "") {
  //     return (this.currUsrRole == 2 || this.currUsrRole == 3 || this.currUsrRole == 1) ? true : (this.currUsrRole == 5 && (this.Stage_id == 60 || this.Stage_id == 80 || this.Stage_id == 88)) ? true : false;
  //   } else {


  //     //  return (this.currUsrRole == 2 && (this.stageId == 40 || this.stageId == 60 || this.stageId == 80 || this.stageId == 88)) ? true : false
  //   }

  // }
  oobstericalServcSelectionchange() {
    this.quality_care.security_surveillance_system_at_pre_defined_interval.ques_selected_opt = null;
    this.quality_care.follows_the_defined_process_rapid_response.ques_selected_opt = null;
    this.quality_care.adequate_security_system_to_prevent_such_issues.ques_selected_opt = null;
    this.quality_care.maintains_the_child_abduction_prevention_protocols.ques_selected_opt = null;
    this.quality_care.nutritional_growth_and_immunization_assessment.ques_selected_opt = null;
    this.quality_care.take_care_of_new_born_and_paediatric_patients.ques_selected_opt = null;
    this.quality_care.obstetric_patients_getting_diet_counselling_qualified.ques_selected_opt = null;
    this.quality_care.care_of_obstetric_patient_at_regular_interval.ques_selected_opt = null;
    this.quality_care.maintains_the_ante_natal_card_for_obstetric_patient_qualified.ques_selected_opt = null;
    this.quality_care.hand_over_separate_discharge_summary_note_newborn.ques_selected_opt = null;
    this.quality_care.pre_natal_peri_natal_and_post_natal_monitoring.ques_selected_opt = null;
  }

}

