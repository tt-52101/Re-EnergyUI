import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  public enties = [25, 50, 100, 200];

  dummy_data=[
   {centertype:'Fitness',category:'Standard',passcategry:'Daily Pass'},
   {centertype:'Fitness',category:'Standard',passcategry:'Monthly'},
   {centertype:'Fitness',category:'Standard',passcategry:'5-day Pass'},
   {centertype:'Fitness',category:'Standard',passcategry:'10-day Pass'},
   {centertype:'Fitness',category:'Basic',passcategry:'Daily Pass'},
   {centertype:'Fitness',category:'Luxury',passcategry:'Daily Pass'},
   {centertype:'Wellness',category:'Standard',passcategry:'Daily Pass'},
   {centertype:'Wellness',category:'Standard',passcategry:'Monthly Pass'},
   {centertype:'Wellness',category:'Standard',passcategry:'5-day Pass'},
   {centertype:'Wellness',category:'Standard',passcategry:'10-day Pass'},
   {centertype:'Wellness',category:'Basic',passcategry:'Daily Pass'},
   {centertype:'Wellness',category:'Luxury',passcategry:'Daily Pass'},
   {centertype:'On Demand',category:'',passcategry:'Daily Pass'},
   {centertype:'On Demand',category:'',passcategry:'Monthly Pass'},
   {centertype:'Live Video',category:'',passcategry:'5 WorkOuts'},
   {centertype:'Live Video',category:'',passcategry:'10 WorkOuts'},
   {centertype:'Live Video',category:'',passcategry:'Monthly Unlimited'},
  ]
 
  skip: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
