import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

import { error } from '@angular/compiler/src/util';
import * as moment from 'moment';



@Component({
  selector: 'hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['../userlist/user-list.component.scss']
})
export class HospitalListComponent implements OnInit {



  constructor(
    private router: Router,
    private http: HttpClient) {




  }

  ngOnInit() {



    // this.GetAllDaList();
  }
}