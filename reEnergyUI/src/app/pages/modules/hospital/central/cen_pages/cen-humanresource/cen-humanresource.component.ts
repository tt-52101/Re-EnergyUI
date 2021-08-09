import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { cenHospitalPages, cenHospitalPagesQuestionBank } from 'src/app/pages/model/center/cenHospitalPages.model';
import { CenHumanResource } from 'src/app/pages/model/center/CenHumanResource.model';
import { NgForm } from '@angular/forms';
import { cenHospitalDataShareService } from '../../cendatashareservice/cenhospitalDataShare.service';
import { StaffDetails } from 'src/app/pages/model/hospital/humanResource.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import { FileViewOrDelete } from 'src/app/pages/model/FileViewOrDelete.model';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import Swal from 'sweetalert2';
import { HospitalDataShareService } from '../../../hospital/datashareservice/hospitalDataShare.service';

@Component({
  selector: 'app-cen-humanresource',
  templateUrl: './cen-humanresource.component.html',
  styleUrls: ['./cen-humanresource.component.scss', '../../central.component.scss']
})
export class CenHumanresourceComponent implements OnInit {


  cenhospitalPages: cenHospitalPages;
  cenhospitalPagesQueBank: cenHospitalPagesQuestionBank;
  cenhumanresource: CenHumanResource;
  public currentObj: any;
  public propertyname: any;
  public selectedFile: any;
  cenhumanresourceformSubmitted = false;
  ary_uploadedDocs: FileViewOrDelete[] = new Array();
  @Output() deleteFile = new EventEmitter();
  @ViewChild('centerHumanresourceForm', { static: false }) cenHumanresourceForm: NgForm;
  actiontype: string = null;
  currentindex_toedit: number;
  public staffdetatlsmodal: StaffDetails = new StaffDetails();
  public staffModelHeading = "";

  uploadResult: any = { bad: [], isSuccess: true };
  public cardName: string;
  fileToUpload: any;
  filename: string = "";
  excelMgs = "";

  public Tmplte_DoctorStaff = "../../../../../../../assets/excel_upload_doc/Template_Doctors.xlsx";
  public Tmplte_NursePancharikaStaff = "../../../../../../../assets/excel_upload_doc/Template_Nurses_or_Paricharikas.xlsx";
  public Tmplte_ParamedicAdminStaff = "../../../../../../../assets/excel_upload_doc/Template_Paramedical_Staff.xlsx";
  public Tmplte_TherapistStaff = "../../../../../../../assets/excel_upload_doc/Template_AYUSH_Therapist.xlsx";


  // public Tmplte_DoctorStaff = "../../../../../../../assets/excel_upload_doc/Doctor.xlsx";
  // public Tmplte_NursePancharikaStaff = "../../../../../../../assets/excel_upload_doc/Nurse_Pancharika_Staff.xlsx";
  // public Tmplte_ParamedicAdminStaff = "../../../../../../../assets/excel_upload_doc/Paramedic_Admin_Staff.xlsx";

  public templatename: string = "";
  public templatenameDownload: string = "";
  Stage_id: number;
  @Output() openNcModelTabControl = new EventEmitter();
  ncFormTabInfo: any;
  stageId: number;
  @ViewChild('documentuploadModel', { static: false }) documentuploadModel: any;

  showUploadMsg: boolean | null;
  currentUser: any;
  currUsrRole: any;
  checklength: number;
  hidebtns = false;
  constructor(private cenhospdataserv: cenHospitalDataShareService, private hospdataserv: HospitalDataShareService, private modalService: NgbModal, private uploadService: FileUploadService, private tostr: CustomTosterServiceService) {
    this.cenhospitalPages = new cenHospitalPages();
    this.cenhospitalPagesQueBank = new cenHospitalPagesQuestionBank();
    this.cenhumanresource = new CenHumanResource();
    const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.currentUser = currentUser;
    this.currUsrRole = this.currentUser.roleId;
    this.cenhospdataserv.currentStage.subscribe(data => {

      this.Stage_id = data
    });
    this.cenhospdataserv.ncFormTabInfo.subscribe(value => {
      this.ncFormTabInfo = value;
    })


    this.cenhospdataserv.getData().subscribe(data => {

      if (data != null || data != undefined) {

        this.cenhospitalPages = data;
        this.cenhumanresource = this.cenhospitalPages.cenhumanresource;



        if (this.cenhumanresource.group_list.length == 0) {
          this.cenhumanresource.group_list = [

            { group: 'Managerial', number: null, remark: null },
            // {group:'Resident Doctors',number:null,remark:null},
            { group: 'Consultant - Full Time', number: null, remark: null },
            { group: 'Consultant - Part Time', number: null, remark: null },
            { group: 'Consultant - Visiting', number: null, remark: null },
            { group: 'Nurses/Paricharikas', number: null, remark: null },
            // {group:'Paricharikas',number:null,remark:null},
            { group: 'AYUSH Therapist - Male', number: null, remark: null },
            { group: 'AYUSH Therapist - Female', number: null, remark: null },
            { group: 'Technicians', number: null, remark: null },
            { group: 'Paramedical Staff', number: null, remark: null },
            { group: 'Housekeeping Staff', number: null, remark: null },
            { group: 'Security Staff', number: null, remark: null },

          ]

        }

        this.checklength = this.cenhumanresource.group_list.length;

      }



    });

    this.cenhospdataserv.getQuestionBankData().subscribe(data => {

      if (data != null || data != undefined) {

        this.cenhospitalPagesQueBank = data;



      }


    });
    this.cenhospdataserv.getFormSubmissionStatus().subscribe(data => {

      if (data != null || data != undefined) {


        this.cenhumanresourceformSubmitted = data;


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

  addStaff(addStaffModel, modalhead) {

    this.actiontype = "Save";
    this.staffModelHeading = modalhead.trim();
    this.staffdetatlsmodal = new StaffDetails();
    this.modalService.open(addStaffModel, { size: 'lg' });




  }



  addStaffData() {

    if (this.actiontype.trim().toLowerCase() == "edit") {
      // if(this.staffModelHeading=="Doctor")
      // {
      //   this.cenhumanresource.doctors_along_with_qualification_specialisation.doctor_details[this.currentindex_toedit]=

      //     {
      //       staff_name: this.staffdetatlsmodal.staff_name,
      //       designation: this.staffdetatlsmodal.designation,
      //       qualification: this.staffdetatlsmodal.qualification,
      //       expirience: this.staffdetatlsmodal.expirience,
      //       council_of_reg: this.staffdetatlsmodal.council_of_reg,
      //       registrataion_no: this.staffdetatlsmodal.registrataion_no,
      //       dept_of_working: this.staffdetatlsmodal.dept_of_working,
      //       date_of_join: this.staffdetatlsmodal.date_of_join
      //     };
      // }
      // else if(this.staffModelHeading=="Nurses")
      // {
      //   this.cenhumanresource.list_of_all_the_nurses.staff_details[this.currentindex_toedit]=

      //     {

      //       staff_name: this.staffdetatlsmodal.dooctor_name,
      //       designation: this.staffdetatlsmodal.designation,
      //       qualification: this.staffdetatlsmodal.qualification,
      //       expirience: this.staffdetatlsmodal.expirience,
      //       council_of_reg: this.staffdetatlsmodal.council_of_reg,
      //       registrataion_no: this.staffdetatlsmodal.registrataion_no,
      //       dept_of_working: this.staffdetatlsmodal.dept_of_working,
      //       date_of_join: this.staffdetatlsmodal.date_of_join


      //     }


      // }
      // else if(this.staffModelHeading=="Paricharika/Therapist")
      // {
      //   this.cenhumanresource.list_of_paricharika_therapist.staff_details[this.currentindex_toedit]=

      //     {

      //       staff_name: this.staffdetatlsmodal.dooctor_name,
      //       designation: this.staffdetatlsmodal.designation,
      //       qualification: this.staffdetatlsmodal.qualification,
      //       expirience: this.staffdetatlsmodal.expirience,
      //       council_of_reg: this.staffdetatlsmodal.council_of_reg,
      //       registrataion_no: this.staffdetatlsmodal.registrataion_no,
      //       dept_of_working: this.staffdetatlsmodal.dept_of_working,
      //       date_of_join: this.staffdetatlsmodal.date_of_join

      //     }


      // }
      // else if(this.staffModelHeading=="Administrative and Support Staff")
      // {
      //   this.cenhumanresource.administrative_and_support_staff.staff_details[this.currentindex_toedit]=

      //     {

      //       staff_name: this.staffdetatlsmodal.dooctor_name,
      //       designation: this.staffdetatlsmodal.designation,
      //       qualification: this.staffdetatlsmodal.qualification,
      //       expirience: this.staffdetatlsmodal.expirience,
      //       council_of_reg: this.staffdetatlsmodal.council_of_reg,
      //       registrataion_no: this.staffdetatlsmodal.registrataion_no,
      //       dept_of_working: this.staffdetatlsmodal.dept_of_working,
      //       date_of_join: this.staffdetatlsmodal.date_of_join

      //     }


      // }
      // else if(this.staffModelHeading=="Paramedic Staff")
      // {
      //   this.cenhumanresource.list_of_all_the_paramedic_staff.staff_details[this.currentindex_toedit]=

      //     {
      //       staff_name:  this.staffdetatlsmodal.dooctor_name,
      //       designation: this.staffdetatlsmodal.designation,
      //       qualification: this.staffdetatlsmodal.qualification,
      //       expirience:  this.staffdetatlsmodal.expirience,
      //       dept_of_working: this.staffdetatlsmodal.dept_of_working,
      //       date_of_join:  this.staffdetatlsmodal.date_of_join,
      //       council_of_reg: this.staffdetatlsmodal.council_of_reg,
      //       registrataion_no: this.staffdetatlsmodal.registrataion_no,
      //     }

      // }
    }
    else {
      if (this.staffModelHeading == "Doctor") {
        this.cenhumanresource.doctors_along_with_qualification_specialisation.doctor_details.push(

          {
            staff_name: this.staffdetatlsmodal.staff_name,
            designation: this.staffdetatlsmodal.designation,
            qualification: this.staffdetatlsmodal.qualification,
            expirience: this.staffdetatlsmodal.expirience,
            council_of_reg: this.staffdetatlsmodal.council_of_reg,
            registrataion_no: this.staffdetatlsmodal.registrataion_no,
            dept_of_working: this.staffdetatlsmodal.dept_of_working,
            date_of_join: this.staffdetatlsmodal.date_of_join,
            certific_body: null,
            specialization: this.staffdetatlsmodal.specialization,
            type: this.staffdetatlsmodal.type,
            adhar: this.staffdetatlsmodal.adhar,
            pan: this.staffdetatlsmodal.pan,
          });
      }
      else if (this.staffModelHeading == "Nurses") {
        this.cenhumanresource.list_of_all_the_nurses.staff_details.push
          (
            {

              staff_name: this.staffdetatlsmodal.staff_name,
              designation: this.staffdetatlsmodal.designation,
              qualification: this.staffdetatlsmodal.qualification,
              expirience: this.staffdetatlsmodal.expirience,
              council_of_reg: this.staffdetatlsmodal.council_of_reg,
              registrataion_no: this.staffdetatlsmodal.registrataion_no,
              dept_of_working: this.staffdetatlsmodal.dept_of_working,
              date_of_join: this.staffdetatlsmodal.date_of_join,
              certific_body: this.staffdetatlsmodal.certific_body,
              specialization: null,
              type: null,
              adhar: this.staffdetatlsmodal.adhar,
              pan: this.staffdetatlsmodal.pan,


            }
          );

      }
      else if (this.staffModelHeading == "Paricharika/Therapist") {
        this.cenhumanresource.list_of_paricharika_therapist.staff_details.push
          (
            {

              staff_name: this.staffdetatlsmodal.staff_name,
              designation: this.staffdetatlsmodal.designation,
              qualification: this.staffdetatlsmodal.qualification,
              expirience: this.staffdetatlsmodal.expirience,
              council_of_reg: this.staffdetatlsmodal.council_of_reg,
              registrataion_no: this.staffdetatlsmodal.registrataion_no,
              dept_of_working: this.staffdetatlsmodal.dept_of_working,
              date_of_join: this.staffdetatlsmodal.date_of_join,
              certific_body: this.staffdetatlsmodal.certific_body,
              specialization: null,
              type: null,
              adhar: null,
              pan: null,

            }
          );

      }
      else if (this.staffModelHeading == "Administrative and Support Staff") {
        this.cenhumanresource.administrative_and_support_staff.staff_details.push
          (
            {

              staff_name: this.staffdetatlsmodal.staff_name,
              designation: this.staffdetatlsmodal.designation,
              qualification: this.staffdetatlsmodal.qualification,
              expirience: this.staffdetatlsmodal.expirience,
              council_of_reg: this.staffdetatlsmodal.council_of_reg,
              registrataion_no: this.staffdetatlsmodal.registrataion_no,
              dept_of_working: this.staffdetatlsmodal.dept_of_working,
              date_of_join: this.staffdetatlsmodal.date_of_join,
              certific_body: null,
              specialization: null,
              type: null,
              adhar: null,
              pan: null,

            }
          )

      }
      else if (this.staffModelHeading == "Paramedic Staff") {
        this.cenhumanresource.list_of_all_the_paramedic_staff.staff_details.push
          (
            {
              staff_name: this.staffdetatlsmodal.staff_name,
              designation: this.staffdetatlsmodal.designation,
              qualification: this.staffdetatlsmodal.qualification,
              expirience: this.staffdetatlsmodal.expirience,
              dept_of_working: this.staffdetatlsmodal.dept_of_working,
              date_of_join: this.staffdetatlsmodal.date_of_join,
              council_of_reg: this.staffdetatlsmodal.council_of_reg,
              registrataion_no: this.staffdetatlsmodal.registrataion_no,
              certific_body: null,
              specialization: null,
              type: null,
              adhar: null,
              pan: null,
            }
          )
      }
    }

    this.modalService.dismissAll();

  }

  // editDoctorStaff(addStaffModel,modalhead,item:DoctorDetails,index)
  // {

  //   this.actiontype="Edit";
  //   this.currentindex_toedit=index;
  //   this.staffModelHeading=modalhead.trim();
  //      this.staffdetatlsmodal={

  //       dooctor_name :item.dooctor_name,
  //     designation :item.designation,
  //     qualification:item.qualification,
  //     expirience :item.expirience,
  //     council_of_reg:item.council_of_reg,
  //     registrataion_no :item.registrataion_no,
  //     dept_of_working :item.dept_of_working,
  //     date_of_join :item.date_of_join
  //      }
  //      this.modalService.open(addStaffModel, { size: 'lg' });

  // }
  editStaff(addStaffModel, modalhead, item: StaffDetails, index) {
    this.actiontype = "Edit";
    this.currentindex_toedit = index;
    this.staffModelHeading = modalhead.trim();
    this.staffdetatlsmodal = item
    this.modalService.open(addStaffModel, { size: 'lg' });

  }


  RemoveDoctor(index) {
    this.cenhumanresource.doctors_along_with_qualification_specialisation.doctor_details.splice(index, 1)

  }

  RemoveNurse(index) {
    this.cenhumanresource.list_of_all_the_nurses.staff_details.splice(index, 1)
  }

  RemoveTherapist(index) {
    this.cenhumanresource.list_of_paricharika_therapist.staff_details.splice(index, 1)
  }


  RemoveParamedicStaff(index) {
    this.cenhumanresource.list_of_all_the_paramedic_staff.staff_details.splice(index, 1)
  }

  RemoveSupportStaff(index) {
    this.cenhumanresource.administrative_and_support_staff.staff_details.splice(index, 1)
  }
  RemoveParicharikaStaff(index) {
    this.cenhumanresource.list_of_paricharika_therapist.staff_details.splice(index, 1)
  }
  AddMoreGroup() {
    this.cenhumanresource.group_list.push(
      { group: null, number: null, remark: null },
    )

  }
  RemoveGroup(itm) {

    this.cenhumanresource.group_list = this.cenhumanresource.group_list.filter(obj => obj != itm)


  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  openFileUpload(item, uploadExcelModel) {

    this.modalService.open(uploadExcelModel, { size: 'md' });
    this.uploadResult = { bad: [], isSuccess: true };
    this.uploadResult = { good: [], isSuccess: true };
    this.cardName = item;
    this.fileToUpload = null;
    this.filename = null;
    // if (this.cardName == "doctors_staff") {
    //   this.templatename = this.Tmplte_DoctorStaff;
    //   this.templatenameDownload = "TmplteDoctor_dwnld"

    // } else if (this.cardName == "nurse_staff") {
    //   this.templatename = this.Tmplte_NursePancharikaStaff;
    //   this.templatenameDownload = "TmplteNurse_dwnld"
    // }
    // else if (this.cardName == "paricharika_staff_central_hosp") {
    //   this.templatename = this.Tmplte_NursePancharikaStaff;
    //   this.templatenameDownload = "TmpltePancharika_dwnld"
    // }
    // else if (this.cardName == "paramedic_staff") {
    //   this.templatename = this.Tmplte_ParamedicAdminStaff;
    //   this.templatenameDownload = "TmplteParamedic_dwnld"
    // }
    // else if (this.cardName == "admin_staff") {
    //   this.templatename = this.Tmplte_ParamedicAdminStaff;
    //   this.templatenameDownload = "TmplteAdmin_dwnld"
    // }
    // else if (this.cardName == "admin_staff") {
    //   this.templatename = this.Tmplte_ParamedicAdminStaff;
    //   this.templatenameDownload = "TmplteAdmin_dwnld"
    // }

    if (this.cardName == "doctors_staff") {
      this.templatename = this.Tmplte_DoctorStaff;
      this.templatenameDownload = "Template Doctors"

    } else if (this.cardName == "nurse_staff") {
      this.templatename = this.Tmplte_NursePancharikaStaff;
      this.templatenameDownload = "Template Nurses or Paricharikas"
    }
    else if (this.cardName == "paricharika_staff_central_hosp") {
      this.templatename = this.Tmplte_TherapistStaff;
      this.templatenameDownload = "Template AYUSH Therapist"
    }
    else if (this.cardName == "paramedic_staff") {
      this.templatename = this.Tmplte_ParamedicAdminStaff;
      this.templatenameDownload = "Template Paramedical Staff"
    }
    else if (this.cardName == "admin_staff") {
      this.templatename = this.Tmplte_ParamedicAdminStaff;
      this.templatenameDownload = "Template Administrative and Support Staff"
    }
    else if (this.cardName == "admin_staff") {
      this.templatename = this.Tmplte_ParamedicAdminStaff;
      this.templatenameDownload = "Template Administrative and Support Staff"
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


              if (this.cardName == "doctors_staff") {

                this.cenhumanresource.doctors_along_with_qualification_specialisation.doctor_details.push(this.uploadResult.good[i])
              }
              if (this.cardName == "nurse_staff") {
                this.cenhumanresource.list_of_all_the_nurses.staff_details.push(this.uploadResult.good[i])
              }
              if (this.cardName == "paricharika_staff_central_hosp") {
                this.cenhumanresource.list_of_paricharika_therapist.staff_details.push(this.uploadResult.good[i])
              }
              if (this.cardName == "paramedic_staff") {
                this.cenhumanresource.list_of_all_the_paramedic_staff.staff_details.push(this.uploadResult.good[i])
              }
              if (this.cardName == "admin_staff") {
                this.cenhumanresource.administrative_and_support_staff.staff_details.push(this.uploadResult.good[i])
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
    //console.log('Excel file input has changed. The file is', fileItem)
    this.fileToUpload = fileItem
    this.filename = this.fileToUpload.name;

  }

}
