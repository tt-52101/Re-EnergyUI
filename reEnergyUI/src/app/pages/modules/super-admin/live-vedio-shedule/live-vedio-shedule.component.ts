import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-live-vedio-shedule',
  templateUrl: './live-vedio-shedule.component.html',
  styleUrls: ['./live-vedio-shedule.component.scss']
})
export class LiveVedioSheduleComponent implements OnInit {
  skip:number=0;
  UserModalCaption:string;
  public enties = [25, 50, 100, 200];
  maxDate: { year: number; month: number; day: number; };
  today: Date;
  dummy_data=[
    {date:'1-Aug-2021',no_servces:'12',craetedby:'XXXX',status:'Draft'},
    {date:'29-Jul-2021',no_servces:'12',status:'Published',craetedby:'XXXX',},
    {date:'28-Jul-2021',no_servces:'15',status:'Published',craetedby:'XXXX',},
  ]
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.today = new Date();
    this.maxDate = { year: new Date().getFullYear(), month: this.today.getUTCMonth() + 1, day: this.today.getUTCDate() };
  }
  createSchedule(addScheduleModel){
    this.UserModalCaption='Create Online Video Schedule'
    this.modalService.open(addScheduleModel, { size: 'xl' });
  }
}
