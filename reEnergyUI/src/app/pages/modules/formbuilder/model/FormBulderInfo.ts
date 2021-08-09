export class FormBulderInfo {

    id: number;
    form_name: string;
    form_category: string; //hospital or center
    platform: string; // web or mobile
    create_date: string;
    published_date: string;
    status: boolean; // false= draft or true= live
    status_str: string;
}

export class FormBuilderSection {
    id: number;
    form_id: number;
    section_name: string;
    section_order: number;
    status: boolean; // false= draft or true= live
    status_str: string;
    number_total_questions: number;
    number_of_published_qtns: number;
    array_type_section: boolean

}

export class FormBuilderQuestionType {
    id: number;
    question_type: string;
    status: string;
    icon: string;
}