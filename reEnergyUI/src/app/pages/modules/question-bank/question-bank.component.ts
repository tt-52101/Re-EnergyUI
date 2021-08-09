import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http"

import Swal from 'sweetalert2';
import { DropdownData, DropDownService } from 'src/app/pages/api-services/dropdown.service';
import { UserSearchResponse, User } from 'src/app/pages/model/User.model';
import { AdminService } from 'src/app/pages/api-services/admin.service';

import { AuthenticationService } from '../../../core/services/auth.service';

@Component({
  selector: 'question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})

/**
 * Dashboard component
 */
export class QuestionBankComponent implements OnInit {

  // emailSentBarChart: ChartType;
  // monthlyEarningChart: ChartType;
  transactions;
  statData;
  rolesList: DropdownData[] = [];
  SearchTerms: string = "";
  SelectedRole: number = 0;
  limit: number = 200;
  editUser: EditUserCls;
  userSearchResponse: UserSearchResponse = <any>{};
  error = '';
  successmsg = false;
  msg: any;
  standradcode = new Array<StandardCode>();
  hospitalQuesBankResponse: HospitalQuesBankResponse;
  hospitalSection = new Array<HospitalSection>();
  @ViewChild('addUserModel', { static: false }) AddUserModel: any;

  offset: number;
  section_id: number;
  modelheading: string = "";

  constructor(private modalService: NgbModal, private http: HttpClient, private adminService: AdminService, private dropdownservice: DropDownService, private auth: AuthenticationService) {
  }

  ngOnInit() {

    /**
     * Fetches the data
     */
    this.hospitalQuesBankResponse = new HospitalQuesBankResponse();
    this.getstandradcodeData();
    this.editUser = new EditUserCls();

  }

  /**
   * Fetches the data
   */
  private fetchData() {
   
  }

  public getstandradcodeData() {

    this.http.get<any>(this.auth.apiUrl + "questionBank/standradcode").subscribe(res => {
      ;
      this.standradcode = res;
      console.log(res);
      this.geHospitalQuestionBankData();
    }, error => {
      console.log(error);
    });

  }


  private getSectionData() {
    this.http.get<any>(this.auth.apiUrl + "questionBank/sectionName").subscribe(res => {
      this.hospitalSection = res;
      console.log(res);
    }, error => {
      console.log(error);
    });

  }



  public geHospitalQuestionBankData() {
    // http://localhost:59514/api/questionBank/hospitalQuestionBank?offset=0&limit=1&section_id=1
    this.http.get<any>(this.auth.apiUrl + "questionBank/hospitalQuestionBank?offset=" + this.offset + "&limit=" + this.limit + "&section_id=" + this.section_id).subscribe(res => {
      ;
      this.hospitalQuesBankResponse = res;
      console.log(res);
      this.getSectionData();
    }, error => {
      console.log(error);
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

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  addQuestion(addUserModel: any) {
    this.modelheading = "Add Question Bank";
    this.editUser = new EditUserCls();
    this.modalService.open(addUserModel, { size: 'lg' });

  }



  Save(queBankData: HospitalQuesBank) {

    this.http.post<any>(this.auth.apiUrl + "questionBank/addQuestionBank", queBankData)
      .subscribe(res => {
        if (res.isSuccess) {
          this.successmsg = true;
          this.msg = res.message;
          this.positionSuccess(this.msg);

          this.getstandradcodeData();
          // this.toaster.success(res.message, "Success");
          this.modalService.dismissAll(this.addQuestion);
          this.clearAfterSave();
        } else {
          this.successmsg = false;
          this.msg = "";
          this.error = res.message;
          this.positionError(this.error);
          this.clearAfterSave();
          // this.toaster.error(res.message, "Error");
          this.modalService.dismissAll(this.addQuestion);

        }
      }, error => {
        //console.log(error);
        console.log(error);
        this.error = error ? error.message : '';
        this.modalService.dismissAll(this.addQuestion);
        this.clearAfterSave();
      })
  }


  update(queBankData: HospitalQuesBank) {

    this.http.put<any>(this.auth.apiUrl + "questionBank/updateQuestionBank", queBankData)
      .subscribe(res => {
        if (res.isSuccess) {
          this.getstandradcodeData();
          this.successmsg = true;
          this.msg = res.message;
          this.positionSuccess(this.msg);
          // this.toaster.success(res.message, "Success");
          // this.addUserModal.hide();

          this.modalService.dismissAll(this.addQuestion);
          this.editUser = new EditUserCls();
          this.clearAfterSave();
        } else {
          this.successmsg = false;
          this.msg = "";
          this.error = res.message;
          this.positionError(this.error);
          // this.toaster.error(res.message, "Error");
          this.modalService.dismissAll(this.addQuestion);
          this.clearAfterSave();
          this.editUser = new EditUserCls();

        }
      }, error => {

        console.log(error);
        this.error = error ? error.message : '';
        //console.log(error);
        this.modalService.dismissAll(this.addQuestion);
        this.clearAfterSave();
        this.editUser = new EditUserCls();
      })
    this.clearAfterSave();
    this.editUser = new EditUserCls();
  }

  // Delete(userData: User) {
  //   if (confirm("Are you sure you want to delete" + userData.firstname)) {
  //     var result = this.adminService.deleteUser(userData.id);
  //     result.subscribe(res => {
  //       if (res.isSuccess) {
  //         let index = this.userSearchResponse.rows.findIndex(d => d.id === userData.id); //find index in your array
  //         this.userSearchResponse.rows.splice(index, 1);
  //         this.successmsg = true;
  //         this.msg = res.message;
  //         this.positionSuccess(this.msg);
  //       } else {
  //         this.successmsg = false;
  //         this.msg = "";
  //         this.error = res.message;
  //         this.positionError(this.error);
  //       }
  //     }, error => {
  //       console.log(error);
  //       this.error = error ? error.message : '';
  //     })
  //   }

  // }

  Edit(data) {
    this.modelheading = "Update Question Bank";
    this.editUser = Object.assign({}, data);
    this.modalService.open(this.AddUserModel, { size: 'lg' });

  }
  Action(User) {
    if (User.id > 0) {
      this.update(User);
    }
    else {

      this.Save(User);
    }
  }

  clearAfterSave() {
    // this.editUser.email = "";
    // this.editUser.firstname = "";
    // this.editUser.lastname = "";
    // this.editUser.mobile = "";
    // this.editUser.roleid = null;


  }


}




class EditUserCls {

  id: number;
  section_id: number;
  ques_stndrd_code: number;
  ques_text: string;
  ques_help_text: string;
  section_name: string;
  question_property: string;
}


class StandardCode {
  id: number;
  organization_type: string;
  stndrcode: string;
  code: string;
  standards: string;
  objctve_no: string;
  objctve_elmnt: string;
  code_id: number;
}

class HospitalQuesBankResponse {
  total: number;
  current: number;
  queList = new Array<HospitalQuesBank>();
}

class HospitalQuesBank {
  id: number;
  section_id: number;
  ques_stndrd_code: number;
  ques_text: string;
  ques_help_text: string;
  section_name: string;
  stndrd_code_text: string;
  question_property: string;
}

class HospitalSection {
  id: number;
  section_id: number;
  section_name: string;
}