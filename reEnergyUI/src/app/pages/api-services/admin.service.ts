import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../model/User.model';


// import { User } from 'src/app/core/models/auth.models';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  public apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }



  saveUserData(usr: User) {
  
  
  return this.http.post<any>(this.apiUrl + "users/AddNewUser", usr);
}
///***Methods Under Use***/



// getAllUserListWithFilters(usrFltr: UserFilter, SearchFrom: DateStruct, SearchTo: DateStruct) {
  
//   let vSearchDate = {
//     from_date: SearchFrom,
//     to_date: SearchTo
//   }
//   usrFltr.searchdate = vSearchDate;
  
//   return this.http.post<UserSearchResponse>(this.apiUrl + "users/getAllUserListWithFilters", usrFltr);
// }



///////////////////////////




} 
