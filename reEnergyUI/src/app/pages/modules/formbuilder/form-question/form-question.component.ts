import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { FormBuilderQuestionType, FormBuilderSection } from '../model/FormBulderInfo'
import { FormBuilderGroupInfo, FormBuilderQuestionInfo, FormBuilderQuestionInfoOption } from '../model/FormBuilderQuestionInfo';
import { FormBuilderDataShareService } from '../datashareservices/FormBuilderDataShareService';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RuleDepentQuestions, FormBuilderQuestionExternal } from '../model/FormBuilderQuestionExternalRule';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss']
})
export class FormQuestionComponent implements OnInit {

  formBuilderQuestionType: FormBuilderQuestionType;
  formBuilderQuestionTypeList = new Array<FormBuilderQuestionType>();
  rootUrl: string;
  selecteVale: number;
  isSectctedQuestionType: boolean = true;
  testText: string;
  question_type: string = "";
  option: Option;
  optionlist = new Array<Option>();
  formBuilderQuestionInfo: FormBuilderQuestionInfo
  formBuilderQuestionInfoList = new Array<FormBuilderQuestionInfo>();
  form_id: number = 0;
  section_id: number = 0;
  formBuilderSection: FormBuilderSection;
  formBuilderQuestionInfoOption: FormBuilderQuestionInfoOption;
  formBuilderQuestionInfoOptionlist = new Array<FormBuilderQuestionInfoOption>();
  sectionName: string = "";
  formBuilderQuestionModelHeading: string = '';
  que_id: number = 0;
  formBuilderQuestionInfoSouceQuesList = new Array<FormBuilderQuestionInfo>();
  formBuilderQuestionExternalRule: FormBuilderQuestionExternal
  formBuilderQuestionExternalGroupRule: FormBuilderQuestionExternal
  formBuilderQuestionExternalDepentRule: FormBuilderQuestionInfo
  ruleDepentQuestions: RuleDepentQuestions
  selectRuleQuestionItem: FormBuilderQuestionInfo;
  @ViewChild('QuestionFromModel') QuestionFromModel: NgbModal;
  @ViewChild('QuestionExternalRuleFromModel') QuestionExternalRuleFromModel: NgbModal;
  question_text: string = "";
  formBuilderGroupInfo: FormBuilderGroupInfo;
  formBuilderGroupInfoList = new Array<FormBuilderGroupInfo>();
  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private modalService: NgbModal, private tostr: CustomTosterServiceService, private formBuilderDataService: FormBuilderDataShareService, private router: Router) {
    this.rootUrl = authenticationService.apiUrl;
    this.formBuilderSection = new FormBuilderSection();
    this.formBuilderQuestionExternalRule = new FormBuilderQuestionExternal();
    this.formBuilderQuestionExternalGroupRule = new FormBuilderQuestionExternal();
    this.formBuilderGroupInfo = new FormBuilderGroupInfo();
    this.formBuilderDataService.getData().subscribe(res => {

      if (res != null || res != undefined) {
        this.formBuilderSection = res;
        this.form_id = this.formBuilderSection.form_id;
        this.section_id = this.formBuilderSection.id;
        this.sectionName = this.formBuilderSection.section_name;
      } else {
        // 

      }
    });


    if (this.form_id <= 0 || this.section_id <= 0) {
      this.router.navigateByUrl("formbuilder/info");
    }

  }

  ngOnInit(): void {
    this.formBuilderQuestionType = new FormBuilderQuestionType();
    this.formBuilderQuestionInfo = new FormBuilderQuestionInfo();
    this.formBuilderQuestionInfoOption = new FormBuilderQuestionInfoOption();
    this.ruleDepentQuestions = new RuleDepentQuestions();

    this.option = new Option();
    this.optionlist.push(this.option);

    this.getQuestionInfos();

  }

  async getQuestionInfos() {

    this.formBuilderQuestionInfoList = new Array<FormBuilderQuestionInfo>();
    this.http.get<any>(this.rootUrl + 'formbuilder/formQuestionInfo/' + this.form_id + '/' + this.section_id).subscribe(res => {

      this.formBuilderQuestionInfoList = res;
      this.getGroupInfos()
      // this.getQuestionType();
    }, error => {
      console.log(error)
    })
  }

  async getQuestionType() {
    this.formBuilderQuestionTypeList = new Array<FormBuilderQuestionType>();
    this.http.get<any>(this.rootUrl + 'formbuilder/formQuestionType').subscribe(res => {
      this.formBuilderQuestionTypeList = res;
    }, error => {
      console.log(error)
    })
  }


  addOrUpdateQuestionInfo() {
    console.error(this.formBuilderQuestionInfo);

    if (this.formBuilderQuestionInfo.questionOption.length > 0) {
      for (var _i = 0; _i < this.formBuilderQuestionInfo.questionOption.length; _i++) {
        this.formBuilderQuestionInfo.questionOption[_i].option_order = _i + 1;
      }
    }
    this.addOrUpdateQuestionData();
  }

  addOrUpdateQuestionData() {

    this.http.post<any>(this.rootUrl + 'formbuilder/formQuestionInfo', this.formBuilderQuestionInfo).subscribe(res => {

      if (res.isSuccess) {

        this.tostr.success(res.message);

      } else {
        this.tostr.error(res.message);
      }
      this.modalService.dismissAll();
      this.getQuestionInfos();
    }, error => {
      console.log(error);
    })
  }
  questionTypeClicked(itm) {

    this.question_type = itm.question_type;
    this.formBuilderQuestionInfo.question_type_id = itm.id;
    if (this.formBuilderQuestionInfo.question_type_id != 0 && this.formBuilderQuestionInfo.question_type_id != null
      && this.formBuilderQuestionInfo.question_type_id != undefined) {

      this.isSectctedQuestionType = false;
    }
    if (this.formBuilderQuestionInfo.question_type_id == 2 || this.formBuilderQuestionInfo.question_type_id == 3) {
      this.formBuilderQuestionInfoOption = new FormBuilderQuestionInfoOption();
      this.formBuilderQuestionInfo.questionOption.push(this.formBuilderQuestionInfoOption);
    }


  }

  questionTypeChange(itm) {
    // //debugger
    this.question_type = itm.question_type;
    if (this.formBuilderQuestionInfo.question_type_id > 0) {
      this.isSectctedQuestionType = false;
    }
    if (this.formBuilderQuestionInfo.question_type_id == 2 || this.formBuilderQuestionInfo.question_type_id == 3) {
      this.formBuilderQuestionInfoOption = new FormBuilderQuestionInfoOption();
      this.formBuilderQuestionInfo.questionOption.push(this.formBuilderQuestionInfoOption);
    }


  }

  sortup(index) {

    //console.log("sortup(index) .. index -> " + index);

    if (index != 0) {
      let data = this.formBuilderQuestionInfo.questionOption[index]
      this.formBuilderQuestionInfo.questionOption.splice(index, 1);
      this.formBuilderQuestionInfo.questionOption.splice(index - 1, 0, data);
    }
    if (index == 0) {
      let data = this.formBuilderQuestionInfo.questionOption[0]
      this.formBuilderQuestionInfo.questionOption.splice(0, 1);
      this.formBuilderQuestionInfo.questionOption.splice((this.formBuilderQuestionInfo.questionOption.length), 0, data);
    }

  }
  sortdown(index) {

    //console.log("sortdown(index) .. index -> " + index);

    if (index == this.formBuilderQuestionInfo.questionOption.length - 1) {
      let data = this.formBuilderQuestionInfo.questionOption[index]
      this.formBuilderQuestionInfo.questionOption.splice(index, 1);
      this.formBuilderQuestionInfo.questionOption.splice(0, 0, data);
    }
    else {
      let data = this.formBuilderQuestionInfo.questionOption[index]
      this.formBuilderQuestionInfo.questionOption.splice(index, 1);
      this.formBuilderQuestionInfo.questionOption.splice(index + 1, 0, data);
    }

  }

  sortupFormQuestion(index) {

    //console.log("sortup(index) .. index -> " + index);

    if (index != 0) {
      let data = this.formBuilderQuestionInfoList[index]
      this.formBuilderQuestionInfoList.splice(index, 1);
      this.formBuilderQuestionInfoList.splice(index - 1, 0, data);
    }
    if (index == 0) {
      let data = this.formBuilderQuestionInfoList[0]
      this.formBuilderQuestionInfoList.splice(0, 1);
      this.formBuilderQuestionInfoList.splice((this.formBuilderQuestionInfoList.length), 0, data);
    }

  }
  sortdownFormQuestion(index) {

    //console.log("sortdown(index) .. index -> " + index);

    if (index == this.formBuilderQuestionInfoList.length - 1) {
      let data = this.formBuilderQuestionInfoList[index]
      this.formBuilderQuestionInfoList.splice(index, 1);
      this.formBuilderQuestionInfoList.splice(0, 0, data);
    }
    else {
      let data = this.formBuilderQuestionInfoList[index]
      this.formBuilderQuestionInfoList.splice(index, 1);
      this.formBuilderQuestionInfoList.splice(index + 1, 0, data);
    }

  }

  openQuestionModel(QuestionFromModel) {
    this.formBuilderQuestionInfo = new FormBuilderQuestionInfo();
    this.selecteVale = 0;
    this.formBuilderQuestionModelHeading = "Add Question";
    this.isSectctedQuestionType = true;
    this.formBuilderQuestionInfo.form_id = this.form_id;
    this.formBuilderQuestionInfo.section_id = this.section_id;
    this.modalService.open(QuestionFromModel, { size: 'lg' });
  }

  editFromQuestionInfo(QuestionFromModel, item: FormBuilderQuestionInfo, index) {
    this.formBuilderQuestionInfo = new FormBuilderQuestionInfo();

    this.selecteVale = 0;
    this.isSectctedQuestionType = false;
    this.formBuilderQuestionInfo = item;
    this.formBuilderQuestionModelHeading = "Edit Question";
    this.question_type = item.question_type;
    // this.formBuilderQuestionInfo.form_id = this.form_id;
    // this.formBuilderQuestionInfo.section_id = this.section_id;
    this.modalService.open(QuestionFromModel, { size: 'lg' });


  }

  addOption() {
    // this.option = new Option();
    // this.optionlist.push(this.option);
    this.formBuilderQuestionInfoOption = new FormBuilderQuestionInfoOption();
    this.formBuilderQuestionInfo.questionOption.push(this.formBuilderQuestionInfoOption);
  }

  removeOption(item) {
    // this.optionlist = this.optionlist.filter(obj => obj != item);

    this.formBuilderQuestionInfo.questionOption = this.formBuilderQuestionInfo.questionOption.filter(obj => obj != item);
  }


  publishFormBuilderQuestionInfo(obj: FormBuilderQuestionInfo) {
    this.formBuilderQuestionInfo = obj;
    this.http.post<any>(this.rootUrl + 'formbuilder/formQuestionInfoPublish', this.formBuilderQuestionInfo).subscribe(res => {

      if (res.isSuccess) {

        this.tostr.success(res.message);

      } else {
        this.tostr.error(res.message);
      }
      this.modalService.dismissAll();
      this.getQuestionInfos();
    }, error => {
      console.log(error);
    })
  }
  UpdateOrderFormBuilderQuestionInfo() {
    for (var _i = 0; _i < this.formBuilderQuestionInfoList.length; _i++) {
      this.formBuilderQuestionInfoList[_i].ques_order = _i + 1;
    }

    this.http.post<any>(this.rootUrl + 'formbuilder/formQuestionInfoOrderupdate', this.formBuilderQuestionInfoList).subscribe(res => {

      if (res.isSuccess) {

        this.tostr.success(res.message);

      } else {
        this.tostr.error(res.message);
      }
      this.modalService.dismissAll();
      this.getQuestionInfos();
    }, error => {
      console.log(error);
    })
  }

  PublishAllFormBuilderQuestionInfo() {

    this.http.post<any>(this.rootUrl + 'formbuilder/formQuestionInfoPublishAllQtns', this.formBuilderQuestionInfoList).subscribe(res => {

      if (res.isSuccess) {

        this.tostr.success(res.message);

      } else {
        this.tostr.error(res.message);
      }
      this.modalService.dismissAll();
      this.getQuestionInfos();
    }, error => {
      console.log(error);
    })
  }

  isApplyExtrernalRule: boolean = false;
  openExternalRuleModel(QuestionExternalRuleFromModel, obj: FormBuilderQuestionInfo, index) {

    this.formBuilderQuestionExternalRule = new FormBuilderQuestionExternal();
    this.que_id = obj.id;
    this.getQuestionInfosDepententOnSourceQues();
    this.formBuilderQuestionExternalRule.form_id = obj.form_id;
    this.formBuilderQuestionExternalRule.section_id = obj.section_id;
    this.formBuilderQuestionExternalRule.source_ques_id = obj.id;
    this.formBuilderQuestionExternalRule.source_ques_text = obj.question_text;

    this.isApplyExtrernalRule = obj.is_apply_external_rule;

    this.modalService.open(QuestionExternalRuleFromModel, { size: 'lg' });

  }





  async getQuestionInfosDepententOnSourceQues() {
    //debugger
    this.formBuilderQuestionInfoSouceQuesList = new Array<FormBuilderQuestionInfo>();
    this.http.get<any>(this.rootUrl + 'formbuilder/formQuestionInfobySourceQue/' + this.form_id + '/' + this.section_id + '/' + this.que_id).subscribe(res => {
      //debugger
      this.formBuilderQuestionInfoSouceQuesList = res;
      // this.formBuilderQuestionExternalRule.ruleDepentQuestions=new Array<FormBuilderQuestionInfo>();     
      // this.formBuilderQuestionExternalRule.ruleDepentQuestions=this.formBuilderQuestionInfoSouceQuesList;
      if (this.isApplyExtrernalRule) {
        this.getFormQuestionInfoSelectedQueExternalRule();
      } else {
        this.getQuestionType();
      }

    }, error => {
      console.log(error)
    })
  }


  async getFormQuestionInfoSelectedQueExternalRule() {
    //debugger
    this.formBuilderQuestionInfoSouceQuesList = new Array<FormBuilderQuestionInfo>();
    this.http.get<any>(this.rootUrl + 'formbuilder/formQuestionSelectedExternalRule/' + this.form_id + '/' + this.section_id + '/' + this.que_id).subscribe(res => {
      //debugger
      this.formBuilderQuestionInfoSouceQuesList = res;
      this.formBuilderQuestionExternalRule.ruleDepentQuestions = new Array<FormBuilderQuestionInfo>();
      this.formBuilderQuestionExternalRule.ruleDepentQuestions = this.formBuilderQuestionInfoSouceQuesList;//res;  
      this.getQuestionType();
    }, error => {
      console.log(error)
    })
  }

  async getQuestionInfosDepententOnSourceGroupQues() {
    //debugger
    this.formBuilderQuestionInfoSouceQuesList = new Array<FormBuilderQuestionInfo>();
    // this.formBuilderQuestionExternalDepentRule = new FormBuilderQuestionInfo();
    this.http.get<any>(this.rootUrl + 'formbuilder/formQuestionInfobyGroupSourceQue/' + this.form_id + '/' + this.section_id + '/' + this.que_id).subscribe(res => {
      //debugger
      this.formBuilderQuestionInfoSouceQuesList = res;
      this.formBuilderQuestionExternalDepentRule = this.formBuilderQuestionInfoSouceQuesList[0];
      this.formBuilderQuestionExternalRule.ruleDepentQuestions.push(this.formBuilderQuestionExternalDepentRule);

      // this.formBuilderQuestionExternalDepentRule.
      // this.getQuestionType();
    }, error => {
      console.log(error)
    })
  }


  ChangeSourceQuesRule(event) {
    //debugger
    var obj = this.selectRuleQuestionItem;
    this.formBuilderQuestionExternalDepentRule = new FormBuilderQuestionInfo();
    this.formBuilderQuestionExternalDepentRule = this.selectRuleQuestionItem;
    //this.ruleDepentQuestions = new RuleDepentQuestions()
    this.formBuilderQuestionExternalRule.rule_dependent_ques_id = this.formBuilderQuestionExternalDepentRule.id;
    // this.formBuilderQuestionExternalRule.ruleDepentQuestions.splice(0, this.formBuilderQuestionExternalRule.ruleDepentQuestions.length);
    this.formBuilderQuestionExternalRule.ruleDepentQuestions.push(this.formBuilderQuestionExternalDepentRule);

    // this.formBuilderQuestionExternalRule.form_id=obj.form_id;
    // this.formBuilderQuestionExternalRule.form_id=obj.form_id;


  }

  removeformBuilderQuestionExternalRule(item) {
    this.formBuilderQuestionExternalRule.ruleDepentQuestions = this.formBuilderQuestionExternalRule.ruleDepentQuestions.filter(obj => obj != item);
  }

  AddExternalRule() {
    this.selectRuleQuestionItem = new FormBuilderQuestionInfo();
  }
  saveExternalRule() {
    this.http.post<any>(this.authenticationService.apiUrl + "formbuilder/formQuestionExternalRule/", this.formBuilderQuestionExternalRule).subscribe(res => {

      if (res.isSuccess) {

        this.tostr.success(res.message);
        this.getQuestionInfos();
        this.modalService.dismissAll();
      } else {
        this.tostr.error(res.message);
      }

    }, error => {
      console.log(error);
    })
  }


  deleteExternalRule(obj: FormBuilderQuestionInfo) {


    this.formBuilderQuestionExternalRule = new FormBuilderQuestionExternal();
    this.que_id = obj.id;
    this.formBuilderQuestionExternalRule.form_id = obj.form_id;
    this.formBuilderQuestionExternalRule.section_id = obj.section_id;
    this.formBuilderQuestionExternalRule.source_ques_id = obj.id;
    this.formBuilderQuestionExternalRule.source_ques_text = obj.question_text;
    this.http.put<any>(this.authenticationService.apiUrl + "formbuilder/deleteformQuestionExternalRule/", this.formBuilderQuestionExternalRule).subscribe(res => {

      if (res.isSuccess) {

        this.tostr.success(res.message);
        this.getQuestionInfos();
      } else {
        this.tostr.error(res.message);
      }

    }, error => {
      console.log(error);
    })
  }

  deleteQuestion(obj: FormBuilderQuestionInfo) {

    this.http.put<any>(this.authenticationService.apiUrl + "formbuilder/deleteformQuestion/", obj).subscribe(res => {

      if (res.isSuccess) {

        this.tostr.success(res.message);
        this.getQuestionInfos();
      } else {
        this.tostr.error(res.message);
      }

    }, error => {
      console.log(error);
    })
  }



  formBuilderGroupModelHeading: string = "";

  async getGroupInfos() {

    this.formBuilderGroupInfoList = new Array<FormBuilderGroupInfo>();
    this.http.get<any>(this.rootUrl + 'formbuilder/formGroupInfo/' + this.form_id + '/' + this.section_id).subscribe(res => {

      this.formBuilderGroupInfoList = res;
      this.getQuestionType();
    }, error => {
      console.log(error)
    })
  }

  openGroupModel(GroupModel) {
    this.formBuilderGroupInfo = new FormBuilderGroupInfo();
    this.formBuilderGroupModelHeading = "Add Group";
    this.formBuilderGroupInfo.form_id = this.form_id;
    this.formBuilderGroupInfo.section_id = this.section_id;
    this.modalService.open(GroupModel, { size: 'lg' });
  }

  editFromGroupInfo(GroupModel, item: FormBuilderGroupInfo, index) {
    this.formBuilderGroupInfo = new FormBuilderGroupInfo();
    this.formBuilderGroupInfo = item;
    this.formBuilderQuestionModelHeading = "Edit Group";
    this.modalService.open(GroupModel, { size: 'lg' });
  }

  saveOrUpdaateGroupInfo() {

    this.http.post<any>(this.rootUrl + 'formbuilder/formGroupInfo', this.formBuilderGroupInfo).subscribe(res => {

      if (res.isSuccess) {

        this.tostr.success(res.message);

      } else {
        this.tostr.error(res.message);
      }
      this.modalService.dismissAll();
      this.getGroupInfos();
    }, error => {
      console.log(error);
    })
  }

  saveFormGroupInfo() {
    this.saveOrUpdaateGroupInfo();
  }

  deleteGroupeInfo(obj: FormBuilderGroupInfo) {

    this.http.put<any>(this.authenticationService.apiUrl + "formbuilder/deleteformGroupInfo/", obj).subscribe(res => {

      if (res.isSuccess) {

        this.tostr.success(res.message);
        this.getQuestionInfos();
      } else {
        this.tostr.error(res.message);
      }

    }, error => {
      console.log(error);
    })
  }


  openExternalGroupRuleModel(QuestionExternalGroupRuleFromModel, obj: FormBuilderQuestionInfo, index) {
    //debugger
    this.formBuilderQuestionExternalRule = new FormBuilderQuestionExternal();
    this.que_id = obj.id;
    this.getQuestionInfosDepententOnSourceGroupQues();
    this.formBuilderQuestionExternalRule.form_id = obj.form_id;
    this.formBuilderQuestionExternalRule.section_id = obj.section_id;
    this.formBuilderQuestionExternalRule.source_ques_id = obj.id;
    this.formBuilderQuestionExternalRule.source_ques_text = obj.question_text;
    this.modalService.open(QuestionExternalGroupRuleFromModel, { size: 'lg' });

  }

  saveExternalGorupRule() {
    //debugger
    this.http.post<any>(this.authenticationService.apiUrl + "formbuilder/formQuestionExternalGroupRule/", this.formBuilderQuestionExternalRule).subscribe(res => {

      if (res.isSuccess) {

        this.tostr.success(res.message);
        this.getQuestionInfos();
        this.modalService.dismissAll();
      } else {
        this.tostr.error(res.message);
      }

    }, error => {
      console.log(error);
    })
  }

  resetExternalGorupRule() {
    //debugger

    this.formBuilderQuestionExternalRule.ruleDepentQuestions.forEach(element => {
      element.questionOption.forEach(itm => {
        itm.group_id = null
        itm.is_image_external_rule = false
      })

    });

  }
}

class Option {
  id: number;
  option_value: string;
}
