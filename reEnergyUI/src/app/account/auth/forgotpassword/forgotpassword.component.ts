import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from "@angular/common";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss', '../passwordreset/passwordreset.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  year: number = new Date().getFullYear();
  password: String
  confirm_password: String
  submitted
  uniqueid: String
  loading = false;
  @ViewChild('passwordchange', { static: true }) passwordchangeForm: NgForm;



  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private router: Router, private location: Location, private route: ActivatedRoute) {

    this.route.queryParams
      .subscribe(params => {


        let uid_exist = params.hasOwnProperty("uid");
        if (uid_exist == false) {
          let url = "error";
          this.router.navigateByUrl(url);
          //redirect to error page
        }
        else {
          let u_id = params.uid;

          this.http.post<any>(this.authenticationService.apiUrl + 'unauthorized/checkLinkExpiration', { email: "", uid: u_id }).subscribe(res => {


            if (res.isSuccess) {
              this.uniqueid = u_id;

            }
            else {

              this.authenticationService.linkexpired = true;
              let url = "/account/reset-password";
              this.router.navigateByUrl(url);

            }

          })



        }



      })


  }

  ngOnInit(): void {

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

    this.http.post<any>(this.authenticationService.apiUrl + 'unauthorized/forgotpasswordchange', { password: this.password, uid: this.uniqueid }).subscribe(res => {

      if (res.isSuccess) {
        this.loading = false;
        Swal.fire(res.message);
        let url1 = "account/login";
        this.router.navigateByUrl(url1);
      }
      else {
        this.loading = false;

        let url = "error";

        this.router.navigateByUrl(url);
      }

    },
      error => {
        this.loading = false;
        let url = "error";
        this.router.navigateByUrl(url);
      })
  }

}
