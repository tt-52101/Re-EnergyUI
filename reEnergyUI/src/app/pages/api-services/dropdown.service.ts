import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
// import { QualificationItem } from '../model/Assessor.model';


@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  public apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  //***Method Under Use */

  getDropDownData(value): Observable<Dropdown[]> {
    return this.http.get<Dropdown[]>(this.apiUrl + "unauthorized/getDropdownData?dropdownValue="+value);
  }




  ///////////////////////

  // getQualificationlistList(): Observable<QualificationItem[]> {
  //   return this.http.get<QualificationItem[]>(this.apiUrl + "unauthorized/getAllEducationQualifications");
  // }
  getDropDown(): Observable<DropdownData[]> {
    return this.http.get<DropdownData[]>(this.apiUrl + "unauthorized/dropdownlist");
  }

  getRoles_UsersCanBeCreatedOnUserMaster(): Observable<DropdownData[]> {
    return this.http.get<DropdownData[]>(this.apiUrl + "unauthorized/getRoles_UsersCanBeCreatedOnUserMaster");
  }

  //// #region rrc
  getAllRoles(): Observable<DropdownData[]> {
    return this.http.get<DropdownData[]>(this.apiUrl + "unauthorized/getAllRoles");
  }

  GetAllRoles_forSearch(): Observable<DropdownData[]> {
    return this.http.get<DropdownData[]>(this.apiUrl + "unauthorized/GetAllRoles_forSearch");
  }

  ////#endregion


}
export class DropdownData {
  id: number;
  value: string

}


export class Dropdown
{

  value:string
  text:number

}