import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBulderInfo, FormBuilderSection } from "../model/FormBulderInfo";
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import { FormBuilderDataShareService } from '../datashareservices/FormBuilderDataShareService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formbuilder-section',
  templateUrl: './formbuilder-section.component.html',
  styleUrls: ['./formbuilder-section.component.scss', '../../hospital/hospital//hospital.component.scss']
})
export class FormbuilderSectionComponent implements OnInit {
  formBulderInfo: FormBulderInfo;
  formBulderInfoList = new Array<FormBulderInfo>();
  formBuilderSection: FormBuilderSection
  formBuilderSectionlist = new Array<FormBuilderSection>();
  rootUrl: string;
  FormBuilderHeading: string;
  FormBuilderSectionHeading: string;
  formName: string = "";
  @ViewChild('addFormSectionModel', { static: false }) addFormSectionModel: NgbModal;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private modalService: NgbModal, private tostr: CustomTosterServiceService, private formBuilderDataService: FormBuilderDataShareService, private router: Router) {
    this.rootUrl = authenticationService.apiUrl;
  }

  ngOnInit(): void {
    this.formBulderInfo = new FormBulderInfo();
    this.formBuilderSection = new FormBuilderSection();
    this.formBuilderSection.form_id = this.formBuilderDataService.form_id;
    this.formName = this.formBuilderDataService.formName;
    if (this.formBuilderSection.form_id > 0) {
      this.getFormSectiondata();
    }
  }


  sortup(index) {

    //console.log("sortup(index) .. index -> " + index);

    if (index != 0) {
      let data = this.formBuilderSectionlist[index]
      this.formBuilderSectionlist.splice(index, 1);
      this.formBuilderSectionlist.splice(index - 1, 0, data);
    }
    if (index == 0) {
      let data = this.formBuilderSectionlist[0]
      this.formBuilderSectionlist.splice(0, 1);
      this.formBuilderSectionlist.splice((this.formBuilderSectionlist.length), 0, data);
    }

  }
  sortdown(index) {

    //console.log("sortdown(index) .. index -> " + index);

    if (index == this.formBuilderSectionlist.length - 1) {
      let data = this.formBuilderSectionlist[index]
      this.formBuilderSectionlist.splice(index, 1);
      this.formBuilderSectionlist.splice(0, 0, data);
    }
    else {
      let data = this.formBuilderSectionlist[index]
      this.formBuilderSectionlist.splice(index, 1);
      this.formBuilderSectionlist.splice(index + 1, 0, data);
    }

  }

  getFormSectiondata() {
    this.formBuilderSectionlist = new Array<FormBuilderSection>();
    this.http.get<any>(this.rootUrl + 'formbuilder/formInfoSection/' + this.formBuilderSection.form_id).subscribe(res => {
      this.formBuilderSectionlist = res;
    }, error => {
      console.log(error)
    })
  }
  openFormSectionModel(addFormSectionModel) {
    this.formBuilderSection.section_name = "";
    this.FormBuilderSectionHeading = "Add Section";
    this.modalService.open(addFormSectionModel, { size: 'md' });
  }
  saveFormSection() {

    this.http.post<any>(this.rootUrl + 'formbuilder/formSection', this.formBuilderSection).subscribe(res => {
      if (res.isSuccess) {
        this.tostr.success(res.message);
        this.getFormSectiondata();
      } else {
        this.tostr.error(res.message);
      }
      this.modalService.dismissAll();
    }, error => {
      console.log(error);
    })

  }
  updateFormSection() {

    for (var _i = 0; _i < this.formBuilderSectionlist.length; _i++) {
      this.formBuilderSectionlist[_i].section_order = _i + 1;
    }

    this.http.post<any>(this.rootUrl + 'formbuilder/formSectionUpdate', this.formBuilderSectionlist).subscribe(res => {
      if (res.isSuccess) {
        this.tostr.success(res.message);
        this.getFormSectiondata();
      } else {
        this.tostr.error(res.message);
      }
      this.modalService.dismissAll();
    }, error => {
      console.log(error);
    })

  }

  editSection(addFormSectionModel, obj: FormBuilderSection, index) {
    this.FormBuilderSectionHeading = "Edit Section";

    this.formBuilderSection = obj;
    this.modalService.open(addFormSectionModel, { size: 'md' });
  }

  publishSection(item: FormBuilderSection) {
    this.formBuilderSection = item;
    this.http.put<any>(this.rootUrl + 'formbuilder/formSectionPublish', this.formBuilderSection).subscribe(res => {
      if (res.isSuccess) {
        this.tostr.success(res.message);
        this.getFormSectiondata();
      } else {
        this.tostr.error(res.message);
      }
      this.modalService.dismissAll();
    }, error => {
      console.log(error);
    })
  }

  ManageQuestion(obj: FormBuilderSection) {

    this.formBuilderDataService.setData(obj);

    this.router.navigateByUrl("formbuilder/question");

  }

}
