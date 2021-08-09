import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
  rootUrl: string;
  user_email: '';
  msg = '';
  isPasswordLinkSent = false;
  IsLinkExpired = false;

  // set the currenr year
  year: number = new Date().getFullYear();
  email: '';
  errormsg = null;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {

    this.rootUrl = authenticationService.apiUrl;
    debugger
    this.IsLinkExpired = authenticationService.linkexpired;
  }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;

    if (this.resetForm.controls.email.errors?.required) {
      this.errormsg = "Please enter User ID"
    }
    else if (this.resetForm.controls.email.errors?.pattern) {
      this.errormsg = "The entered User ID is invalid"
    }
    else {
      this.errormsg = null;
    }
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }

    // this.authenticationService.resetPassword(this.f.email.value)
    //   .catch(error => {
    //     this.error = error ? error : '';
    //   });

    this.ChangePassword();
  }


  ChangePassword() {

    this.isPasswordLinkSent = false;

    this.loading = true;

    this.http.post<any>(this.rootUrl + 'unauthorized/forgotPassword', { email: this.resetForm.get('email').value, uid: "" }).subscribe(data => {
      if (data.isSuccess == true) {
        this.isPasswordLinkSent = true;
        this.loading = false;
        //  this.router.navigateByUrl("account/login");
      }

      else
        // alert(data.message);
        // Swal.fire('The entered User ID is invalid');
        // Swal.fire('The entered User ID is invalid');
        this.errormsg = "The entered User ID is invalid";
      this.loading = false;
      // Swal.fire({
      //   title: '<span style="color:#FF0000"><span>The entered User ID is invalid',


      // });


    },
      error => {
        this.msg = 'Something gone wrong !!';
        //console.log(error);
        //console.log(JSON.stringify(error));
        return;
      });
  }
}
