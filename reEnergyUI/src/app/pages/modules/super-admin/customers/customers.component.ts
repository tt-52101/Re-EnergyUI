import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public enties = [25, 50, 100, 200];
  skip:number=0;
  UserModalCaption: string = "";
  dummy_data=[
    {pass:'Monthly Pass',date:'1-Jul-2021',payment:'300',centertype:'Fitness',category:'Luxury',sevicestaken:'12',pending:'-'},
    {pass:'5-Day Pass',date:'1-May-2021',payment:'30',centertype:'Fitness',category:'Luxury',sevicestaken:'5',pending:'-'}
  ]
  dummy_datas=[
    {customerid:'REP-C-000001',customename:'XXXX XXX',userid:'James@gmail.com',paymentdone:'24000',notificatn:'Yes',lastlogin:'1-Aug-2021'},
    {customerid:'REP-C-000002',customename:'YYYYY',userid:'Jaoh@and.com',paymentdone:'3000',notificatn:'Yes',lastlogin:'1-Jul-2021'},
    
  ]
 
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  viewdeatils(viewCustomerModel:any){
    this.UserModalCaption='View Customer Details'
    this.modalService.open(viewCustomerModel, { size: 'lg' });
  }
  paymentHistory(paymentHistoryModel){
    this.UserModalCaption='Payment History'
    this.modalService.open(paymentHistoryModel, { size: 'xl' });
  }
  addnotification(addNotificationModel){
    this.modalService.open(addNotificationModel, { size: 'lg' });
  }
}
