import { Pipe, PipeTransform } from '@angular/core';
import { HospitalDataShareService } from '../pages/modules/hospital/hospital/datashareservice/hospitalDataShare.service';

@Pipe({
  name: 'DaNcBtnCountShow'
})
export class DaNcBtnHideShowPipe implements PipeTransform {
  stageId: number;
  currentUser: any;
  currUsrRole: number;
  transform(value: any, args: any): any {

    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.currUsrRole = this.currentUser.roleId;

    if (args != null || args != '') {
      this.stageId = args;
    }
    // if(this.stageId=121)
    // {
    //   //debugger
    // }

    if (value == null || value == "" || value == undefined) {
      return (this.currUsrRole == 2 || this.currUsrRole == 3 || this.currUsrRole == 1) ? false : (this.currUsrRole == 5 && (this.stageId == 60 || this.stageId == 80 || this.stageId == 88)) ? false : true;
    } else {

      return true;
      //  return (this.currUsrRole == 2 && (this.stageId == 40 || this.stageId == 60 || this.stageId == 80 || this.stageId == 88)) ? true : false
    }

  }

}
