

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
  email: string;
  mobile: string;
  userpassword: string;
  isactive: boolean;
  notes: string;
  otplogid: string;
  isFirstTimeLogin: string;
  creationdate: string;
  rolename: string;
  sNo: number;
  fullname: string;
  capacity: number;
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

