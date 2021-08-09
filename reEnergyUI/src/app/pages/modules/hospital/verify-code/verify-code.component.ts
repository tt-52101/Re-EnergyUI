import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
  UserModalCaption:string;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  validatemodel(addvalidmodel){
    this.UserModalCaption='Code is Verified'
    this.modalService.open(addvalidmodel, { size: 'lg' });
  }
}
