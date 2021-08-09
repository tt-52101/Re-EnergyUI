import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FormBuilderDataShareService } from '../datashareservices/FormBuilderDataShareService';
import { hospitalList } from '../model/hospitalList';

@Component({
  selector: 'app-form-builder-hosp-list',
  templateUrl: './form-builder-hosp-list.component.html',
  styleUrls: ['./form-builder-hosp-list.component.scss', '../../hospital/hospital/hospital.component.scss']
  })
export class FormBuilderHospListComponent implements OnInit {

  rootUrl: string;
  formid=0;
  hosplist:Array<hospitalList>
  constructor(private dataservc: FormBuilderDataShareService,private http: HttpClient,private authenticationService: AuthenticationService,private router:Router) { 
    this.rootUrl = authenticationService.apiUrl;
    this.dataservc.getFormId().subscribe(data=>
      {
        this.formid=data;
      });
   

  }

  ngOnInit(): void 
  {
    this.getFormList();
  }

  getFormList()
  {
    this.http.get<any>(`${this.rootUrl}onsiteassessment/getHospitalListByFormId/${this.formid}`).subscribe(res => {
      this.hosplist = res;
    }, error => {
      console.log(error)
    })
  }
  viewResult(item)
  {
     this.dataservc.setAssessmentId(item.assmt_id);

    this.router.navigate(['/onsiteassessment']);


  }
}
