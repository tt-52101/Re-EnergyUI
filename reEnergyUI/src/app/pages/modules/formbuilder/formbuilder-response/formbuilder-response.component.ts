import { Component, OnInit } from '@angular/core';
import { FormBuilderGetJsonRoot } from '../model/FormbuilderGetJson';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FormBuilderDataShareService } from '../datashareservices/FormBuilderDataShareService';

@Component({
  selector: 'app-formbuilder-response',
  templateUrl: './formbuilder-response.component.html',
  styleUrls: ['./formbuilder-response.component.scss']
})
export class FormbuilderResponseComponent implements OnInit {
  rootUrl: string;
  FormBuilderGetJsonRoot: FormBuilderGetJsonRoot;
  form_id: number;


  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private formBuilderDataService: FormBuilderDataShareService) {
    this.rootUrl = authenticationService.apiUrl;
  }

  ngOnInit() {
    this.form_id = this.formBuilderDataService.form_id;
    if (this.form_id > 0) {
      this.getFormbuilderjson();
    }
  }

  getFormbuilderjson() {
    this.http.get<FormBuilderGetJsonRoot>(this.rootUrl + 'formbuilder/getFormBuilder/' + this.form_id).subscribe(res => {
      this.FormBuilderGetJsonRoot = res;

      console.log(this.FormBuilderGetJsonRoot);
    }, error => {
      console.log(error)
    })
  }

}
