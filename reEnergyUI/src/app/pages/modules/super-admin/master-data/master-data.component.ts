import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {
  public enties = [25, 50, 100, 200];
  skip:number=0;
  dummy_data=[
    {centertype:'Fitness Centre',service:'Zumba'},
    {centertype:'Fitness Centre',service:'Yoga'},
    {centertype:'Fitness Centre',service:'Pilate'},
    {centertype:'Beauty',service:'Haircut'},
    {centertype:'Beauty',service:'Nails'},
    {centertype:'Beauty',service:'Makeup'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
