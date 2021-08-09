import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public enties = [25, 50, 100, 200];
  skip:number=0;
  constructor() { }

  ngOnInit(): void {
  }

}
