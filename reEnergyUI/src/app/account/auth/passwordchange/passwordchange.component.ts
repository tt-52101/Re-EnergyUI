import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from "@angular/common";

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.scss', '../passwordreset/passwordreset.component.scss', '../../../layouts/horizontaltopbar/horizontaltopbar.component.scss', './passwordchange.component.scss']
})
export class PasswordchangeComponent implements OnInit {

  year: number = new Date().getFullYear();
  password: String
  confirm_password: String
  submitted
  currentUser: any;
  public username: string = '';
  loading = false;
  @ViewChild('passwordchange', { static: true }) passwordchangeForm: NgForm;
  saveForAsr: boolean = false;


  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private router: Router, private location: Location, private route: ActivatedRoute) {



  }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.username = this.currentUser.org_name;
    let currentUrl = window.location.href;
    if (this.currentUser.roleId == 5) {
      this.saveForAsr = true;
    } else {
      this.saveForAsr = false;
    }

    let tmpVar = currentUrl.includes('/change-password');

    if (currentUrl.includes('/change-password')) {
      window.onpopstate = function (event) {
        history.go(1);
      }
    }
  }
  addEvent(x) {
    x.select = !x.select;
  }

  ChangePassword() {
    this.submitted = true;
    this.loading = true;
    if (this.passwordchangeForm.invalid) {
      this.loading = false;
      return;
    }
    this.http.post<any>(this.authenticationService.apiUrl + 'hospitalSections/passwordchange', { Password: this.password }).subscribe(res => {

      if (res.isSuccess) {
        this.loading = false;
        Swal.fire(res.message);
        let url1 = "account/basicCert";
        this.router.navigateByUrl(url1);
      }

    },
      error => {
        this.loading = false;
      })
  }

  ChangePasswordforAsr() {

    this.submitted = true;
    this.loading = true;
    if (this.passwordchangeForm.invalid) {
      this.loading = false;
      return;
    }
    this.http.post<any>(this.authenticationService.apiUrl + 'assessors/passwordchange', { Password: this.password }).subscribe(res => {

      if (res.isSuccess) {
        this.loading = false;
        Swal.fire(res.message);
        let url1 = "/asrdashboard";
        this.router.navigateByUrl(url1);
      }

    },
      error => {
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
