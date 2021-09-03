import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/pages/api-services/admin.service';
import { CommonService } from 'src/app/pages/api-services/common.service';
import { Dropdown, DropDownService } from 'src/app/pages/api-services/dropdown.service';
import { User } from 'src/app/pages/model/User.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('addUserModel', { static: false }) AddUserModel: any;
  error = '';
  successmsg = false;
  msg: any;
  userModel:User
  userRoleDropdown:Array<Dropdown>
  searchRole=null;
  selectRole=null;
  public enties = [25, 50, 100, 200];
  skip: number = 0;
  dummy_data=[
    {userid:'R000001',username:'Mayra@gmail.com',role:'Admin',status:'Active',creationdate:'1-Aug-2021'},
    {userid:'R000002',username:'Jaoh@and.com',role:'ReEnergy Trainer',status:'Active',creationdate:'1-Aug-2021'},
  ]
  constructor(private modalService: NgbModal,private dropdownservice: DropDownService,private adminSrvc:AdminService,private dataservc:CommonService) 
  {
    this.userRoleDropdown=new Array<Dropdown>();
    this.userModel=new User();
    this.userModel.roleid=null;
    this.userModel.isactive=true;
  }

  ngOnInit(): void 
  {

     this.getDropdownList();

  }

  getDropdownList()
  {
this.dropdownservice.getDropDownData(1).subscribe(value=>
  {

    this.userRoleDropdown=value;
  },error=>
  {

  })


  }
  adduser(AdduserModel){
    this.modalService.open(AdduserModel, { size: 'lg' });

  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  saveUserData()
  {

this.adminSrvc.saveUserData(this.userModel).subscribe(res=>
  {

    this.dataservc.setLoaderStatus(true);
    
      if (res.isSuccess) {
        this.successmsg = true;
        this.msg = res.message;
        this.positionSuccess(this.msg);
        this.dataservc.setLoaderStatus(false);
       // this.getUserData();
        this.modalService.dismissAll(this.adduser);
        this.resetForm();
      } else {
        this.successmsg = false;
        this.msg = "";
        this.error = res.message;
        this.positionError(this.error);
        this.dataservc.setLoaderStatus(false);
        

      }
   

  },error=>
  {
    
  })
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
  resetForm()
  {
    this.userModel.email=null;
    this.userModel.firstname=null;
    this.userModel.lastname=null;
    this.userModel.mobile=null;
    this.userModel.roleid=null;
    this.userModel.isactive=true;
  }

 


}
