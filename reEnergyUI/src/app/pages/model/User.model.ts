

export class UserSearchResponse {
  total: number;
  rowCount: number;
  current: number;
  rows = new Array<User>();
}

export class User {
  id: number;
  roleid: number;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  mobile: string;
  userpassword: string;
  isactive: boolean;
  creationdate: string;
  rolename: string;
 

}

////#region rrc

export class UserFilter {
  limit: number;
  offset: number;
  sort: string;
  searchtext: string;
  selectedrole: number;
  searchstatus: string;
  searchdate: any;
}

////#endregion

