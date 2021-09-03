import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from './pages/api-services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  //@ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  showLoader:boolean=false;
 // public loadingTemplate: TemplateRef<any>;
  
  constructor(private toastsrvc:ToastrService,private commonsrvc: CommonService)
  {
    
   
    this.commonsrvc.getLoaderStatus().subscribe(data => {
      if (data != null || data != undefined) {
        this.showLoader=data;
      }
     


    })
  }
  // ngAfterViewInit()
  // {
    
  //   this.loadingTemplate=this.customLoadingTemplate;
  // }
}
