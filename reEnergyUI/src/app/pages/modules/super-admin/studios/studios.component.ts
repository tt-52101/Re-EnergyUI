import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studios',
  templateUrl: './studios.component.html',
  styleUrls: ['./studios.component.scss']
})
export class StudiosComponent implements OnInit {
  skip:number = 0;
  dummy_data=[
    {studio_id:'REP000001',name:'GETFIT Fitness Club',state:'Vienna',type:'Fitness Centre',status:'Active',category:'standard'},
    {studio_id:'REP000002',name:'VIVAMAYR',state:'Maria Worth',type:'Wellness Centre',status:'Active',category:'Luxury'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
