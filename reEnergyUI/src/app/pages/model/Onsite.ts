export class onsiteFormData {

  hospital_id: number
  assessment_id: number
  getSectionWebs: Array<GetSectionWeb> = new Array<GetSectionWeb>();

  refrence_id: string

  application_no: string

  assessment_Date: Date

  assessor1: string

  assessor2: string
  assessor2_id: number

  org_name: string

  type: string
  org_type: string
  state: string
  sepeciality: string
  senction_bed: string
}
export class GetSectionWeb {
  section_id: number
  section_name: String

  section_guid: String
  ncCount: number | null
  questions: Array<Question> = new Array<Question>();
}
export class Question {
  ques_id: number
  ques_source_id: String
  ques_text: String
  ques_order: number
  ques_help_text: String
  ques_type: String
  ques_type_id: number

  description: String
  is_mandatory: boolean
  keyword: String
  ques_ans: String
  ques_nc_remark: String
  remark: String
  isnc: boolean
  ques_image_url: String
  ques_image_url_list: Array<UrlItem> = new Array<UrlItem>();

  option: Array<Option> = new Array<Option>()
  internal_rule: InternalRule = new InternalRule();
  // public ExternalRule external_rule { get; set; }

  queslist: String
}
export class UrlItem {
  id: number
  url: string
}

export class Option {
  guid: String
  value: String
  is_selected: boolean
}
export class InternalRule {
  max_number_of_char_allow: number
  min_limit_number: number
  max_limit_number: number
  capture_number_of_image: number
  is_nc_capture: boolean
  is_image_capture: boolean
  option_rule: Array<OptionRule> = new Array<OptionRule>()
}
export class OptionRule {
  guid: String
  value: String
  is_image_show: boolean

}