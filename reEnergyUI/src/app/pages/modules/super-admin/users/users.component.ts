import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public enties = [25, 50, 100, 200];
  skip: number = 0;
  dummy_data=[
    {userid:'R000001',username:'Mayra@gmail.com',role:'Admin',status:'Active',creationdate:'1-Aug-2021'},
    {userid:'R000002',username:'Jaoh@and.com',role:'ReEnergy Trainer',status:'Active',creationdate:'1-Aug-2021'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
