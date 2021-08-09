import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HospitalPages, HospitalPagesQuestionBank } from 'src/app/pages/model/hospital/HospitalPages.model';
import { HospitalDataShareService } from '../../datashareservice/hospitalDataShare.service';
import { Training } from 'src/app/pages/model/hospital/Training.model';
import { NgForm } from '@angular/forms';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import Swal from 'sweetalert2';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { FileViewOrDelete } from 'src/app/pages/model/FileViewOrDelete.model';
import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss', '../../hospital.component.scss']
})
export class TrainingComponent implements OnInit {

  hospitalPages: HospitalPages;
  hospitalPagesQueBank: HospitalPagesQuestionBank;
  training: Training;
  trainingformSubmitted = false;
  public currentObj: any;
  public propertyname: any;
  public selectedFile: any;

  indutionTrainingStaff: Array<any> = [

    { id: 0, name: 'Vision and Mission of Hospital', isselected: false },
    { id: 1, name: 'Employee Rights and Responsibility', isselected: false },
    { id: 2, name: "Patient's Rights and Responsibility", isselected: false },
    { id: 3, name: 'Service Standards of hospital', isselected: false },

  ];
  ary_uploadedDocs: FileViewOrDelete[] = new Array();
  @ViewChild('trainingForm', { static: false }) trainingform: NgForm;
  @ViewChild('acc') accordion: NgbAccordion;
  @Output() deleteFile = new EventEmitter();
  @Output() openNcModelTrainingControl = new EventEmitter();
  @ViewChild('documentuploadModel', { static: false }) documentuploadModel: any;
  ncFormTabInfo: any;
  currentUser: any;
  public currUsrRole: number;
  stageId: number;
  Stage_id: number;
  progress: number;
  showUploadMsg: boolean | null;
  hidebtns = false;

  constructor(private hospdataserv: HospitalDataShareService, private uploadService: FileUploadService,
    private tostr: CustomTosterServiceService, private modalService: NgbModal) {


    this.hospitalPages = new HospitalPages();

    this.hospitalPagesQueBank = new HospitalPagesQuestionBank();

    this.training = new Training();

    this.hospdataserv.currentStage.subscribe(data => {

      this.Stage_id = data
    });

    this.hospdataserv.getData().subscribe(data => {

      if (data != null || data != undefined) {

        this.hospitalPages = data;
        this.training = this.hospitalPages.training;

      }


    });

    this.hospdataserv.getQuestionBankData().subscribe(data => {

      if (data != null || data != undefined) {

        this.hospitalPagesQueBank = data;



      }


    });
    this.hospdataserv.getFormSubmissionStatus().subscribe(data => {

      if (data != null || data != undefined) {

        this.trainingformSubmitted = data;


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
  openNcModel(objName, propName, quesObj: any) {
    //this.modalService.open(ncModel, { size: 'lg' });

    this.openNcModelTrainingControl.emit({ ObjName: objName, propName: propName, quesObj })

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

  UncheckInductionAll() {
    this.training.inductin_trn_staff_orientation.vision_mission = false;
    this.training.inductin_trn_staff_orientation.employ_right = false;
    this.training.inductin_trn_staff_orientation.patient_right = false;
    this.training.inductin_trn_staff_orientation.servc_standard = false;
  }
  UncheckInductionNone() {
    this.training.inductin_trn_staff_orientation.none = false;
  }

}
