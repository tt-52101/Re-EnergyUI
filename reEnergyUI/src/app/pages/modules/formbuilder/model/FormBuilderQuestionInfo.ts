export class FormBuilderQuestionInfo {
    id: number;
    form_id: number;
    section_id: number;
    question_type_id: number;
    question_text: string;
    question_description: string;
    ques_keyowrd: string;
    help_text: string;
    mandatory_question: boolean = true;
    maximum_number_of_characters: number;
    minimum_value: number;
    maximum_value: number;
    min_no_of_options: number;
    is_capture_image: boolean = false;
    number_of_images: number;
    is_capture_nc: boolean = false;
    is_capture_remark: boolean = true;
    ques_order: number;
    isactive: boolean;
    question_type: string;
    status_str: string;
    is_apply_external_rule: boolean;
    is_apply_internal_rule: boolean;
    questionOption = new Array<FormBuilderQuestionInfoOption>();
    group_id:number;
    ques_serial_tag_no:string;
    group_name:string;
    is_external_group_rule:boolean;
}

export class FormBuilderQuestionInfoOption {
    id: number;
    ques_id: number;
    option_text: string;
    option_order: number;
    is_image_rule: boolean;
    is_image_internal_rule: boolean;
    is_image_external_rule: boolean;
    group_id:number;
    formBuilderGroupInfo=new Array<FormBuilderGroupInfo>();
}

export class FormBuilderGroupInfo {
    id: number;
    form_id: number;
    section_id: number;
    group_name: string;
}
