import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HospitalDataShareService } from '../../datashareservice/hospitalDataShare.service';
import { NgForm } from '@angular/forms';
import { HospitalPages, HospitalPagesQuestionBank } from 'src/app/pages/model/hospital/HospitalPages.model';
import { SupportService, MouOutsourcedSlctedSrvcs } from 'src/app/pages/model/hospital/SupportService.model';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import Swal from 'sweetalert2';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { FileViewOrDelete } from 'src/app/pages/model/FileViewOrDelete.model';
import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { StaffDetails } from 'src/app/pages/model/hospital/humanResource.model';
import { iterator } from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-support-service',
  templateUrl: './support-service.component.html',
  styleUrls: ['./support-service.component.scss', '../../hospital.component.scss']
})
export class SupportServiceComponent implements OnInit {

  datemodel: any
  declarationcheck: any = null;
  @ViewChild('supportserviceForm', { static: false }) supportServiceForm: NgForm;
  @ViewChild('declarationform', { static: false }) Declarationform: NgForm;
  @ViewChild('acc') accordion: NgbAccordion;
  hospitalPages: HospitalPages;
  hospitalPagesQueBank: HospitalPagesQuestionBank;
  supportserviceFormSubmitted = false;
  support_service: SupportService;
  public currentObj: any;
  public propertyname: any;
  public selectedFile: any;
  @Output() deleteFile = new EventEmitter();
  ary_uploadedDocs: FileViewOrDelete[] = new Array();
  // public Tmplte_LabTechnisianStaff = "../../../../../../../assets/excel_upload_doc/LabTechnisian.xlsx";
  // public Tmplte_ImagingTechnisianStaff = "../../../../../../../assets/excel_upload_doc/ImagingTechnisian.xlsx";
  public Tmplte_LabTechnisianStaff = "../../../../../../../assets/excel_upload_doc/Template_Laboratory_Technicians.xlsx";
  public Tmplte_ImagingTechnisianStaff = "../../../../../../../assets/excel_upload_doc/Template_Imaging_Technicians.xlsx";
  public templatename: string = "";
  public templatenameDownload: string = "";

  uploadResult: any = { bad: [], isSuccess: true };
  public cardName: string;
  fileToUpload: any;
  filename: string = "";
  excelMgs = "";
  actiontype: string = null;
  currentindex_toedit: number;

  public staffdetatlsmodal: StaffDetails = new StaffDetails();
  public staffModelHeading = "";
  @Output() openNcModelSupportControl = new EventEmitter();
  ncFormTabInfo: any;
  currentUser: any;
  public currUsrRole: number;
  stageId: number;
  Stage_id: number;
  progress: number;
  showUploadMsg: boolean | null;
  @ViewChild('documentuploadModel', { static: false }) documentuploadModel: any;
  hidebtns: boolean = false;
  constructor(private hospdataserv: HospitalDataShareService, private uploadService: FileUploadService,
    private tostr: CustomTosterServiceService, private modalService: NgbModal) {
    this.hospitalPages = new HospitalPages();
    this.hospitalPagesQueBank = new HospitalPagesQuestionBank();
    this.support_service = this.hospitalPages.support_service;
    const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.currentUser = currentUser;
    this.currUsrRole = this.currentUser.roleId;
    if (this.currUsrRole == 3 && this.currentUser.stage_id == 20) {
      this.hidebtns = true;
    }
    this.hospdataserv.currentStage.subscribe(data => {

      this.Stage_id = data

    });

    this.hospdataserv.getData().subscribe(data => {

      if (data != null || data != undefined) {

        this.hospitalPages = data;
        this.support_service = this.hospitalPages.support_service;


        // if(this.support_service.service_list.length==0)
        // {
        //   this.support_service.service_list=[
        //     {service:"Clinical Bio-chemistry",outsource:false,inhouse:false,serves_other_org:false},
        //     {service:"Clinical Pathology",outsource:false,inhouse:false,serves_other_org:false},
        //     {service:"Haematology",outsource:false,inhouse:false,serves_other_org:false},
        //     {service:"Clinical Microbiology ",outsource:false,inhouse:false,serves_other_org:false},
        //     {service:"Serology",outsource:false,inhouse:false,serves_other_org:false},
        //     {service:"Histopathology",outsource:false,inhouse:false,serves_other_org:false},
        //     {service:"Cytopathology",outsource:false,inhouse:false,serves_other_org:false}

        //   ]

        // }
        // cbs
        this.support_service.service_list

        if (this.support_service.service_list.length == 0) {

          this.support_service.service_list =
            [
              {
                service: "Clinical Bio-chemistry", outsource: false, inhouse: false, serves_other_org: false,
                labservc_mou_lic_details:
                {
                  agent_name: null,
                  available: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null

                }
              },
              {
                service: "Clinical Pathology", outsource: false, inhouse: false, serves_other_org: false,
                labservc_mou_lic_details:
                {
                  agent_name: null,
                  available: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null

                }
              },
              {
                service: "Haematology", outsource: false, inhouse: false, serves_other_org: false,
                labservc_mou_lic_details:
                {
                  agent_name: null,
                  available: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null

                }
              },
              {
                service: "Clinical Microbiology", outsource: false, inhouse: false, serves_other_org: false,
                labservc_mou_lic_details:
                {
                  agent_name: null,
                  available: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null

                }
              },
              {
                service: "Serology", outsource: false, inhouse: false, serves_other_org: false,
                labservc_mou_lic_details:
                {
                  agent_name: null,
                  available: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null

                }
              },
              {
                service: "Histopathology", outsource: false, inhouse: false, serves_other_org: false,
                labservc_mou_lic_details:
                {
                  agent_name: null,
                  available: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null

                }
              },
              {
                service: "Cytopathology", outsource: false, inhouse: false, serves_other_org: false,
                labservc_mou_lic_details:
                {
                  agent_name: null,
                  available: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null

                }
              }

            ]

        }
        // cbs

        if (this.support_service.imaging_service_list.length == 0) {

          this.support_service.imaging_service_list = [
            {
              service: "X-Ray", outsource: false, inhouse: false, serves_other_org: false,
              dishnosticservc_mou_lic_details:
              {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              },
              dishnosticservc_aerb_lic_details:
              {

                agent_name: null,
                status: null,
                application_no: null,
                lic_no: null,
                valid_from: null,
                valid_till: null,
                license_url: null

              }
            },
            {
              service: "Mobile X-ray", outsource: false, inhouse: false, serves_other_org: false,
              dishnosticservc_mou_lic_details:
              {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null

              },
              dishnosticservc_aerb_lic_details:
              {

                agent_name: null,
                status: null,
                application_no: null,
                lic_no: null,
                valid_from: null,
                valid_till: null,
                license_url: null

              }
            },

            {
              service: "Ultrasound", outsource: false, inhouse: false, serves_other_org: false,
              dishnosticservc_mou_lic_details:
              {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null

              },
              dishnosticservc_aerb_lic_details:
              {

                agent_name: null,
                status: null,
                application_no: null,
                lic_no: null,
                valid_from: null,
                valid_till: null,
                license_url: null

              }
            },
            // {service:"CT Scanning",outsource:false,inhouse:false,serves_other_org:false,
            // dishnosticservc_mou_lic_details:
            //  {
            //    agent_name: null,
            //    available: null,
            //    valid_from: null,
            //    valid_till: null,
            //    license_url: null

            //  },
            //  dishnosticservc_aerb_lic_details:
            //  {

            //    agent_name :null,
            //    status :null,
            //    application_no :null,
            //    lic_no :null,
            //    valid_from :null,
            //    valid_till :null,
            //    license_url :null

            //  }
            // },
            // {service:"MRI",outsource:false,inhouse:false,serves_other_org:false,
            // dishnosticservc_mou_lic_details:
            //  {
            //    agent_name: null,
            //    available: null,
            //    valid_from: null,
            //    valid_till: null,
            //    license_url: null

            //  },
            //  dishnosticservc_aerb_lic_details:
            //  {

            //    agent_name :null,
            //    status :null,
            //    application_no :null,
            //    lic_no :null,
            //    valid_from :null,
            //    valid_till :null,
            //    license_url :null

            //  }
            // },
            // {service:"PET",outsource:false,inhouse:false,serves_other_org:false,
            // dishnosticservc_mou_lic_details:
            //  {
            //    agent_name: null,
            //    available: null,
            //    valid_from: null,
            //    valid_till: null,
            //    license_url: null

            //  },
            //  dishnosticservc_aerb_lic_details:
            //  {

            //    agent_name :null,
            //    status :null,
            //    application_no :null,
            //    lic_no :null,
            //    valid_from :null,
            //    valid_till :null,
            //    license_url :null

            //  }
            // },
            // {service:"Gamma Camera",outsource:false,inhouse:false,serves_other_org:false,
            // dishnosticservc_mou_lic_details:
            //  {
            //    agent_name: null,
            //    available: null,
            //    valid_from: null,
            //    valid_till: null,
            //    license_url: null

            //  },
            //  dishnosticservc_aerb_lic_details:
            //  {

            //    agent_name :null,
            //    status :null,
            //    application_no :null,
            //    lic_no :null,
            //    valid_from :null,
            //    valid_till :null,
            //    license_url :null

            //  }
            // },
            // {service:"DSA Lab",outsource:false,inhouse:false,serves_other_org:false,
            // dishnosticservc_mou_lic_details:
            //  {
            //    agent_name: null,
            //    available: null,
            //    valid_from: null,
            //    valid_till: null,
            //    license_url: null

            //  },
            //  dishnosticservc_aerb_lic_details:
            //  {

            //    agent_name :null,
            //    status :null,
            //    application_no :null,
            //    lic_no :null,
            //    valid_from :null,
            //    valid_till :null,
            //    license_url :null

            //  }
            // }
          ]

        }
        if (this.support_service.pharmacy_service_list.length == 0) {
          this.support_service.pharmacy_service_list = [
            {
              service: "Dispensary", outsource: false, inhouse: false, serves_other_org: false,
              pharmacyservc_mou_lic_details:
              {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null

              }
            },
            //   {service:"Bhaishajya Shala (Medicine Manufacturing Unit)",outsource:false,inhouse:false,serves_other_org:false,
            //   pharmacyservc_mou_lic_details:
            //   {
            //    agent_name: null,
            //   available: null,
            //    valid_from: null,
            //    valid_till: null,
            //    license_url: null

            //  }},


          ]

        }

        // if(this.support_service.lab_technisian_list.staff_details.length==0)
        // {
        //   this.support_service.lab_technisian_list.staff_details=
        //   [
        //     { staff_name:null,
        //      designation:null,
        //      qualification:null,
        //      expirience:null,
        //      dept_of_working:null,
        //      date_of_join:null,
        //      registrataion_no:null,
        //      council_of_reg:null,}
        //   ]
        // }
        // if(this.support_service.list_of_all_imaging_technicians.staff_details.length==0)
        // {
        //   this.support_service.list_of_all_imaging_technicians.staff_details=

        //   [
        //     { staff_name:null,
        //      designation:null,
        //      qualification:null,
        //      expirience:null,
        //      dept_of_working:null,
        //      date_of_join:null,
        //      registrataion_no:null,
        //      council_of_reg:null,}
        //   ]

        // }

        if (this.support_service.non_clinical_and_administrative_departments_of_the_organization.non_clinicalsrvc.length == 0) {
          this.support_service.non_clinical_and_administrative_departments_of_the_organization.non_clinicalsrvc =

            [
              { service: "Kitchen Services", outsource: false, inhouse: false, not_applicable: false },
              { service: "Catering Services", outsource: false, inhouse: false, not_applicable: false },
              { service: "Cleaning services", outsource: false, inhouse: false, not_applicable: false },
              { service: "General Administration", outsource: false, inhouse: false, not_applicable: false },
              { service: "Laundry Services", outsource: false, inhouse: false, not_applicable: false },
              { service: "Management of Clinical waste (as per BMW Act and Rules)", outsource: false, inhouse: false, not_applicable: false },
              { service: "Management of Non-Clinical waste (as per BMW Act and Rules)", outsource: false, inhouse: false, not_applicable: false },
              { service: "Mortuary Services", outsource: false, inhouse: false, not_applicable: false },
              // {service:"Occupational Health",outsource:false,inhouse:false,not_applicable:false},
              { service: "Patient Advisory Service", outsource: false, inhouse: false, not_applicable: false },
              { service: "Security Services", outsource: false, inhouse: false, not_applicable: false },
              { service: "Technical Department/Equipment Management", outsource: false, inhouse: false, not_applicable: false }
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

        this.supportserviceFormSubmitted = data;


      }


    });
    this.hospdataserv.ncFormTabInfo.subscribe(data => {

      this.ncFormTabInfo = data
    });

    // this.hospdataserv.getButtonsHide().subscribe(data => {

    //   if (data != null || data != undefined) {

    //     this.hidebtns = data;


    //   }


    // });

  }
  chectdd() {

    let dd = this.support_service.service_list;
  }

  datechk() {

    let tt = this.datemodel;


  }

  ngOnInit(): void {
    this.showUploadMsg = null;
    this.progress = null;
  }
  openNcModel(objName, propName, quesObj: any) {
    //this.modalService.open(ncModel, { size: 'lg' });

    this.openNcModelSupportControl.emit({ ObjName: objName, propName: propName, quesObj })

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
  openById = {};
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


  emergencyServiceSelection() {

    if (this.support_service.hospital_provide_emergency_services.ques_selected_opt != true) {
      this.support_service.condition_of_patient_in_his_her_admission_discharge_transfer.ques_selected_opt = null;
      this.support_service.established_procedure_to_inform_police_in_mlc_cases.ques_selected_opt = null;
      this.support_service.emergency_cases_in_line_with_the_statutory_requirements.ques_selected_opt = null;


    }

  }
  labServiceSelection() {

    this.support_service.mou_for_out_sourced_laboratory_service.agency_name = null;
    this.support_service.mou_for_out_sourced_laboratory_service.valid_from = null;
    this.support_service.mou_for_out_sourced_laboratory_service.valid_till = null;
    this.support_service.mou_for_out_sourced_laboratory_service.ques_doc_url = null;

    this.support_service.mou_for_out_sourced_laboratory_service.ques_selected_opt = null;

    this.support_service.hospital_list_out_the_outsourced_laboratory_tests.ques_selected_opt = null;
    this.support_service.hospital_hold_a_mou_with_party_for_outsourced_lab_tests.ques_selected_opt = null;
    this.support_service.commensurating_to_the_services_provided_by_the_hospital.ques_selected_opt = null;
    this.support_service.follow_the_policy_sop_manual_for_the_identification.ques_selected_opt = null;
    this.support_service.lab_technicians_qualified_to_perform_supervise_and_interpret.ques_selected_opt = null;
    // this.support_service.lab_technisian_list.staff_details= [
    //   { staff_name:null,
    //    designation:null,
    //    qualification:null,
    //    expirience:null,
    //    dept_of_working:null,
    //    date_of_join:null}
    // ]
    this.support_service.lab_technisian_list.staff_details = new Array<StaffDetails>();
    this.support_service.service_list.forEach(record => {
      record.inhouse = false;
      record.outsource = false;
      record.serves_other_org = false;
    })

    this.support_service.hospital_defined_turn_around_time_for_all_laboratory_tests.ques_selected_opt = null;
    this.support_service.hospital_defined_biological_reference_interval_different_tests.ques_selected_opt = null;
    this.support_service.hospital_defined_the_critical_limits_for_different_tests.ques_selected_opt = null;
    this.support_service.critical_test_results_communicated_concerned_personnel_documented.ques_selected_opt = null;
    this.support_service.laboratory_staffs_properly_trained_in_safe_practices.ques_selected_opt = null;



  }
  haveValidMouSelection() {
    this.support_service.mou_for_out_sourced_laboratory_service.agency_name = null;
    this.support_service.mou_for_out_sourced_laboratory_service.valid_from = null;
    this.support_service.mou_for_out_sourced_laboratory_service.valid_till = null;
    this.support_service.mou_for_out_sourced_laboratory_service.ques_doc_url = null;
  }
  // labTechnicianSelection()
  // {
  //   this.support_service.lab_technisian_list.staff_details= [
  //     { staff_name:null,
  //      designation:null,
  //      qualification:null,
  //      expirience:null,
  //      dept_of_working:null,
  //      date_of_join:null}
  //   ]
  // }
  imagingServiceSelection() {


    this.support_service.hospital_procure_pc_pndt_act_certificate.ques_selected_opt = null;
    this.support_service.hospital_procure_pc_pndt_act_certificate.agency_name = null;
    this.support_service.hospital_procure_pc_pndt_act_certificate.valid_from = null;
    this.support_service.hospital_procure_pc_pndt_act_certificate.valid_till = null;
    this.support_service.hospital_procure_pc_pndt_act_certificate.ques_doc_url = null;
    this.support_service.upload_mou_for_out_sourced_imaging_service.ques_selected_opt = null
    this.support_service.hosp_assure_qty_outsrc_img_srvc.ques_selected_opt = null

    this.support_service.upload_mou_for_out_sourced_imaging_service.agency_name = null;
    this.support_service.upload_mou_for_out_sourced_imaging_service.valid_till = null;
    this.support_service.upload_mou_for_out_sourced_imaging_service.valid_from = null;
    this.support_service.upload_mou_for_out_sourced_imaging_service.ques_doc_url = null;
    this.support_service.hospital_have_the_imaging_services_commensurating.ques_selected_opt = null;
    this.support_service.hospital_according_to_aerb_pcpndt_guidelines.ques_selected_opt = null;
    this.support_service.qualified_to_perform_supervise_and_interpret_investigations.ques_selected_opt = null;
    this.support_service.hospital_defined_turn_around_time_for_all_imaging_services.ques_selected_opt = null;
    this.support_service.the_hospital_defined_the_critical_test_results.ques_selected_opt = null;
    this.support_service.communicated_to_the_concerned_personnel.ques_selected_opt = null;
    this.support_service.the_imaging_and_ancillary_staff_properly_trained.ques_selected_opt = null;


    this.support_service.imaging_service_list.forEach(record => {
      record.inhouse = false;
      record.outsource = false;
      record.serves_other_org = false;
    })




  }
  haveMouImagingServcSelection() {
    this.support_service.upload_mou_for_out_sourced_imaging_service.agency_name = null;
    this.support_service.upload_mou_for_out_sourced_imaging_service.valid_till = null;
    this.support_service.upload_mou_for_out_sourced_imaging_service.valid_from = null;
    this.support_service.upload_mou_for_out_sourced_imaging_service.ques_doc_url = null;
  }
  laundryServiceSelection() {
    this.support_service.hospital_have_laundry_and_linen_management.ques_selected_opt = null;
    this.support_service.hospital_policy_defines_change_of_different_categories_of_linen.ques_selected_opt = null;
  }
  pharmacyServiceSelection() {
    //this.support_service.pharmacy_licence.valid=false;

    // this.support_service.pharmacy_licence.pharmacy_lic_url=null;
    // this.support_service.pharmacy_licence.valid_from=null;
    //   this.support_service.pharmacy_licence.valid_till=null;
    //   this.support_service.pharmacy_licence.licience_no=null;
    //   this.support_service.pharmacy_licence.appln_no_renewal_appln=null;
    //   this.support_service.pharmacy_licence.status=null;
    //   this.support_service.pharmacy_licence.appln_no_renewal_appln=null;
    this.support_service.pharmacy_service_list.forEach(data => {
      data.inhouse = false;
      data.outsource = false;
      data.serves_other_org = false;
      data.pharmacyservc_mou_lic_details = {
        agent_name: null,
        available: null,
        valid_from: null,
        valid_till: null,
        license_url: null

      }


    })


  }
  ambulanceServiceSelection() {
    this.support_service.number_of_ambulance.ques_text_value = null;
    this.support_service.upload_mou_for_out_sourced_ambulance_service.agency_name = null;
    this.support_service.upload_mou_for_out_sourced_ambulance_service.valid_from = null;
    this.support_service.upload_mou_for_out_sourced_ambulance_service.valid_till = null;
    this.support_service.upload_mou_for_out_sourced_ambulance_service.ques_doc_url = null;
    this.support_service.upload_mou_for_out_sourced_ambulance_service.ques_selected_opt = null;
    this.support_service.ambulance_appropriately_equipped_have_basic_life_support.ques_selected_opt = null;
    this.support_service.concerned_personnel_trained_basic_cardiopulmonary_resuscitation.ques_selected_opt = null;
    this.support_service.daily_check_list_of_ambulance.document_url = null;
    this.support_service.daily_check_list_of_ambulance.ques_doc_url = null;
  }
  hvMouAmbulanceServcSelection() {
    this.support_service.upload_mou_for_out_sourced_ambulance_service.agency_name = null;
    this.support_service.upload_mou_for_out_sourced_ambulance_service.valid_from = null;
    this.support_service.upload_mou_for_out_sourced_ambulance_service.valid_till = null;
    this.support_service.upload_mou_for_out_sourced_ambulance_service.ques_doc_url = null;
  }
  AddMoreService() {
    this.support_service.service_list.push(
      {
        service: null, outsource: false, inhouse: false, serves_other_org: false,
        labservc_mou_lic_details:
        {
          agent_name: null,
          available: null,
          valid_from: null,
          valid_till: null,
          license_url: null

        }

      }

    )
  }
  RemoveService(itm) {
    //this.support_service.service_list.pop();
    this.support_service.service_list = this.support_service.service_list.filter(obj => obj != itm)

  }
  AddMoreImagingService() {
    this.support_service.imaging_service_list.push(
      {
        service: null, outsource: false, inhouse: false, serves_other_org: false,
        dishnosticservc_mou_lic_details:
        {
          agent_name: null,
          available: null,
          valid_from: null,
          valid_till: null,
          license_url: null

        },
        dishnosticservc_aerb_lic_details:
        {

          agent_name: null,
          status: null,
          application_no: null,
          lic_no: null,
          valid_from: null,
          valid_till: null,
          license_url: null

        }
      }
    )
  }
  RemoveImagingService(itm) {
    //this.support_service.imaging_service_list.pop();
    this.support_service.imaging_service_list = this.support_service.imaging_service_list.filter(obj => obj != itm)

  }
  AddMorePharmacyService() {
    this.support_service.pharmacy_service_list.push(
      {
        service: null, outsource: false, inhouse: false, serves_other_org: false,
        pharmacyservc_mou_lic_details:
        {
          agent_name: null,
          available: null,
          valid_from: null,
          valid_till: null,
          license_url: null

        }
      }
    )
  }
  RemovePharmacyService(itm) {
    //this.support_service.pharmacy_service_list.pop();
    this.support_service.pharmacy_service_list = this.support_service.pharmacy_service_list.filter(obj => obj != itm)

  }
  AddNonTechService() {
    this.support_service.non_clinical_and_administrative_departments_of_the_organization.non_clinicalsrvc.push(
      { service: null, outsource: false, inhouse: false, not_applicable: false }
    )
  }
  RemoveNontechService(itm) {
    //this.support_service.non_clinical_and_administrative_departments_of_the_organization.non_clinicalsrvc.pop();
    this.support_service.non_clinical_and_administrative_departments_of_the_organization.non_clinicalsrvc = this.support_service.non_clinical_and_administrative_departments_of_the_organization.non_clinicalsrvc.filter(obj => obj != itm)

  }
  AddmoreLabourStaff() {
    this.support_service.lab_technisian_list.staff_details.push
      (
        {
          staff_name: null,
          designation: null,
          qualification: null,
          expirience: null,
          dept_of_working: null,
          date_of_join: null,
          registrataion_no: null,
          council_of_reg: null,
          certific_body: null,
          specialization: null,
          type: null,
          adhar: null,
          pan: null
        }
      )
  }
  RemoveLabourStaff(index) {

    this.support_service.lab_technisian_list.staff_details.splice(index, 1)
  }

  AddmoreImagingStaff() {
    this.support_service.list_of_all_imaging_technicians.staff_details.push
      (
        {
          staff_name: null,
          designation: null,
          qualification: null,
          expirience: null,
          dept_of_working: null,
          date_of_join: null,
          registrataion_no: null,
          council_of_reg: null,
          certific_body: null,
          specialization: null,
          type: null,
          adhar: null,
          pan: null
        }
      )
  }
  RemoveImagingStaff(index) {
    this.support_service.list_of_all_imaging_technicians.staff_details.splice(index, 1)
  }
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  labTechQualifySelection() {
    this.support_service.lab_technisian_list.staff_details = new Array<StaffDetails>();
  }
  imgTechQualifySelection() {
    this.support_service.list_of_all_imaging_technicians.staff_details = new Array<StaffDetails>();
  }
  getServiceListSelectedOutsourceIndex() {

    let index = this.support_service.service_list.findIndex(x => x.outsource == true)
    return index;
  }
  getImagingServiceListSelectedMouIndex() {

    let index = this.support_service.imaging_service_list.findIndex(x => x.outsource == true)
    return index;

  }
  getPharmacyServiceListSelectedOutsourceIndex() {
    let index = this.support_service.pharmacy_service_list.findIndex(x => x.outsource == true)
    return index;
  }

  // getImagingServiceListSelectedAerbIndex()
  // {
  //   let index= this.support_service.imaging_service_list.findIndex(x=>x.inhouse==true)

  //   return index;
  // }

  openFileUpload(item, uploadExcelModel) {
    ////debugger
    this.modalService.open(uploadExcelModel, { size: 'md' });
    this.uploadResult = { bad: [], isSuccess: true };
    this.uploadResult = { good: [], isSuccess: true };
    this.cardName = item;
    this.fileToUpload = null;
    this.filename = null;
    if (this.cardName == "lab_technisain") {
      this.templatename = this.Tmplte_LabTechnisianStaff;
      // this.templatenameDownload = "Tmplte_ImagingTechnisianStaff_download"
      this.templatenameDownload = "Template Laboratory Technicians";

    } else if (this.cardName == "imaging_technisain") {
      this.templatename = this.Tmplte_ImagingTechnisianStaff;
      // this.templatenameDownload = "Tmplte_ImagingTechnisianStaff_download"
      this.templatenameDownload = "Template Imaging Technicians";
    }


  }
  UploadExcel() {
    ////debugger
    let item = this.fileToUpload.name.split(".");
    console.log(item)
    this.excelMgs = null;
    if (item[1] != 'xlsx') {
      // alert("jjsdjhsd");
      this.excelMgs = "Upload only .xlsx document !!!"
      return;
    }

    this.uploadResult.good = [];
    if (!confirm("Click OK button to start uploading data.\nOnce you upload, you can not revert back changes !!")) {

      this.uploadResult = { bad: [], isSuccess: true, message: "Upload cancelled..." }; // rrc
      console.log("...User selected cancelled...");
      return;

    }


    // this.progressUpload = 0;
    this.uploadResult = { bad: [], isSuccess: true };
    this.uploadService.fileUploadHospitalStaffing(this.fileToUpload, null, this.cardName).subscribe(data => {


      if (data.body) {
        //  this.progressUpload = false;
        this.uploadResult = data.body;


        if (this.uploadResult.good != null || this.uploadResult.good != '') {
          if (this.uploadResult.good.length > 0) {
            for (let i in this.uploadResult.good) {

              if (this.cardName == "lab_technisain") {
                this.support_service.lab_technisian_list.staff_details.push(this.uploadResult.good[i])
              }
              else if (this.cardName == "imaging_technisain") {
                this.support_service.list_of_all_imaging_technicians.staff_details.push(this.uploadResult.good[i])
              }



              // this.censupportservice.lab_technician.staff_details.push(this.uploadResult.good[i])

              // this.modalService.dismissAll();

            }



          }
        }



      }

    }
      , error => {
        //  this.progressUpload = false;

        // rrc
        this.uploadResult = error.error;

      });

  }
  handleExcelFileInput(files: FileList) {
    const fileItem = files.item(0);

    this.fileToUpload = fileItem
    this.filename = this.fileToUpload.name;

  }

  addStaff(addStaffModel, modalhead) {

    this.actiontype = "Save";
    this.staffModelHeading = modalhead.trim();
    this.staffdetatlsmodal = new StaffDetails();
    this.modalService.open(addStaffModel, { size: 'lg' });




  }
  addStaffData() {

    if (this.actiontype.trim().toLowerCase() == "edit") {

    }
    else {

      if (this.staffModelHeading == 'Laboratory Technicians') {
        this.support_service.lab_technisian_list.staff_details.push
          (
            {
              staff_name: this.staffdetatlsmodal.staff_name,
              designation: this.staffdetatlsmodal.designation,
              qualification: this.staffdetatlsmodal.qualification,
              expirience: this.staffdetatlsmodal.expirience,
              dept_of_working: null,
              date_of_join: this.staffdetatlsmodal.date_of_join,
              council_of_reg: null,
              registrataion_no: null,
              certific_body: null,
              specialization: null,
              type: null,
              adhar: null,
              pan: null

            }
          )
      }
      else if (this.staffModelHeading == 'Imaging Technicians') {
        this.support_service.list_of_all_imaging_technicians.staff_details.push
          (
            {
              staff_name: this.staffdetatlsmodal.staff_name,
              designation: this.staffdetatlsmodal.designation,
              qualification: this.staffdetatlsmodal.qualification,
              expirience: this.staffdetatlsmodal.expirience,
              dept_of_working: null,
              date_of_join: this.staffdetatlsmodal.date_of_join,
              council_of_reg: null,
              registrataion_no: null,
              certific_body: null,
              specialization: null,
              type: null,
              adhar: null,
              pan: null
            }
          )
      }





    }

    this.modalService.dismissAll();

  }
  editStaff(addStaffModel, modalhead, item: StaffDetails, index) {
    this.actiontype = "Edit";
    this.currentindex_toedit = index;
    this.staffModelHeading = modalhead.trim();
    this.staffdetatlsmodal = item
    this.modalService.open(addStaffModel, { size: 'lg' });

  }
  unselect(data) {
    this.support_service.non_clinical_and_administrative_departments_of_the_organization.non_clinicalsrvc.forEach(itm => {

      if (itm.not_applicable != false) {
        itm.inhouse = false;
        itm.outsource = false;
      }
    })

  }

  unselectNotApplicable(data) {
    this.support_service.non_clinical_and_administrative_departments_of_the_organization.non_clinicalsrvc.forEach(itm => {

      if (itm.outsource != false || itm.inhouse != false) {
        itm.not_applicable = false;

      }
    })

  }

}
