import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public enties = [25, 50, 100, 200];
  skip:number=0;
  constructor() { }

  ngOnInit(): void {
  }

}
