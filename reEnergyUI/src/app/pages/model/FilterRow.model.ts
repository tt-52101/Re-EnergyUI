import { DateStruct } from '../model/hospital/SupportService.model';


export class OaAllocationFilter {
  SearchTerms: string;
  SearchState: number;
  SearchType: string;
  SearchApplicationType: number;
  SearchPrincipalAssessor: number;
  SearchAssessor: number;
  SearchStage: number;
  offset: number;
  limit: number;

  search_date: SearchDate;
}

export class CcAllocationFilter {
  SearchTerms: string;
  SearchState: number;
  SearchType: string;
  SearchApplicationType: number;
  SearchCometeMember: number;
  SearchStage: number;
  offset: number;
  limit: number;

  search_date: SearchDate;
}

export class SearchDate {
  from_date: DateStruct;
  to_date: DateStruct
}

export class OaAllocationCls {
  hospital_id: number;
  oaid_1: number;
  capacity_1: number;
  oaid_2: number;
  capacity_2: number;
  asmt_type: number;
  asmt_date: DateStruct;
}

