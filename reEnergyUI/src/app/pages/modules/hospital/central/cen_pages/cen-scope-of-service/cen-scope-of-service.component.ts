import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { cenHospitalPages, cenHospitalPagesQuestionBank } from 'src/app/pages/model/center/cenHospitalPages.model';
import { CenterScopeOfService, CenterClinicalServicesOptions, CenterAmbulatoryPatientsserviceData } from 'src/app/pages/model/center/CenterScopeOfService';
import { FileViewOrDelete } from 'src/app/pages/model/FileViewOrDelete.model';
import { NgForm } from '@angular/forms';
import { cenHospitalDataShareService } from '../../cendatashareservice/cenhospitalDataShare.service';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { } from '../../../hospital/hospital.component'
import { HospitalDataShareService } from '../../../hospital/datashareservice/hospitalDataShare.service';
@Component({
  selector: 'app-cen-scope-of-service',
  templateUrl: './cen-scope-of-service.component.html',
  styleUrls: ['./cen-scope-of-service.component.scss', '../../../hospital/hospital.component.scss']
})
export class CenScopeOfServiceComponent implements OnInit {


  openById = {};
  cenhospitalPages: cenHospitalPages;
  cenhospitalPagesQueBank: cenHospitalPagesQuestionBank;
  scope_of_service: CenterScopeOfService;
  scopeOfServiceformSubmitted = false;
  public currentObj: any;
  public propertyname: any;
  public selectedFile: any;
  // inpatientCareUnitOrWardData: CenterInpatientCareUnitOrWardData;
  ambulatoryPatientsserviceData: CenterAmbulatoryPatientsserviceData;
  clinicalServicesOptions: CenterClinicalServicesOptions;
  currentYear: number = new Date().getFullYear();
  yearsList: Array<number> = [];
  ary_uploadedDocs: FileViewOrDelete[] = new Array();
  @ViewChild('acc') accordion: NgbAccordion;
  @ViewChild('censcopeOfServiceform') censcopeOfServiceform: NgForm;
  scopeOfServiceformImageDeleteSuccess = false;
  @Output() deleteFile = new EventEmitter();

  specialitiesSelection: String[]
  ayurveda_visibility = false;
  yoga_visibility = false;
  unani_visibility = false;
  sidha_visibility = false;
  homeopathy_visibility = false;
  Stage_id: number;
  @Output() openNcModelTabControl = new EventEmitter();
  ncFormTabInfo: any;
  stageId: number;

  @ViewChild('documentuploadModel', { static: false }) documentuploadModel: any;

  showUploadMsg: boolean | null;
  currentUser: any;
  currUsrRole: any;
  hidebtns = false;
  constructor(private cenhospdataserv: cenHospitalDataShareService, private hospdataserv: HospitalDataShareService, private uploadService: FileUploadService, private tostr: CustomTosterServiceService, private modalService: NgbModal) {
    this.cenhospitalPages = new cenHospitalPages();
    this.cenhospitalPagesQueBank = new cenHospitalPagesQuestionBank();
    this.scope_of_service = new CenterScopeOfService();
    this.ambulatoryPatientsserviceData = new CenterAmbulatoryPatientsserviceData();
    const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.currentUser = currentUser;
    this.currUsrRole = this.currentUser.roleId;
    for (let i = 1950; i <= this.currentYear; i++) {
      this.yearsList.push(i);
    }
    this.scope_of_service.providePatientvisitedOrganization.opdData
    this.cenhospdataserv.getData().subscribe(data => {


      if (data != null || data != undefined) {
        this.scope_of_service = data.scope_of_service;

        this.setSpecilities(data.generalInfo.basicCertification.ayush_system.split(','));



        if (this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices.length == 0) {
          this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices.push(this.ambulatoryPatientsserviceData);
        }
        this.scope_of_service.provideAmbulatoryPatientsservice.floor_plan_urll;
      }



    });
    this.cenhospdataserv.currentStage.subscribe(data => {

      this.Stage_id = data
    });
    this.cenhospdataserv.ncFormTabInfo.subscribe(value => {
      this.ncFormTabInfo = value;
    });

    this.cenhospdataserv.getQuestionBankData().subscribe(data => {

      if (data != null || data != undefined) {
        this.cenhospitalPagesQueBank = data;
        // //debugger
        this.cenhospitalPagesQueBank.scope_of_service

        if (data.centraining == undefined) {
          // this.cenhospitalPagesQueBank.centraining = new CenTraining();
        }

      }


    });
    this.cenhospdataserv.getFormSubmissionStatus().subscribe(data => {

      if (data != null || data != undefined) {

        this.scopeOfServiceformSubmitted = data;


      }


    });

    this.cenhospdataserv.getButtonsHide().subscribe(data => {

      if (data != null || data != undefined) {

        this.hidebtns = data;


      }


    });
  }

  ngOnInit(): void {


    // this.openById['scope-1']=true;
    this.clinicalServicesOptions = new CenterClinicalServicesOptions();
    this.ambulatoryPatientsserviceData = new CenterAmbulatoryPatientsserviceData();
    this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices.push(this.ambulatoryPatientsserviceData);
  }
  openNcModel(objName, propName, quesObj: any) {
    this.openNcModelTabControl.emit({ ObjName: objName, propName: propName, quesObj })

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

  //#region image upload
  /** Uploade Files ***/

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


  openDocModel(objName, propName) {
    this.currentObj = objName;
    this.propertyname = propName;
    this.showUploadMsg = null;

    this.modalService.open(this.documentuploadModel, { size: 'md' });
  }

  handleFileInput(files: FileList) {
    const fileItem = files.item(0);
    this.selectedFile = fileItem;

  }

  Upload2(myFileInput) {
    ////debugger
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


    this.uploadService.fileUpload(this.selectedFile).subscribe(data => {
      if (data.body) {

        if (data.body.isSuccess) {

          this.currentObj[this.propertyname] == null || this.currentObj[this.propertyname] == undefined || this.currentObj[this.propertyname] == "" ? this.currentObj[this.propertyname] = data.body.message : this.currentObj[this.propertyname] = this.currentObj[this.propertyname] + data.body.message;
          // this.tostr.success('File uploaded');
          this.hospdataserv.setLoaderStatus(false);

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



  // removeAyurvedaKayachikitsaCertification(obj) {
  //   this.scope_of_service.scopeOfAyurvedaCertification.kayachikitsa.other_services = this.scope_of_service.scopeOfAyurvedaCertification.kayachikitsa.other_services.filter(itm => itm != obj)
  // }

  // addAyurvedaKayachikitsaCertification() {
  //   this.clinicalServicesOptions = new CenterClinicalServicesOptions();
  //   this.scope_of_service.scopeOfAyurvedaCertification.kayachikitsa.other_services.push(this.clinicalServicesOptions);
  // }

  // addAyurvedaShalakyaTantraCertification() {
  //   this.clinicalServicesOptions = new CenterClinicalServicesOptions();
  //   this.scope_of_service.scopeOfAyurvedaCertification.shalakyaTantra.other_services.push(this.clinicalServicesOptions);
  // }

  // removeAyurvedaShalakyaTantraCertification(obj) {
  //   this.scope_of_service.scopeOfAyurvedaCertification.shalakyaTantra.other_services = this.scope_of_service.scopeOfAyurvedaCertification.shalakyaTantra.other_services.filter(itm => itm != obj)
  // }

  // addAyurvedaKaumarabhrithyaCertification() {
  //   this.clinicalServicesOptions = new CenterClinicalServicesOptions();
  //   this.scope_of_service.scopeOfAyurvedaCertification.kaumarabhrithya.other_services.push(this.clinicalServicesOptions);
  // }
  // removeAyurvedaKaumarabhrithyaCertification(obj) {
  //   this.scope_of_service.scopeOfAyurvedaCertification.kaumarabhrithya.other_services = this.scope_of_service.scopeOfAyurvedaCertification.kaumarabhrithya.other_services.filter(itm => itm != obj)
  // }

  // addAyurvedaAgadaTantraCertification() {
  //   this.clinicalServicesOptions = new CenterClinicalServicesOptions();
  //   this.scope_of_service.scopeOfAyurvedaCertification.agadaTantra.other_services.push(this.clinicalServicesOptions);
  // }
  // removeAyurvedAagadaTantraCertification(obj) {
  //   this.scope_of_service.scopeOfAyurvedaCertification.agadaTantra.other_services = this.scope_of_service.scopeOfAyurvedaCertification.agadaTantra.other_services.filter(itm => itm != obj);
  // }

  // addAyurvedaPrasootiTantraStreerogaCertification() {
  //   this.clinicalServicesOptions = new CenterClinicalServicesOptions();
  //   this.scope_of_service.scopeOfAyurvedaCertification.prasootiTantraStreeroga.other_services.push(this.clinicalServicesOptions);
  // }
  // removeAyurvedPrasootiTantraStreerogaCertification(obj) {
  //   this.scope_of_service.scopeOfAyurvedaCertification.prasootiTantraStreeroga.other_services = this.scope_of_service.scopeOfAyurvedaCertification.prasootiTantraStreeroga.other_services.filter(itm => itm != obj);
  // }

  // addAyurvedaShalyaTantraCertification() {
  //   this.clinicalServicesOptions = new CenterClinicalServicesOptions();
  //   this.scope_of_service.scopeOfAyurvedaCertification.shalyaTantra.other_services.push(this.clinicalServicesOptions);
  // }
  // removeAyurvedaShalyaTantraCertification(obj) {
  //   this.scope_of_service.scopeOfAyurvedaCertification.shalyaTantra.other_services = this.scope_of_service.scopeOfAyurvedaCertification.shalyaTantra.other_services.filter(itm => itm != obj);
  // }
  // addAyurvedaAnuShastraKarmasCertification() {
  //   this.clinicalServicesOptions = new CenterClinicalServicesOptions();
  //   this.scope_of_service.scopeOfAyurvedaCertification.anuShastraKarmas.other_services.push(this.clinicalServicesOptions);
  // }
  // removeAyurvedaAnuShastraKarmasCertification(obj) {
  //   this.scope_of_service.scopeOfAyurvedaCertification.anuShastraKarmas.other_services = this.scope_of_service.scopeOfAyurvedaCertification.anuShastraKarmas.other_services.filter(itm => itm != obj);
  // }
  addNaturopathyCertification() {
    this.clinicalServicesOptions = new CenterClinicalServicesOptions();
    this.scope_of_service.scopeOfNaturopathyCertification.other_sos_service.push(this.clinicalServicesOptions);
  }
  removeNaturopathyCertification(obj) {
    this.scope_of_service.scopeOfNaturopathyCertification.other_sos_service = this.scope_of_service.scopeOfNaturopathyCertification.other_sos_service.filter(itm => itm != obj);
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  addYogaCertification() {

    this.clinicalServicesOptions = new CenterClinicalServicesOptions();
    this.scope_of_service.scopeOfYogaCertification.other_sos_service.push(this.clinicalServicesOptions);
  }

  removeYogaCertification(item) {
    this.scope_of_service.scopeOfYogaCertification.other_sos_service = this.scope_of_service.scopeOfYogaCertification.other_sos_service.filter(obj => obj != item);
  }

  addAmbulatoryPatientsservices() {
    this.ambulatoryPatientsserviceData = new CenterAmbulatoryPatientsserviceData();
    this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices.push(this.ambulatoryPatientsserviceData);
  }

  removeAmbulatoryPatientsservices(obj) {
    this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices = this.scope_of_service.provideAmbulatoryPatientsservice.ambulatoryPatientsservices.filter(item => item != obj);
  }

}
