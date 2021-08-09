import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http"

import Swal from 'sweetalert2';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { DropdownData, DropDownService } from 'src/app/pages/api-services/dropdown.service';
import { UserSearchResponse, User, UserFilter } from 'src/app/pages/model/User.model';
import { AdminService } from 'src/app/pages/api-services/admin.service';
import { DateStruct } from 'src/app/pages/model/hospital/SupportService.model';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'user-list-dashboard',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})


export class UserListComponent implements OnInit {

  // emailSentBarChart: ChartType;
  // monthlyEarningChart: ChartType;
  transactions;
  statData;
  rolesList: DropdownData[] = [];
  rolesListTmp: DropdownData[] = [];
  SearchRolesList: DropdownData[] = [];
  SearchTerms: string = "";
  searchTerms: string = "";
  SelectedRole: number = 0;
  limit: number = 10;
  editUser: EditUserCls;
  userSearchResponse: UserSearchResponse = <any>{};
  error = '';
  successmsg = false;
  msg: any;
  @ViewChild('addUserModel', { static: false }) AddUserModel: any;


  // search control rows
  totalCount: number = 0;
  minCount: number = 1;
  maxCount: number = 10;
  skip: number = 0;
  public enties = [25, 50, 100, 200];

  UsrFltr: UserFilter;
  SearchFrom: DateStruct = null;
  SearchTo: DateStruct = null;

  public asrCapacityLst: Array<any> = [
    { id: 1, name: 'Principal Assessor' },
    { id: 2, name: 'Assessor' }
  ];

  UserModalCaption: string = "";
  UserSaveBtnCaption: string = "";

  //rrc
  currentUser: any;
  currUsrRoleId: number = 0;
  //rrc

  searchRole: number = 0;

  SearchStatus: string = null;

  constructor(private modalService: NgbModal, private http: HttpClient, private adminService: AdminService, private dropdownservice: DropDownService, private dtpip: DatePipe) {
  }

  ngOnInit() {

    /**
     * Fetches the data
     */

    //rrc
    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));

    if (this.currentUser) {
      if (this.currentUser.roleId && this.currentUser.roleId > 0)
        this.currUsrRoleId = this.currentUser.roleId;
    }
    //rrc

    this.UsrFltr = new UserFilter();
    this.UserModalCaption = "Add User";
    this.UserSaveBtnCaption = "Add";

    this.UsrFltr.searchtext = "";
    this.UsrFltr.selectedrole = 0;
    this.UsrFltr.searchstatus = null;
    this.SearchFrom = null
    this.SearchTo = null
    this.UsrFltr.limit = 10;
    this.UsrFltr.offset = 0;

    this.fetchData();
    this.getUserData();
    this.getRolesList();
    this.getSearchRolesList()
    this.editUser = new EditUserCls();

  }

  /**
   * Fetches the data
   */
  private fetchData() {

    // this.emailSentBarChart = emailSentBarChart;
    // this.monthlyEarningChart = monthlyEarningChart;
    // this.transactions = transactions;
    // this.statData = statData;
  }

  getUserData() {

    // // old n working
    // this.adminService.getUserList(this.SearchTerms, this.SelectedRole, 0, this.UsrFltr.limit).subscribe(res => {

    //   this.userSearchResponse = res;
    //   console.log(res);

    // }, error => {
    //   console.log(error);
    // });  
    // // old n working

    // old n working

    this.adminService.getAllUserListWithFilters(this.UsrFltr, this.SearchFrom, this.SearchTo).subscribe(res => {


      this.userSearchResponse = res;

      console.log(".. User List ..");
      console.log(res);

    }, error => {

      console.log(error);
    });
    // old n working

  }

  getRolesList() {

    this.dropdownservice.getRoles_UsersCanBeCreatedOnUserMaster().subscribe  // rrc this.dropdownservice.getDropDown().subscribe
      (
        data => {
          //this.rolesList = data;
          this.rolesListTmp = data;

          if (this.currUsrRoleId == 2) // if not SuperAdmin then Remove SuperAdmin role from RoleList
            this.rolesList = this.rolesListTmp.filter(x => x.id != 1).filter(x => x.id != 2).filter(x => x.id != 8);
          else
            this.rolesList = this.rolesListTmp;

          console.log(".. getRolesList() ..");
          console.log(data);
        },
        error => {

        }
      )
  }

  getSearchRolesList() {

    this.dropdownservice.GetAllRoles_forSearch().subscribe  // rrc this.dropdownservice.getAllRoles().subscribe
      (
        data => {
          this.SearchRolesList = data;
          console.log(".. this.SearchRolesList .. ");
          console.log(data);
        },
        error => {

        }
      )
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

  addUser(addUserModel: any) {
    this.UserModalCaption = "Add User";
    this.UserSaveBtnCaption = "Add";

    this.editUser = new EditUserCls();
    this.editUser.roleid = 0;
    this.editUser.isactive = true;
    this.modalService.open(addUserModel, { size: 'lg' });
  }

  Save(userData: User) {

    if (userData.roleid != 5)
      userData.capacity = null;

    var result = this.adminService.saveUser(userData);
    result.subscribe(res => {
      if (res.isSuccess) {
        this.successmsg = true;
        this.msg = res.message;
        this.positionSuccess(this.msg);

        this.getUserData();
        this.modalService.dismissAll(this.addUser);
        this.clearAfterSave();
      } else {
        this.successmsg = false;
        this.msg = "";
        this.error = res.message;
        this.positionError(this.error);
        // this.clearAfterSave();
        // this.modalService.dismissAll(this.addUser);

      }
    }, error => {
      //console.log(error);
      console.log(error);
      this.error = error ? error.message : '';
      this.modalService.dismissAll(this.addUser);
      this.clearAfterSave();
    })
  }


  update(userData: User) {

    if (userData.roleid != 5)
      userData.capacity = null;

    var result = this.adminService.updateUser(userData);
    result.subscribe(res => {
      if (res.isSuccess) {
        this.getUserData();
        this.successmsg = true;
        this.msg = res.message;
        this.positionSuccess(this.msg);

        this.modalService.dismissAll(this.addUser);
        this.editUser = new EditUserCls();
        this.clearAfterSave();
      } else {
        this.successmsg = false;
        this.msg = "";
        this.error = res.message;
        this.positionError(this.error);
        // this.toaster.error(res.message, "Error");
        this.modalService.dismissAll(this.addUser);
        this.clearAfterSave();
        this.editUser = new EditUserCls();

      }
    }, error => {

      console.log(error);
      this.error = error ? error.message : '';
      //console.log(error);
      this.modalService.dismissAll(this.addUser);
      this.clearAfterSave();
      this.editUser = new EditUserCls();
    })
    this.clearAfterSave();
    this.editUser = new EditUserCls();
  }

  Delete(userData: User) {
    if (confirm("Are you sure you want to delete" + userData.firstname)) {
      var result = this.adminService.deleteUser(userData.id);
      result.subscribe(res => {
        if (res.isSuccess) {
          let index = this.userSearchResponse.rows.findIndex(d => d.id === userData.id); //find index in your array
          this.userSearchResponse.rows.splice(index, 1);
          this.successmsg = true;
          this.msg = res.message;
          this.positionSuccess(this.msg);
        } else {
          this.successmsg = false;
          this.msg = "";
          this.error = res.message;
          this.positionError(this.error);
        }
      }, error => {
        console.log(error);
        this.error = error ? error.message : '';
      })
    }

  }

  Edit(data) {
    this.UserModalCaption = "Edit User";
    this.UserSaveBtnCaption = "Update";

    this.editUser = Object.assign({}, data);
    this.modalService.open(this.AddUserModel, { size: 'lg' });

  }

  canSave(usr) {
    let msg: string = "";
    let ret: boolean = true;

    if (usr != null) {
      if (usr.firstname == null || usr.firstname == undefined || (usr.firstname != null && usr.firstname.trim().length <= 0))
        msg = "First name";
      if (usr.email == null || usr.email == undefined || (usr.email != null && usr.email.trim().length <= 0))
        msg += ", Email";
      if (usr.mobile == null || usr.mobile == undefined || (usr.mobile != null && usr.mobile.trim().length <= 0))
        msg += ", Mobile";
      if (usr.roleid == null || usr.roleid == "null" || usr.roleid == undefined || (usr.roleid != null && usr.roleid <= 0))
        msg += ", Role";
    }

    if (msg.trim().length > 0) {
      msg = "Required fields :- " + msg;
      ret = false;
      this.positionError(msg);
    }

    return ret;
  }

  Action(User) {

    if (User == null || User == undefined || (User != null && User.id <= 0)) {
      this.positionError("Nothing to be saved !!");
      return;
    }

    if (this.canSave(User) != true)
      return;

    if (User.id > 0) {
      this.update(User);
    }
    else {

      this.Save(User);
    }
  }

  clearAfterSave() {
    this.editUser.email = "";
    this.editUser.firstname = "";
    this.editUser.lastname = "";
    this.editUser.mobile = "";
    // this.editUser.roleid = null;
    this.editUser.roleid = 0;

  }


  ////#region rrc Search control row

  searchReset() {
    this.UsrFltr = new UserFilter();

    this.UsrFltr.searchtext = "";
    this.UsrFltr.selectedrole = 0;
    this.UsrFltr.searchstatus = null;

    this.SearchFrom = null
    this.SearchTo = null
    this.UsrFltr.limit = 10;
    this.UsrFltr.offset = 0;
    this.UsrFltr.sort = "";

    this.getUserData();
  }

  pageChanged(pageNo) {

    this.minCount = 1 + (this.UsrFltr.limit * (pageNo - 1));
    this.maxCount = this.UsrFltr.limit + (this.UsrFltr.limit * (pageNo - 1));

    if (this.totalCount < this.maxCount)
      this.maxCount = this.totalCount;

    this.skip = ((pageNo - 1) * this.UsrFltr.limit);
    this.UsrFltr.offset = this.skip;

    this.adminService.getAllUserListWithFilters(this.UsrFltr, this.SearchFrom, this.SearchTo).subscribe(res => {
      this.userSearchResponse = res;

      console.log(".. on Page changed ..");
      console.log(res);

    }, error => {
      console.log(error);
    });

  }

  showEnteries() {
    this.skip = 0;
    this.UsrFltr.offset = this.skip;
    this.getUserData();
  }

  ////#endregion

  isCtrlValid(ctrl) {
    let ret: boolean = false;

    if (ctrl) {
      if (ctrl.errors)
        ret = true;
    }

    return ret;
  }

  ctrlHasError_fn(ctrl) {
    return this.isCtrlValid(ctrl);
  }
  ctrlHasError_email(ctrl) {
    return this.isCtrlValid(ctrl);
  }
  ctrlHasError_mobile(ctrl) {
    return this.isCtrlValid(ctrl);
  }
  ctrlHasError_role(role) {
    if (role == null || role == "null" || role == undefined || (role != null && role <= 0))
      return true;
    else
      return false;
  }


  exportData() {
    let latest_date = this.dtpip.transform(new Date(), 'dd-MMM-yyyy');
    console.log(".. latest_date .. " + latest_date);

    var d = "User Data ";

    var item = d + latest_date + ".xlsx";

    this.SearchTerms = this.UsrFltr.searchtext;
    this.searchRole = this.UsrFltr.selectedrole;
    this.SearchStatus = this.UsrFltr.searchstatus;

    this.adminService.exporUserList(this.SearchTerms, this.searchRole, this.SearchStatus, this.SearchFrom, this.SearchTo).subscribe(
      (response) => {
        console.log(response);
        var blob = new Blob([response], {});
        saveAs(blob, item);

      },
      e => { (e); }
    );
  }
} // ends export



class EditUserCls {

  id: number;
  roleid: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  userpassword: string;
  isactive: boolean;
  notes: string
  otplogid: number;
  isFirstTimeLogin: true;
  creationdatems: number;
  rolename: string;
  fullname: string;
  capacity: number;
}

