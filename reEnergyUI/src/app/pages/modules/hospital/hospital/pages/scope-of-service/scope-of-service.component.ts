import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HospitalDataShareService } from '../../datashareservice/hospitalDataShare.service';
import { NgForm } from '@angular/forms';
import { HospitalPagesQuestionBank, HospitalPages } from 'src/app/pages/model/hospital/HospitalPages.model';
import { ScopeOfService, ProvideInpatientCareUnitOrWard, InpatientCareUnitOrWardData, AmbulatoryPatientsserviceData, ClinicalServicesOptions } from 'src/app/pages/model/hospital/ScopeOfService';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import Swal from 'sweetalert2';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { FileViewOrDelete } from 'src/app/pages/model/FileViewOrDelete.model';
import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-scope-of-service',
  templateUrl: './scope-of-service.component.html',
  styleUrls: ['./scope-of-service.component.scss', '../../hospital.component.scss']
})
export class ScopeOfServiceComponent implements OnInit {

  hospitalPages: HospitalPages;
  hospitalPagesQueBank: HospitalPagesQuestionBank;
  scope_of_service: ScopeOfService;
  ncFormTabInfo: any;
  scopeOfServiceformSubmitted = false;
  public currentObj: any;
  public propertyname: any;
  public selectedFile: any;
  inpatientCareUnitOrWardData: InpatientCareUnitOrWardData;
  ambulatoryPatientsserviceData: AmbulatoryPatientsserviceData;
  clinicalServicesOptions: ClinicalServicesOptions;
  currentYear: number = new Date().getFullYear();
  yearsList: Array<number> = [];
  ary_uploadedDocs: FileViewOrDelete[] = new Array();
  @ViewChild('scopeOfServiceform') scopeOfServiceform: NgForm;
  @ViewChild('acc') accordion: NgbAccordion;
  scopeOfServiceformImageDeleteSuccess = false;
  @Output() deleteFile = new EventEmitter();
  specialitiesSelection: String[]
  ayurveda_visibility = false;
  yoga_visibility = false;
  unani_visibility = false;
  sidha_visibility = false;
  homeopathy_visibility = false;
  Stage_id: number;
  @Output() openNcModelScopeOfService = new EventEmitter();
  public currUsrRole: number;
  currentUser: any;
  @ViewChild('documentuploadModel', { static: false }) documentuploadModel: any;
  progress: number;
  showUploadMsg: boolean | null;
  hidebtns = false;

  constructor(private hospdataserv: HospitalDataShareService, private uploadService: FileUploadService, private tostr: CustomTosterServiceService, private modalService: NgbModal) {

    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.currUsrRole = this.currentUser.roleId;
    this.hospitalPages = new HospitalPages();
    this.hospitalPagesQueBank = new HospitalPagesQuestionBank();
    this.scope_of_service = new ScopeOfService();
    this.inpatientCareUnitOrWardData = new InpatientCareUnitOrWardData();
    for (let i = 1950; i <= this.currentYear; i++) {
      this.yearsList.push(i);
    }

    this.hospdataserv.getData().subscribe(data => {

      if (data != null || data != undefined) {
        this.hospitalPages = data;
        this.setSpecilities(data.generalInfo.basicCertification.ayush_system.split(','));


        this.scope_of_service = this.hospitalPages.scope_of_service;





        this.ambulatoryPatientsserviceData = new AmbulatoryPatientsserviceData();
        this.ambulatoryPatientsserviceData = new AmbulatoryPatientsserviceData();
        if (this.scope_of_service.provideInpatientCareUnitOrWard.inpatientCareUnitOrWard.length <= 0) {

          this.addInpatientCare();
        }
        if (this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices.length <= 0) {

          this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices.push(this.ambulatoryPatientsserviceData);
        }

        this.scope_of_service.opdSosProvidedDepartments.dept_url;
        this.scope_of_service.ipdSosProvidedDepartments.dept_url;
        this.scope_of_service.provideInpatientCareUnitOrWard.floor_plan_urll;
      }


    });

    this.hospdataserv.getQuestionBankData().subscribe(data => {

      if (data != null || data != undefined) {

        this.hospitalPagesQueBank = data;
        console.log('sos')
        console.log(this.hospitalPagesQueBank.scope_of_service);

      }


    });
    this.hospdataserv.getFormSubmissionStatus().subscribe(data => {

      if (data != null || data != undefined) {

        this.scopeOfServiceformSubmitted = data;


      }


    });

    this.hospdataserv.getDeleteRecordStatus().subscribe(data => {

      if (data != null || data != undefined) {

        this.scopeOfServiceformImageDeleteSuccess = data;


      }


    });

    this.hospdataserv.ncFormTabInfo.subscribe(data => {

      this.ncFormTabInfo = data
    });

    this.hospdataserv.currentStage.subscribe(data => {

      this.Stage_id = data
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

    this.inpatientCareUnitOrWardData = new InpatientCareUnitOrWardData();
    this.clinicalServicesOptions = new ClinicalServicesOptions();
    this.showUploadMsg = null;
    this.progress = null;
  }
  setSpecilities(specialitiesSelectionList: String[]) {

    specialitiesSelectionList.forEach(value => {

      if (value == 'Ayurveda') {
        this.ayurveda_visibility = true;

      }
      if (value == 'Yoga' || value == 'Naturopathy') {
        this.yoga_visibility = true;


      }
      if (value == 'Unani') {
        this.unani_visibility = true;

      }
      if (value == 'Siddha') {
        this.sidha_visibility = true;
      }
      if (value == 'Homeopathy') {
        this.homeopathy_visibility = true;

      }

    })
  }
  openNcModel(objName, propName, quesObj: any) {
    //this.modalService.open(ncModel, { size: 'lg' });

    this.openNcModelScopeOfService.emit({ ObjName: objName, propName: propName, quesObj })

  }
  setNcHidden(obj: any) {

    if (obj == null || obj == "") {
      return (this.currUsrRole == 2 || this.currUsrRole == 3 || this.currUsrRole == 1) ? true : (this.currUsrRole == 5 && (this.Stage_id == 60 || this.Stage_id == 80 || this.Stage_id == 88)) ? true : false;
    } else {


      //  return (this.currUsrRole == 2 && (this.stageId == 40 || this.stageId == 60 || this.stageId == 80 || this.stageId == 88)) ? true : false
    }

  }

  //#region image upload
  /** Uploade Files ***/
  openById = {};
  panelChange(event) {

    this.openById[event.panelId] = event.nextState;
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


  /***End Region***/
  //#endregion

  addAyurvedaCertification() {
    this.scope_of_service.scopeOfAyurvedaCertification.other_sos_service.push(
      {
        service_name: null,
        option: null,
        remark: null
      }
    );
  }

  removeAyurvedaCertification(item) {

    this.scope_of_service.scopeOfAyurvedaCertification.other_sos_service = this.scope_of_service.scopeOfAyurvedaCertification.other_sos_service.filter(obj => obj != item);

  }

  addYogaCertification() {
    this.clinicalServicesOptions = new ClinicalServicesOptions();
    this.scope_of_service.scopeOfYogaCertification.other_sos_service.push(this.clinicalServicesOptions);
  }

  removeYogaCertification(item) {
    this.scope_of_service.scopeOfYogaCertification.other_sos_service = this.scope_of_service.scopeOfYogaCertification.other_sos_service.filter(obj => obj != item);
  }

  addNaturopathyCertification() {
    this.clinicalServicesOptions = new ClinicalServicesOptions();
    this.scope_of_service.scopeOfNaturopathyCertification.other_sos_service.push(this.clinicalServicesOptions);
  }

  removeNaturopathyCertification(item) {

    this.scope_of_service.scopeOfNaturopathyCertification.other_sos_service = this.scope_of_service.scopeOfNaturopathyCertification.other_sos_service.filter(obj => obj != item);

  }

  addInpatientCare() {
    this.inpatientCareUnitOrWardData = new InpatientCareUnitOrWardData();
    this.scope_of_service.provideInpatientCareUnitOrWard.inpatientCareUnitOrWard.push(this.inpatientCareUnitOrWardData);
  }

  removeInpatientCare(item) {

    this.scope_of_service.provideInpatientCareUnitOrWard.inpatientCareUnitOrWard = this.scope_of_service.provideInpatientCareUnitOrWard.inpatientCareUnitOrWard.filter(obj => obj != item);
  }

  addAmbulatoryPatientsservices() {
    this.ambulatoryPatientsserviceData = new AmbulatoryPatientsserviceData();
    this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices.push(this.ambulatoryPatientsserviceData);
  }

  removeAmbulatoryPatientsservices(obj) {
    this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices = this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices.filter(item => item != obj);
  }
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

}
