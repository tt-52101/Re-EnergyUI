

export class StateItem {
  id: number
  statename: string
  statecode: string
  gstcode: string

}

export class AsrSearchResponse {
  total: number;
  rowCount: number;
  current: number;
  rows = new Array<AssesorDTO>();
}
export class AssesorDTO {
  userid: number;
  asrname: string;
  email: string;
  mobileno1: string;
  mobileno2: string;

  dob: Date;
  dob_struct: DateStruct
  dob_day: number;
  dob_month: number;
  dob_year: number;

  aadharnumber: string;
  qualificationid: number;
  otherqualification: string;
  specialitiesids: string; // coma separated ids
  totalworkexp: number;
  currentorg: string;
  designation: string;
  orgaddress: string;
  stateid: number;
  districtid: number;
  statename: string;
  districtname: string;
  city: string;
  residentialaddress: string;
  pin: string;
  latitude: number;
  longitude: number;

  bankname: string;
  bankbranchname: string;
  bankaccountnumber: number;
  accountholdername: string;
  ifsc_code: string;
  pannumber: string;

  photourl: string;
  createdby: number;
  createdon: Date;
  isactive: boolean;

  capacity: number;
  capacityname: string;
}
export class DateStruct {
  year: number;
  month: number;
  day: number
}
////#region rrc

export class AsrFilter {
  limit: number;
  offset: number;
  sort: string;
  searchtext: string;
  stateid: number;
  districtid: number;
  city: string;
  capacity: number;
  profile: boolean | null;
}

////#endregion

