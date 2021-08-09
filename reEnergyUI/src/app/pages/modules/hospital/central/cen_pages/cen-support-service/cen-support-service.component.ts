import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { cenHospitalDataShareService } from '../../cendatashareservice/cenhospitalDataShare.service';
import { cenHospitalPages, cenHospitalPagesQuestionBank } from 'src/app/pages/model/center/cenHospitalPages.model';
import { CenSupportService } from 'src/app/pages/model/center/CenSupportService.model';
import { NgForm } from '@angular/forms';
import { FileViewOrDelete } from 'src/app/pages/model/FileViewOrDelete.model';
import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import Swal from 'sweetalert2';
import { StaffDetails } from 'src/app/pages/model/hospital/humanResource.model';
import { HospitalDataShareService } from '../../../hospital/datashareservice/hospitalDataShare.service';
@Component({
  selector: 'app-cen-support-service',
  templateUrl: './cen-support-service.component.html',
  styleUrls: ['./cen-support-service.component.scss', '../../central.component.scss']
})
export class CenSupportServiceComponent implements OnInit {

  aerb_lic_detail_visibility = false;
  cenhospitalPages: cenHospitalPages;
  declarationcheck
  cenhospitalPagesQueBank: cenHospitalPagesQuestionBank;
  censupportservice: CenSupportService;
  public currentObj: any;
  public propertyname: any;
  public selectedFile: any;
  censupportservcformSubmitted = false;
  ary_uploadedDocs: FileViewOrDelete[] = new Array();

  uploadResult: any = { bad: [], isSuccess: true };
  public cardName: string;
  fileToUpload: any;
  filename: string = "";
  excelMgs = "";
  actiontype: string = null;
  currentindex_toedit: number;
  public staffdetatlsmodal: StaffDetails = new StaffDetails();
  public staffModelHeading = "";
  // public Tmplte_LabTechnisianStaff = "../../../../../../../assets/excel_upload_doc/LabTechnisian.xlsx";
  // public Tmplte_ImagingTechnisianStaff = "../../../../../../../assets/excel_upload_doc/ImagingTechnisian.xlsx";
  public Tmplte_LabTechnisianStaff = "../../../../../../../assets/excel_upload_doc/Template_Laboratory_Technicians.xlsx";
  public Tmplte_ImagingTechnisianStaff = "../../../../../../../assets/excel_upload_doc/Template_Imaging_Technicians.xlsx";


  public templatename: string = "";
  public templatenameDownload: string = "";
  @Output() deleteFile = new EventEmitter();
  @ViewChild('acc') accordion: NgbAccordion;
  @ViewChild('censupportServiceForm', { static: false }) censupportServiceForm: NgForm;
  @ViewChild('declarationform', { static: false }) Declarationform: NgForm;
  Stage_id: number;
  @Output() openNcModelTabControl = new EventEmitter();
  ncFormTabInfo: any;
  stageId: number;
  @ViewChild('documentuploadModel', { static: false }) documentuploadModel: any;

  showUploadMsg: boolean | null;
  currentUser: any;
  currUsrRole: any;
  hidebtns = false;
  constructor(private cenhospdataserv: cenHospitalDataShareService, private hospdataserv: HospitalDataShareService, private modalService: NgbModal, private uploadService: FileUploadService, private tostr: CustomTosterServiceService) {

    this.cenhospitalPages = new cenHospitalPages();
    this.cenhospitalPagesQueBank = new cenHospitalPagesQuestionBank();
    const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.currentUser = currentUser;
    this.currUsrRole = this.currentUser.roleId;
    this.censupportservice = new CenSupportService();

    this.cenhospdataserv.currentStage.subscribe(data => {
      // //debugger
      this.Stage_id = data
    });
    this.cenhospdataserv.ncFormTabInfo.subscribe(value => {
      this.ncFormTabInfo = value;
    })

    this.cenhospdataserv.getData().subscribe(data => {

      if (data != null || data != undefined) {

        this.cenhospitalPages = data;
        this.censupportservice = this.cenhospitalPages.censupportservice;




        if (this.censupportservice.list_of_non_clinical_and_administrative_departments.support_servc_list.length == 0) {
          this.censupportservice.list_of_non_clinical_and_administrative_departments.support_servc_list = [
            { service: "General Administration", outsource: false, inhouse: false, not_applicable: false },
            { service: "Human Resource", outsource: false, inhouse: false, not_applicable: false },
            // { service: "Occupational Health", outsource: false, inhouse: false, not_applicable: false },
            { service: "Technical Department/Equipment Management", outsource: false, inhouse: false, not_applicable: false },
            { service: "Laundry Services", outsource: false, inhouse: false, not_applicable: false },
            { service: "Housekeeping Services", outsource: false, inhouse: false, not_applicable: false },
            { service: "Management of Clinical Waste (as per BMW Act and Rules)", outsource: false, inhouse: false, not_applicable: false },
            { service: "Management of Non-Clinical Waste (as per BMW Act and Rules)", outsource: false, inhouse: false, not_applicable: false },
            { service: "Patient Advisory Service", outsource: false, inhouse: false, not_applicable: false },
            { service: "Security Services", outsource: false, inhouse: false, not_applicable: false },
            // { service: "Mortuary Services", outsource: false, inhouse: false, not_applicable: false },
            { service: "Fire Services", outsource: false, inhouse: false, not_applicable: false },
            { service: "Social Service", outsource: false, inhouse: false, not_applicable: false }

          ]

        }
        if (this.censupportservice.list_of_paramedical_allied_services.oushadhashala.length == 0) {
          this.censupportservice.list_of_paramedical_allied_services.oushadhashala = [
            { service: "Dispensary", outsource: false, inhouse: false, not_applicable: false },
            // { service: "Bhaishajya Shala (Medicine Manufacturing Unit)", outsource: false, inhouse: false, not_applicable: false },

          ]

        }
        if (this.censupportservice.list_of_paramedical_allied_services.pathyaahara_vibhaga.length == 0) {
          this.censupportservice.list_of_paramedical_allied_services.pathyaahara_vibhaga = [
            { service: "Kitchen Services", outsource: false, inhouse: false, not_applicable: false },
            { service: "Catering Services", outsource: false, inhouse: false, not_applicable: false },



          ]

        }
        if (this.censupportservice.list_of_paramedical_allied_services.rehabilitative_services.length == 0) {
          this.censupportservice.list_of_paramedical_allied_services.rehabilitative_services = [
            { service: "Karmabhyasa (Physiotherapy)", outsource: false, inhouse: false, not_applicable: false },
            // { service: "Occupational Therapy", outsource: false, inhouse: false, not_applicable: false },
            // { service: "Speech and Language Therapy", outsource: false, inhouse: false, not_applicable: false },

          ]

        }

        if (this.censupportservice.laboratory_services._laboratorty_servc_list.length == 0) {

          this.censupportservice.laboratory_services._laboratorty_servc_list = [

            {
              service: "Clinical Bio-chemistry", outsource: false, inhouse: false, serves_other_org: false,
              mou_lic_detail: {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              service: "Clinical Pathology", outsource: false, inhouse: false, serves_other_org: false,
              mou_lic_detail: {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              service: "Haematology", outsource: false, inhouse: false, serves_other_org: false,
              mou_lic_detail: {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              service: "Clinical Microbiology", outsource: false, inhouse: false, serves_other_org: false,
              mou_lic_detail: {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              service: "Serology", outsource: false, inhouse: false, serves_other_org: false,
              mou_lic_detail: {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              service: "Histopathology", outsource: false, inhouse: false, serves_other_org: false,
              mou_lic_detail: {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              service: "Cytopathology", outsource: false, inhouse: false, serves_other_org: false,
              mou_lic_detail: {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              service: "Genetics", outsource: false, inhouse: false, serves_other_org: false,
              mou_lic_detail: {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            },
            {
              service: "Molecular Biology", outsource: false, inhouse: false, serves_other_org: false,
              mou_lic_detail: {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            }
          ]

        }
        if (this.censupportservice.laboratory_services.transfusioin_servc_list.length == 0) {
          this.censupportservice.laboratory_services.transfusioin_servc_list = [
            {
              service: "Blood Bank", outsource: false, inhouse: false, serves_other_org: false,
              mou_lic_detail: {
                agent_name: null,
                available: null,
                valid_from: null,
                valid_till: null,
                license_url: null
              }
            }



          ]

        }
        // if (this.censupportservice.lab_technician.staff_details.length == 0) {
        //   this.censupportservice.lab_technician.staff_details =
        //     [
        //       {
        //         staff_name: null,
        //         designation: null,
        //         qualification: null,
        //         expirience: null,
        //         dept_of_working: null,
        //         registrataion_no:null,
        //       council_of_reg:null,
        //         date_of_join: null
        //       }
        //     ]
        // }
        // if (this.censupportservice.image_technician.staff_details.length == 0) {
        //   this.censupportservice.image_technician.staff_details =
        //     [
        //       {
        //         staff_name: null,
        //         designation: null,
        //         qualification: null,
        //         expirience: null,
        //         registrataion_no:null,
        //         council_of_reg:null,
        //         dept_of_working: null,
        //         date_of_join: null
        //       }
        //     ]
        // }
        if (this.censupportservice.imaging_service_list.length == 0) {
          this.censupportservice.imaging_service_list =
            [
              {
                service: "X-Ray", outsource: false, inhouse: false, serves_other_org: false,
                aerb_lic_details:
                {
                  agent_name: null,
                  status: null,
                  application_no: null,
                  lic_no: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null,


                },
                mou_lic_detail: {
                  agent_name: null,
                  available: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null
                }
              },

              {
                service: "Mobile X-ray", outsource: false, inhouse: false, serves_other_org: false,
                aerb_lic_details:
                {
                  agent_name: null,
                  status: null,
                  application_no: null,
                  lic_no: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null

                },
                mou_lic_detail: {
                  agent_name: null,
                  available: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null
                }
              },
              {
                service: "Ultrasound", outsource: false, inhouse: false, serves_other_org: false,
                aerb_lic_details:
                {
                  agent_name: null,
                  status: null,
                  application_no: null,
                  lic_no: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null

                },
                mou_lic_detail: {
                  agent_name: null,
                  available: null,
                  valid_from: null,
                  valid_till: null,
                  license_url: null
                }
              }
              // {
              //   service: "CT Scanning", outsource: false, inhouse: false, serves_other_org: false,
              //   aerb_lic_details:
              //   {
              //     agent_name: null,
              //     status: null,
              //     application_no: null,
              //     lic_no: null,
              //     valid_from: null,
              //     valid_till: null,
              //     license_url: null

              //   },
              //   mou_lic_detail:{
              //     agent_name :null,
              //     available :null,
              //     valid_from :null,
              //     valid_till :null,
              //     license_url :null
              //   }
              // },
              // {
              //   service: "MRI", outsource: false, inhouse: false, serves_other_org: false,
              //   aerb_lic_details:
              //   {
              //     agent_name: null,
              //     status: null,
              //     application_no: null,
              //     lic_no: null,
              //     valid_from: null,
              //     valid_till: null,
              //     license_url: null

              //   },
              //   mou_lic_detail:{
              //     agent_name :null,
              //     available :null,
              //     valid_from :null,
              //     valid_till :null,
              //     license_url :null
              //   }
              // },
              // {
              //   service: "PET", outsource: false, inhouse: false, serves_other_org: false,
              //   aerb_lic_details:
              //   {
              //     agent_name: null,
              //     status: null,
              //     application_no: null,
              //     lic_no: null,
              //     valid_from: null,
              //     valid_till: null,
              //     license_url: null

              //   },
              //   mou_lic_detail:{
              //     agent_name :null,
              //     available :null,
              //     valid_from :null,
              //     valid_till :null,
              //     license_url :null
              //   }
              // },
              // {
              //   service: "Gamma Camera", outsource: false, inhouse: false, serves_other_org: false,
              //   aerb_lic_details:
              //   {
              //     agent_name: null,
              //     status: null,
              //     application_no: null,
              //     lic_no: null,
              //     valid_from: null,
              //     valid_till: null,
              //     license_url: null

              //   },
              //   mou_lic_detail:{
              //     agent_name :null,
              //     available :null,
              //     valid_from :null,
              //     valid_till :null,
              //     license_url :null
              //   }
              // },
              // {
              //   service: "DSA Lab", outsource: false, inhouse: false, serves_other_org: false,
              //   aerb_lic_details:
              //   {
              //     agent_name: null,
              //     status: null,
              //     application_no: null,
              //     lic_no: null,
              //     valid_from: null,
              //     valid_till: null,
              //     license_url: null

              //   },
              //   mou_lic_detail:{
              //     agent_name :null,
              //     available :null,
              //     valid_from :null,
              //     valid_till :null,
              //     license_url :null
              //   }
              // }

            ]
        }


        let oo = this.censupportservice.laboratory_services._laboratorty_servc_list

        // if(this.support_service.pharmacy_service_list.length==0)
        // {
        //   this.support_service.pharmacy_service_list=[
        //     {service:"Dispensary",outsource:false,inhouse:false,serves_other_org:false},
        //     {service:"Bhaishajya Shala (Medicine Manufacturing Unit)",outsource:false,inhouse:false,serves_other_org:false},


        //   ]

        // }

        // if(this.support_service.lab_technisian_list.staff_details.length==0)
        // {
        //   this.support_service.lab_technisian_list.staff_details=
        //   [
        //     { staff_name:null,
        //      designation:null,
        //      qualification:null,
        //      expirience:null,
        //      dept_of_working:null,
        //      date_of_join:null}
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
        //      date_of_join:null}
        //   ]

        // }
        // if(this.support_service.non_clinical_and_administrative_departments_of_the_organization.non_clinicalsrvc.length==0)
        // {
        //   this.support_service.non_clinical_and_administrative_departments_of_the_organization.non_clinicalsrvc=

        //   [
        //     {service:"Kitchen Services",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"Catering Services",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"Cleaning services",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"General Administration",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"Laundry",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"Management of clinical waste (as per BMW Act and Rules)",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"Management of non-Clinical waste (as per BMW Act and Rules)",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"Mortuary Services",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"Occupational Health",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"Patient Advisory Service",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"Security",outsource:false,inhouse:false,not_applicable:false},
        //     {service:"Technical Department/Equipment Management",outsource:false,inhouse:false,not_applicable:false}
        //   ]

        // }
      }


    });

    this.cenhospdataserv.getQuestionBankData().subscribe(data => {

      if (data != null || data != undefined) {

        this.cenhospitalPagesQueBank = data;



      }


    });

    this.cenhospdataserv.getFormSubmissionStatus().subscribe(data => {

      if (data != null || data != undefined) {

        this.censupportservcformSubmitted = data;


      }


    });

    this.cenhospdataserv.getButtonsHide().subscribe(data => {

      if (data != null || data != undefined) {

        this.hidebtns = data;


      }


    });
  }

  ngOnInit(): void {
  }
  // inHouseCheckChange()
  // {
  //   for (let i = 0; i < this.censupportservice.imaging_service_list.length; i++) {


  //     if ( this.censupportservice.imaging_service_list[i].inhouse== true) 
  //     {
  //      this.aerb_lic_detail_visibility=true;
  //       break;
  //     }


  //   }
  // }

  openNcModel(objName, propName, quesObj: any) {
    this.openNcModelTabControl.emit({ ObjName: objName, propName: propName, quesObj })

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

  AddNonTechService() {
    this.censupportservice.list_of_non_clinical_and_administrative_departments.support_servc_list.push(
      { service: null, outsource: false, inhouse: false, not_applicable: false }
    )
  }
  RemoveNontechService(itm) {
    // this.censupportservice.list_of_non_clinical_and_administrative_departments.support_servc_list.pop();
    this.censupportservice.list_of_non_clinical_and_administrative_departments.support_servc_list = this.censupportservice.list_of_non_clinical_and_administrative_departments.support_servc_list.filter(obj => obj != itm)

  }
  AddRehabilitativeService() {
    this.censupportservice.list_of_paramedical_allied_services.rehabilitative_services.push(
      { service: null, outsource: false, inhouse: false, not_applicable: false }
    )

  }
  RemoveRehabilitativeService(itm) {
    //  this.censupportservice.list_of_paramedical_allied_services.rehabilitative_services.pop();
    this.censupportservice.list_of_paramedical_allied_services.rehabilitative_services = this.censupportservice.list_of_paramedical_allied_services.rehabilitative_services.filter(obj => obj != itm)

  }
  AddImagingService() {
    this.censupportservice.imaging_service_list.push(
      {
        service: null, outsource: false, inhouse: false, serves_other_org: false,
        aerb_lic_details:
        {
          agent_name: null,
          status: null,
          application_no: null,
          lic_no: null,
          valid_from: null,
          valid_till: null,
          license_url: null

        },
        mou_lic_detail: {
          agent_name: null,
          available: null,
          valid_from: null,
          valid_till: null,
          license_url: null
        }
      }
    )
  }
  RemoveImagingService(itm) {
    // this.censupportservice.imaging_service_list.pop();
    this.censupportservice.imaging_service_list = this.censupportservice.imaging_service_list.filter(obj => obj != itm)


  }

  AddTrnsfsnMoreService() {
    this.censupportservice.laboratory_services.transfusioin_servc_list.push(
      {
        service: null, outsource: false, inhouse: false, serves_other_org: false,
        mou_lic_detail: {
          agent_name: null,
          available: null,
          valid_from: null,
          valid_till: null,
          license_url: null
        }
      }
    )
  }
  RemoveTrnsFsnService(itm) {
    // this.censupportservice.laboratory_services.transfusioin_servc_list.pop();
    this.censupportservice.laboratory_services.transfusioin_servc_list = this.censupportservice.laboratory_services.transfusioin_servc_list.filter(obj => obj != itm)

  }
  AddMoreLabService() {
    this.censupportservice.laboratory_services._laboratorty_servc_list.push(
      {
        service: null, outsource: false, inhouse: false, serves_other_org: false,
        mou_lic_detail: {
          agent_name: null,
          available: null,
          valid_from: null,
          valid_till: null,
          license_url: null
        }
      }
    )
  }
  RemoveLabService(itm) {
    // this.censupportservice.laboratory_services._laboratorty_servc_list.pop();
    this.censupportservice.laboratory_services._laboratorty_servc_list = this.censupportservice.laboratory_services._laboratorty_servc_list.filter(obj => obj != itm)

  }
  AddmoreLabTechStaff() {
    this.censupportservice.lab_technician.staff_details.push
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
  RemoveLabTechStaff(index) {
    this.censupportservice.lab_technician.staff_details.splice(index, 1)
  }
  AddmoreImgStaff() {
    this.censupportservice.image_technician.staff_details.push
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
  RemoveImgStaff(index) {
    this.censupportservice.image_technician.staff_details.splice(index, 1)
  }

  imagingServiceSelection() {
    this.censupportservice.mou_for_out_sourced_imaging_test_service.agency_name = null;
    this.censupportservice.mou_for_out_sourced_imaging_test_service.valid_from = null;
    this.censupportservice.mou_for_out_sourced_imaging_test_service.valid_till = null;
    this.censupportservice.mou_for_out_sourced_imaging_test_service.ques_doc_url = null;
    this.censupportservice.mou_for_out_sourced_imaging_test_service.ques_selected_opt = null;

    this.censupportservice.inhouse_imaging_services_licensed_aerb.ques_selected_opt = null;
    this.censupportservice.centre_provide_imaging_services_commensurate.ques_selected_opt = null;
    this.censupportservice.policy_sop_for_handling_and_disposing.ques_selected_opt = null;
    this.censupportservice.imaging_service_competent_specifically_qualified.ques_selected_opt = null;
    this.censupportservice.centre_prescribe_the_turn_around_time.ques_selected_opt = null;
    this.censupportservice.centre_defined_the_critical_test_results.ques_selected_opt = null;
    this.censupportservice.concerned_personnel_regarding_critical_results.ques_selected_opt = null;
    this.censupportservice.concerned_staffs_properly_trained_in_imaging.ques_selected_opt = null;
    this.censupportservice.centre_provide_safety_equipments_to_concerned.ques_selected_opt = null;
    this.censupportservice.centre_ensures_quality_control_and_radiation_safety.ques_selected_opt = null;
    this.censupportservice.image_technician.staff_details = new Array<StaffDetails>();

    this.censupportservice.imaging_service_list.forEach(record => {
      record.inhouse = false;
      record.outsource = false;
      record.serves_other_org = false;
    })

  }
  imaggingTechSelection() {
    this.censupportservice.image_technician.staff_details = new Array<StaffDetails>();
  }
  imgservc_mou_selection() {
    this.censupportservice.mou_for_out_sourced_imaging_test_service.agency_name = null;
    this.censupportservice.mou_for_out_sourced_imaging_test_service.valid_from = null;
    this.censupportservice.mou_for_out_sourced_imaging_test_service.valid_till = null;
    this.censupportservice.mou_for_out_sourced_imaging_test_service.ques_doc_url = null;
  }

  labServiceSelection() {

    this.censupportservice.out_sourced_laboratory_test_service.agency_name = null;
    this.censupportservice.out_sourced_laboratory_test_service.valid_from = null;
    this.censupportservice.out_sourced_laboratory_test_service.valid_till = null;
    this.censupportservice.out_sourced_laboratory_test_service.ques_doc_url = null;
    this.censupportservice.out_sourced_laboratory_test_service.ques_selected_opt = null;

    this.censupportservice.testing_and_calibration_laboratories.ques_selected_opt = null;
    this.censupportservice.centre_provide_laboratory_services_that_commensurate.ques_selected_opt = null;
    this.censupportservice.safe_transportation_processing_and_disposal.ques_selected_opt = null;
    this.censupportservice.interpret_the_investigations_and_supervise_them.ques_selected_opt = null;
    this.censupportservice.centre_prescribes_turn_around_time.ques_selected_opt = null;
    this.censupportservice.centre_defined_critical_limits_for_different_tests.ques_selected_opt = null;
    this.censupportservice.procedure_to_intimate_the_concerned_personnels.ques_selected_opt = null;
    this.censupportservice.centre_maintain_the_quality_control_laboratory.ques_selected_opt = null;

    this.censupportservice.lab_technician.staff_details = new Array<StaffDetails>();
    this.censupportservice.laboratory_services._laboratorty_servc_list.forEach(record => {
      record.inhouse = false;
      record.outsource = false;
      record.serves_other_org = false;
    })
  }
  labTechDtaffSelection() {
    this.censupportservice.lab_technician.staff_details = new Array<StaffDetails>()
  }
  labsrvc_mou_selection() {
    this.censupportservice.out_sourced_laboratory_test_service.agency_name = null;
    this.censupportservice.out_sourced_laboratory_test_service.valid_from = null;
    this.censupportservice.out_sourced_laboratory_test_service.valid_till = null;
    this.censupportservice.out_sourced_laboratory_test_service.ques_doc_url = null;
  }
  AmbulanceServiceSelection() {
    this.censupportservice.centre_have_standardized_protocol_to_identify.ques_selected_opt = null;
    this.censupportservice.centre_have_defined_policies_and_procedure.ques_selected_opt = null;
    this.censupportservice.number_of_ambulance.answer_text = null;
    this.censupportservice.daily_check_list_of_ambulance.ques_doc_url = null;
    this.censupportservice.upload_document_ambulnce.ques_doc_url = null;
    this.censupportservice.mou_for_outsourced_ambulance_service.agency_name = null;
    this.censupportservice.mou_for_outsourced_ambulance_service.valid_from = null;
    this.censupportservice.mou_for_outsourced_ambulance_service.valid_till = null;
    this.censupportservice.mou_for_outsourced_ambulance_service.ques_doc_url = null;

    this.censupportservice.daily_check_list_of_ambulance.ques_selected_opt = null;



  }
  AmbulancemouSelection() {
    this.censupportservice.mou_for_outsourced_ambulance_service.agency_name = null;
    this.censupportservice.mou_for_outsourced_ambulance_service.valid_from = null;
    this.censupportservice.mou_for_outsourced_ambulance_service.valid_till = null;
    this.censupportservice.mou_for_outsourced_ambulance_service.ques_doc_url = null;

  }
  laundrylineSelection() {
    this.censupportservice.centre_ensure_availability_of_different_categories.ques_selected_opt = null;

  }
  openFileUpload(item, uploadExcelModel) {

    this.modalService.open(uploadExcelModel, { size: 'md' });
    this.uploadResult = { bad: [], isSuccess: true };
    this.uploadResult = { good: [], isSuccess: true };
    this.cardName = item;
    this.fileToUpload = null;
    this.filename = null;
    // if (this.cardName == "lab_technisain") {
    //   this.templatename = this.Tmplte_LabTechnisianStaff;
    //   this.templatenameDownload = "Tmplte_ImagingTechnisianStaff_download"

    // } else if (this.cardName == "imaging_technisain") {
    //   this.templatename = this.Tmplte_ImagingTechnisianStaff;
    //   this.templatenameDownload = "Tmplte_ImagingTechnisianStaff_download"
    // }
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
                this.censupportservice.lab_technician.staff_details.push(this.uploadResult.good[i])

              }
              else if (this.cardName == "imaging_technisain") {
                this.censupportservice.image_technician.staff_details.push(this.uploadResult.good[i])
              }


              this.modalService.dismissAll();

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
        this.censupportservice.lab_technician.staff_details.push
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
        this.censupportservice.image_technician.staff_details.push
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
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  RemoveLabTechnician(index) {
    this.censupportservice.lab_technician.staff_details.splice(index, 1)
  }

  RemoveImagingStaff(index) {
    this.censupportservice.image_technician.staff_details.splice(index, 1)
  }
  openById = {};
  panelChange(event) {
    this.openById[event.panelId] = event.nextState;
  }
  getSupportLabServiceOutsourceIndex() {

    let index = this.censupportservice.laboratory_services._laboratorty_servc_list.findIndex(x => x.outsource == true)
    return index;


  }
  getTraansfusionLabServiceOutsourceIndex() {
    let index = this.censupportservice.laboratory_services.transfusioin_servc_list.findIndex(x => x.outsource == true)
    return index;
  }
  getDignosticMouOutsourceIndex() {

    let index = this.censupportservice.imaging_service_list.findIndex(x => x.outsource == true)
    return index;

  }
  getDignosticAerbOutsourceIndex() {
    let index = this.censupportservice.imaging_service_list.findIndex(x => x.inhouse == true)
    return index;

  }

  unselect(data) {
    this.censupportservice.list_of_non_clinical_and_administrative_departments.support_servc_list.forEach(itm => {

      if (itm.not_applicable != false) {
        itm.inhouse = false;
        itm.outsource = false;
      }
    })

  }
  unselectNotapplicable(data) {
    this.censupportservice.list_of_non_clinical_and_administrative_departments.support_servc_list.forEach(itm => {

      if (itm.inhouse != false || itm.outsource != false) {
        itm.not_applicable = false;
      }
    })

  }
  unselect1(data) {
    this.censupportservice.list_of_paramedical_allied_services.oushadhashala.forEach(itm => {

      if (itm.not_applicable != false) {
        itm.inhouse = false;
        itm.outsource = false;
      }
    })

  }
  unselectNotapplicable1(data) {
    this.censupportservice.list_of_paramedical_allied_services.oushadhashala.forEach(itm => {

      if (itm.inhouse != false || itm.outsource != false) {
        itm.not_applicable = false;

      }
    })

  }
  unselect2(data) {
    this.censupportservice.list_of_paramedical_allied_services.pathyaahara_vibhaga.forEach(itm => {

      if (itm.not_applicable != false) {
        itm.inhouse = false;
        itm.outsource = false;
      }
    })

  }
  unselectNotapplicable2(data) {
    this.censupportservice.list_of_paramedical_allied_services.pathyaahara_vibhaga.forEach(itm => {

      if (itm.inhouse != false || itm.outsource != false) {
        itm.not_applicable = false;

      }
    })

  }
  unselect3(data) {
    this.censupportservice.list_of_paramedical_allied_services.rehabilitative_services.forEach(itm => {

      if (itm.not_applicable != false) {
        itm.inhouse = false;
        itm.outsource = false;
      }
    })

  }

  unselectNotapplicable3(data) {
    this.censupportservice.list_of_paramedical_allied_services.rehabilitative_services.forEach(itm => {

      if (itm.inhouse != false || itm.outsource != false) {
        itm.not_applicable = false;

      }
    })

  }
}
