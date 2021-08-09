import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DaNcbtnColorPipe'
})
export class DaNcbtnColorPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    let currentRole = currentUser.roleId;
    
    if (value == null || value == "" || value == undefined) {
      return {
        'btn': true,
        'btn-sm': true,
        'btn-info': true,
        'waves-effect': true,
        'waves-light': true,
        'display': currentRole == 3 ? true : false,
      }
    }
    // class="btn btn-sm btn-danger waves-effect waves-light"
    let clsApply = {
      'btn': true,
      'btn-sm': true,
      'waves-effect': true,
      'waves-light': true,
      'btn-danger': value.ncstage == 1 ? true : false,
      'btn-warning': value.ncstage == 2 ? true : false,
      'btn-success': value.ncstage == 3 ? true : false,
    }

    return clsApply;


  }

}
