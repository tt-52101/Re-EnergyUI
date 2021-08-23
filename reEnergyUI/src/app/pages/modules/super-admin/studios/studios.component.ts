import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  UserModalCaption:string;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  addStudio(addStudioModel){
    this.UserModalCaption='Add New Studio Details'
    this.modalService.open(addStudioModel, { size: 'lg' });
  }
  addStudioService(openmodel){
    this.modalService.open(openmodel, { size: 'lg' });
  }
}
