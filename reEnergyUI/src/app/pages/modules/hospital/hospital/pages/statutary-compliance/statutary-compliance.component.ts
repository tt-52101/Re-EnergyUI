import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HospitalDataShareService } from '../../datashareservice/hospitalDataShare.service';
import { HospitalPages, HospitalPagesQuestionBank } from 'src/app/pages/model/hospital/HospitalPages.model';
import { NgForm, FormGroup, FormArray } from '@angular/forms';
import { StatutaryCompliance, RegistrationLicense } from 'src/app/pages/model/hospital/StatutaryCompliance.model';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import Swal from 'sweetalert2';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { FileViewOrDelete } from 'src/app/pages/model/FileViewOrDelete.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-statutary-compliance',
  templateUrl: './statutary-compliance.component.html',
  styleUrls: ['./statutary-compliance.component.scss', '../../hospital.component.scss']
})
export class StatutaryComplianceComponent implements OnInit {
  hospitalPages: HospitalPages;
  hospitalPagesQueBank: HospitalPagesQuestionBank;
  statutory_compliance: StatutaryCompliance;
  public currentObj: any;
  public propertyname: any;
  public selectedFile: any;
  statutaryformSubmitted = false;
  registrationLicense: RegistrationLicense;
  registeration_lic_active_tab = 0;
  ary_uploadedDocs: FileViewOrDelete[] = new Array();
  @ViewChild('statutaryform', { static: false }) statutaryform: NgForm;
  @Output() deleteFile = new EventEmitter();
  @Output() openNcModelStatutaryControl = new EventEmitter();
  ncFormTabInfo: any;
  currentUser: any;
  public currUsrRole: number;
  stageId: number;
  Stage_id: number;

  // @ViewChild('reglictab', { static: false }) ngxreglictabset_instance: TabsetComponent

  progress: number;
  showUploadMsg: boolean | null;
  @ViewChild('documentuploadModel', { static: false }) documentuploadModel: any;
  hidebtns = false;
  constructor(private hospdataserv: HospitalDataShareService, private uploadService: FileUploadService,
    private tostr: CustomTosterServiceService, private modalService: NgbModal) {
    this.hospitalPages = new HospitalPages();
    this.hospitalPagesQueBank = new HospitalPagesQuestionBank();
    this.statutory_compliance = new StatutaryCompliance();
    this.hospitalPagesQueBank.statutory_compliance = new StatutaryCompliance();
    this.registrationLicense = new RegistrationLicense();
    const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.currentUser = currentUser;
    this.currUsrRole = this.currentUser.roleId;
    this.hospdataserv.currentStage.subscribe(data => {

      this.Stage_id = data
    });
    this.hospdataserv.ncFormTabInfo.subscribe(data => {

      this.ncFormTabInfo = data
    });

    this.hospdataserv.getData().subscribe(data => {

      if (data != null || data != undefined) {

        this.hospitalPages = data;
        this.statutory_compliance = this.hospitalPages.statutory_compliance;

        if (this.statutory_compliance.details_of_licience.length > 0) {
          this.statutory_compliance.details_of_licience.forEach(itm => {

            if (itm.id == 8 || itm.id == 11) {
              if (!itm.lic_name.includes(" (if applicable)"))
                itm.lic_name = itm.lic_name + " (if applicable)";
            }

          });
        }
        console.log("... this.statutory_compliance ...");
        console.log(this.statutory_compliance);

        //console.table(this.statutory_compliance.details_of_licience);

        if (this.statutory_compliance.details_of_licience.length < 1) {
          this.statutory_compliance.details_of_licience = [
            {
              id: 1,
              ques_id: 1,
              ques_text: "Shops & Establishment Act",
              lic_name: "Shops & Establishment Act",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              id: 2,
              ques_id: 2,
              ques_text: "Clinical Establishment Act",
              lic_name: "Clinical Establishment Act",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              id: 3,
              ques_id: 3,
              ques_text: "State or Local Statutory",
              lic_name: "State or Local Statutory",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              id: 4,
              ques_id: 3,
              ques_text: "State Pollution Control Board (SPCB) Consent to generate Bio-Medical Waste (BMW)",
              lic_name: "State Pollution Control Board (SPCB) Consent to generate Bio-Medical Waste (BMW)",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              id: 5,
              ques_id: 5,
              ques_text: "Pollution Control Board (PCB) License of Water and Air Pollution",
              lic_name: "Pollution Control Board (PCB) License of Water and Air Pollution",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              id: 6,
              ques_id: 6,
              ques_text: "Fire NOC",
              lic_name: "Fire NOC",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              id: 7,
              ques_id: 7,
              ques_text: "Sanction of Lift (if applicable)",
              lic_name: "Sanction of Lift (if applicable)",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              id: 8,
              ques_id: 8,
              ques_text: "Registration under PC-PNDT Act certificate (if applicable)",
              lic_name: "Registration under PC-PNDT Act certificate (if applicable)",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              id: 9,
              ques_id: 9,
              ques_text: "Canteen/ Food & Beverage License (if applicable)",
              lic_name: "Canteen/ Food & Beverage License (if applicable)",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            }
            ,
            {
              id: 10,
              ques_id: 10,
              ques_text: "Retail Pharmacy License",
              lic_name: "Retail Pharmacy License",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            }
            ,
            {
              id: 11,
              ques_id: 11,
              ques_text: "Narcotics License (if applicable)",
              lic_name: "Narcotics License (if applicable)",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            }
            ,
            {
              id: 12,
              ques_id: 12,
              ques_text: "AERB License for X-ray",
              lic_name: "AERB License for X-ray",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            }
            ,
            {
              id: 13,
              ques_id: 13,
              ques_text: "AERB License for Mobile X-ray",
              lic_name: "AERB License for Mobile X-ray",
              isapplicable: null,
              lic_detail: {
                licience_name: null,
                agent_licensing_name: null,
                status: null,
                application_number_renewal: null,
                license_number: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            }

          ]
        }
        if (this.statutory_compliance.registration_license_list.length < 1) {
          this.statutory_compliance.registration_license_list = [
            {
              agency_name: null,
              others: null,
              status: null,
              application_number_renewal: null,
              license_number: null,
              valid_from: null,
              valid_till: null,
              license_url: null
            }
          ]
        }

        this.registeration_lic_active_tab = 0;




      }


    });

    this.hospdataserv.getQuestionBankData().subscribe(data => {

      if (data != null || data != undefined) {
        this.hospitalPagesQueBank = data;
      }
      // if (data.statutory_compliance == null) {
      //   this.hospitalPagesQueBank.statutory_compliance = new StatutaryCompliance();
      // }

    });

    this.hospdataserv.getFormSubmissionStatus().subscribe(data => {

      if (data != null || data != undefined) {

        this.statutaryformSubmitted = data;


      }


    });

    this.hospdataserv.getButtonsHide().subscribe(data => {

      if (data != null || data != undefined) {

        this.hidebtns = data;


      }


    });
  }

  ngOnInit(): void {
    // this.statutory_compliance.registration_license_list.push(this.registrationLicense);
    this.statutory_compliance.registration_license_list = new Array<RegistrationLicense>();
    this.showUploadMsg = null;
    this.progress = null;
  }
  openNcModel(objName, propName, quesObj: any) {
    //this.modalService.open(ncModel, { size: 'lg' });

    this.openNcModelStatutaryControl.emit({ ObjName: objName, propName: propName, quesObj })

  }

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






  AddRegistrationLicense() {

    this.statutory_compliance.registration_license_list.push(
      {
        agency_name: null,
        others: null,
        status: null,
        application_number_renewal: null,
        license_number: null,
        valid_from: null,
        valid_till: null,
        license_url: null
      }
    );
  }

  removeRegistrationLicense(itm) {

    let activetab = this.registeration_lic_active_tab
    let total_element = this.statutory_compliance.registration_license_list.length


    this.statutory_compliance.registration_license_list = this.statutory_compliance.registration_license_list.filter(obj => obj != itm)
    if (activetab == (total_element - 1)) {
      this.registeration_lic_active_tab = (this.statutory_compliance.registration_license_list.length - 1);
    }

  }

  //  AddMoreLicience() {

  //   this.statutory_compliance.details_of_licience.push(
  //     {
  //     lic_name:null,
  //     isapplicable:null,
  //     lic_detail:{
  //       licience_name:null,
  //   agent_licensing_name: null,
  //   status: null,
  //   application_number_renewal: null,
  //   license_number: null,
  //   valid_from: null,
  //   valid_till: null,
  //   license_url: null
  //     }}
  //    );
  // }
  // removeMoreLicense(itm) {
  //   this.statutory_compliance.details_of_licience = this.statutory_compliance.details_of_licience.filter(obj => obj != itm)

  // }

}
