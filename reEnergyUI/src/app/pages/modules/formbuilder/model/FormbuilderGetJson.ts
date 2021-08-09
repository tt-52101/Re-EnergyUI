
export class FormBuilderGetJson {
  id: number;
  ques_id: string;
  ques_text: string;
  ques_type: string;
}
//myDeserializedClass: Root; 

export class FormBuilderGetJsonRoot {
  id: number;
  form_guid: string;
  form_name: string;
  form_type: string;
  Sections: Section[];
}

export class Option {
  guid: string;
  value: string;
  is_selected: boolean;
}

export class OptionRule {
  guid: string;
  value: string;
  is_image_show: boolean;
}

export class InternalRule {
  max_number_of_char_allow: number; //prev int
  min_limit_number: number | null;
  max_limit_number: number | null;
  capture_number_of_image: number | null;
  is_nc_capture: boolean | null;
  is_image_capture: boolean | null;
  option_rule: OptionRule[];
}

export class QuesRef {
  ques_ref_id: string;
}

export class OptionRule2 {
  guid: string;
  value: string;
  is_ques_show: boolean;
}

export class ExternalRule {
  ques_ref: QuesRef[];
  option_rule: OptionRule2[];
}

export class Question {
  ques_id: number;  //prev it was int
  ques_source_id: string;
  ques_text: string;
  ques_order: number; //prev it was int
  ques_help_text: string;
  ques_type: string;
  ques_type_id: number; //new added by vk

  description: string;
  is_mandatory: boolean;
  keyword: string;
  ques_ans: string;
  ques_nc_remark: string;
  ques_image_url: string;
  option: Option[];
  internal_rule: InternalRule;
  external_rule: ExternalRule;
}

export class Section {
  id: number;
  section_name: string;
  Questions: Question[];
}






