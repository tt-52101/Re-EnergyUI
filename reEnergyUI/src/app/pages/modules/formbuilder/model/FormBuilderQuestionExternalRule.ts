import { FormBuilderQuestionInfo } from './FormBuilderQuestionInfo';

export class FormBuilderQuestionExternal {
    id: number;
    form_id: number;
    section_id: number;
    source_ques_id: number;
    source_ques_text; string;
    rule_dependent_ques_id: number;
    option_id: number;
    rule_category_type: string;
    is_show_image: boolean;
    is_show_remark: boolean;
    rule_condition: string;
    ruleDepentQuestions = new Array<FormBuilderQuestionInfo>();
}

export class RuleDepentQuestions {
    id: number;
    ques_id: number;
    option_text: string;
    option_order: number;
    is_image_rule: boolean;
}


export class Formbuldr_extrnl_que_optn_rule_mapping {
    id: number;
    ques_id: number;
    option_id: number;
}