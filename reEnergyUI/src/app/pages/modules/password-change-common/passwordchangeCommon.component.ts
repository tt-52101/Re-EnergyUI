import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from "@angular/common";

@Component({
  selector: 'app-passwordchangeCommon',
  templateUrl: './passwordchangeCommon.component.html',
  styleUrls: ['./passwordchangeCommon.component.scss']
})
export class PasswordchangeCommonComponent implements OnInit {

  year: number = new Date().getFullYear();
  password: String
  confirm_password: String
  submitted
  currentUser: any;
  public username: string = '';
  loading = false;
  @ViewChild('passwordchange', { static: true }) passwordchangeForm: NgForm;


  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private router: Router, private location: Location, private route: ActivatedRoute) {



  }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.username = this.currentUser.userName;
    let currentUrl = window.location.href;
    let tmpVar = currentUrl.includes('/password-change');

    if (currentUrl.includes('/password-change')) {
      window.onpopstate = function (event) {
        history.go(1);
      }
    }
  }
  addEvent(x) {
    x.select = !x.select;
  }

  ChangePassword() {
    this.loading = true;
    this.submitted = true;
    if (this.passwordchangeForm.invalid) {
      this.loading = false;
      return;
    }
    this.http.post<any>(this.authenticationService.apiUrl + 'dashboard/passwordchange', { Password: this.password }).subscribe(res => {

      if (res.isSuccess) {
        this.loading = false;
        Swal.fire(res.message);
        this.submitted = false;
        this.passwordchangeForm.resetForm();

        if (this.currentUser.roleId == 1)//superadmin
        {
          this.router.navigateByUrl("/superadmindashboard");

        }
        if (this.currentUser.roleId == 2)//admin
        {
          this.router.navigateByUrl("/admindashboard");

        }
        if (this.currentUser.roleId == 3)//hco
        {
          this.router.navigateByUrl("/hospitaldashboard");

        }
        if (this.currentUser.roleId == 5)//assessor
        {
          this.router.navigateByUrl("/asrdashboard");

        }


      }

    },
      error => {
        //debugger
        this.loading = false;
      })
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/account/login']);
  }
  toggleMenubar() {
    const element = document.getElementById('topnav-menu-content');
    element.classList.toggle('show');
  }
}
