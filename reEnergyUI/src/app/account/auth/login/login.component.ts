import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  registrationSuccess = false;


  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
  
   


  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$")]],
      password: ['', Validators.required],
    });

    // reset login status
    this.authenticationService.logout();
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
   // debugger
    this.loading = true;
    this.submitted = true;
    // this.error = "";

    if (this.loginForm.controls.password.errors?.required || this.loginForm.controls.email.errors?.required) {
      this.error = "Please enter your User ID and Password";
    }
    // else if (this.loginForm.controls.email.errors?.pattern) {
    //   this.error = "The entered User ID or Password is invalid";
    // }

    else {
      this.error = null;

    }
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading = false;
      return;

    }

    this.http.post<any>(this.authenticationService.apiUrl + "tokens", { userName: this.f.email.value, password: this.f.password.value, grant_type: 'password', refreshToken: '' })
      .subscribe(data => {
        localStorage.setItem('ayushCurrentUser', JSON.stringify(data));

        if (data.accessToken) {
          const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));

          console.log(".. currentUser ..");
          console.log(currentUser);
        //  debugger
          if (currentUser)

            if (currentUser.roleId == 3) {

              if (currentUser.is_basic_cert_applied === false) {

                if (currentUser.isfirsttime_login) {
                  let url1 = "account/change-password";
                  // let url1 = "account/basicCert";
                  this.router.navigateByUrl(url1);

                }
                else {
                  let url1 = "account/basicCert";
                  this.router.navigateByUrl(url1);
                }


              } else {
                this.router.navigateByUrl(currentUser.navigation[0].url);
              }
            }
            else if (currentUser.roleId == 5) {

              if (currentUser.isfirsttime_login) {
                let url1 = "account/change-password";
                // let url1 = "account/basicCert";
                this.router.navigateByUrl(url1);

              }
              else {
                this.router.navigateByUrl(currentUser.navigation[0].url);
              }



            }
            else if (currentUser.roleId == 9) {
              this.router.navigateByUrl("ccdashboard");
            }
            else {
              this.router.navigateByUrl(currentUser.navigation[0].url);
            }
        }

        this.loading = false;
      }, error => {

        this.error = "The entered User ID or Password is invalid"
        console.log(error);
        this.loading = false;
      })



    // this.authenticationService.login(this.f.email.value, this.f.password.value).subscribe(res => {

    //   // this.loginResponse = data;

    //   localStorage.setItem('ayushCurrentUser', JSON.stringify(res));

    //   if (res.accessToken) {
    //     const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    //     if (currentUser) {
    //       this.router.navigateByUrl(currentUser.navigation[0].url);
    //     }
    //   }
    // }, error => {

    // })

    // this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
    //   this.router.navigate(['/dashboard']);
    // })
    //   .catch(error => {
    //     this.error = error ? error : '';
    //   });
  }

  addEvent(x) {
    x.select = !x.select;
  }

}
