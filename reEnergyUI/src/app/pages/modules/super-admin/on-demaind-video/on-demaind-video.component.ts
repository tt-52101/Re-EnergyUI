import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-on-demaind-video',
  templateUrl: './on-demaind-video.component.html',
  styleUrls: ['./on-demaind-video.component.scss']
})
export class OnDemaindVideoComponent implements OnInit {
  public enties = [25, 50, 100, 200];
  UserModalCaption:string;
  skip:number=0
  dummy_data = [
    {category:'Zumba',session_time:20,trailer:'Yes',sessn_view:'Yes',status:'Live'},
    {category:'Yoga',session_time:30,trailer:'Yes',sessn_view:'Yes',status:'Draft'},
  ]
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  addVideo(addVideoModel){
    this.UserModalCaption='Create New Video'
    this.modalService.open(addVideoModel, { size: 'lg' });
  }
}
