import { Component, OnInit } from '@angular/core';
import { DateStruct } from 'src/app/pages/model/hospital/SupportService.model';
import { AdminService } from 'src/app/pages/api-services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-certified-hospital',
  templateUrl: './certified-hospital.component.html',
  styleUrls: ['./certified-hospital.component.scss']
})
export class CertifiedHospitalComponent implements OnInit {
 hospitalList: CertifiedHospitalList
 stateDropdown:dropDownData[]
 cityDropdown:dropDownData[]
 
 
 
 
 totalCount: number = 0;
  minCount: number = 1;
  maxCount: number = 10;
  skip: number = 0;
  public enties = [25, 50, 100, 200];

 SearchTerms: string = "";
 SearchState:number=0;
 SearchType:string=null;
 SearchCity:number=0;
 
 
 limit: number = 10;

 
 loader=false;

  constructor(private modalService: NgbModal,private adminService: AdminService) {
    let apptype=window.history.state.type;
    if(apptype!=null||apptype!=undefined)
    {
       this.SearchType=apptype;
    }
    this.hospitalList= new CertifiedHospitalList();
this.getDropDownData();



   }

  ngOnInit(): void {
  }
  

  getDropDownData()
  {
    this.adminService.getApplicationTrackingDropDownData().subscribe(res => {

      this.stateDropdown=res.statedropdown;
      this.cityDropdown=res.citydropdown
     
    
      this.getHospitalList()

    }, error => {
      console.log(error);
    });
  }
searchReset()
{
  this.SearchTerms = "";
  this.SearchState=0;
  this.SearchType=null;
  this.SearchCity=0;
  this.limit = 10;
  this.getHospitalList();

}
 
   getHospitalList() {
    

    
    this.adminService.getCertifiedHospData(this.SearchTerms,this.SearchType,this.SearchState,this.SearchCity,0, this.limit).subscribe(res => {

      this.hospitalList = res;
      this.totalCount = this.hospitalList.total;
      console.log(res);

    }, error => {
      console.log(error);
    });

  }

  pageChanged(pageNo)
  {
    
    this.minCount = 1 + (this.limit * (pageNo - 1));
    this.maxCount = this.limit + (this.limit * (pageNo - 1));

    if (this.totalCount < this.maxCount) {
      this.maxCount = this.totalCount;
    }

    this.skip = ((pageNo - 1) * this.limit);
    this.adminService.getCertifiedHospData(this.SearchTerms,this.SearchType,this.SearchState,this.SearchCity,this.skip, this.limit).subscribe(res => {

      this.hospitalList = res;
      console.log(res);

    }, error => {
      console.log(error);
    });


  }
  showEnteries() {
    this.skip = 0;
    this.getHospitalList();
  }
  
 
 

}
export class CertifiedHospitalList
{
  current:number
  total :number
  rowCount :number
  rows:CertifiedHospitalDto[]
}

export class CertifiedHospitalDto
{
  hosp_id:number
  reference_id:String
  org_name:String
  state_id:number
  state:String
  type:String
  certificate_no:String
  registration_date:Date
  stage:String
 
  stage_id:number
  disrictid:number
  district:String
  status:boolean
  valid_from:Date
  valid_to:Date

 
  

}
export class StageHistory
{
  stage_id:number
  stage :string
  creation_date:Date
}
class dropDownData
{
    value:number
    text:String

}