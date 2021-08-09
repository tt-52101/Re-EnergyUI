import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../../../core/services/auth.service';

import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HospitalDataShareService } from 'src/app/pages/modules/hospital/hospital/datashareservice/hospitalDataShare.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  loading = false;
  alertmsg = null;
  savemobileloading = false;
  saveemailloading = false;
  mobileoptgenrationloading = false;
  emailoptgenrationloading = false;
  verifymobileotploading = false;
  verifyemailotploading = false;
  email_mobile_verification: OtpModel;
  signupForm: FormGroup;
  mobileVerificationForm: FormGroup;
  emailVerificationForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  user: Registraion;
  msg: string;
  state = new Array<State>();
  district = new Array<District>();
  // set the currenr year
  year: number = new Date().getFullYear();
  totalbed: number = 0;

  // tslint:disable-next-line: max-line-length
  constructor(private toastsrvc: ToastrService, private formBuilder: FormBuilder, private hospdataserv: HospitalDataShareService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private modalService: NgbModal) {
    // this.totalBedChangeValue();
  }

  ngOnInit() {


    this.email_mobile_verification = new OtpModel();
    this.user = new Registraion();
    this.signupForm = this.formBuilder.group({
      org_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[^ ]+@[^ ]+\\.[a-z]{2,6}$')]],
      spoc_name: ['', Validators.required],
      // spoc_designation: ['', [Validators.required, Validators.pattern("^$|^[A-Za-z0-9]+")]],
      spoc_designation: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.maxLength(10), Validators.minLength(10)]],
      statecode: [null, Validators.required],
      citycode: [null, Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.maxLength(6), Validators.minLength(6)]],
      // total_bed_strength: ['', [Validators.required, Validators.pattern("[0-9]*")]],
    });

    this.mobileVerificationForm = this.formBuilder.group({
      mobile_no: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.maxLength(10), Validators.minLength(10)]]
    });
    this.emailVerificationForm = this.formBuilder.group({
      email_address: ['', [Validators.required, Validators.pattern('^[^ ]+@[^ ]+\\.[a-z]{2,6}$')]]
    });


    this.getStateList();

    //  this.total_bed_strength_change();
  }
  // total_bed_strength_change() {
  //   this.signupForm.get("total_bed_strength").valueChanges.subscribe(data => {


  //     this.totalbed = data;
  //     if (data > 5000) {
  //       this.signupForm.get("total_bed_strength").setValue(0)
  //     }

  //   })
  // }



  ngAfterViewInit() {

  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit(modal) {
    // this.submitted = true;  

    // stop here if form is invalid
    this.loading = true;

    if (this.signupForm.invalid) {
      this.loading = false;
      this.submitted = true;

      this.toastsrvc.error("Please fill up all the mandatory field");
      // if(this.f.email.errors || this.f.mobile.errors )
      // {
      //   this.alertSweetInvalidEmail();
      // }
      return;
    }
    let otpdata = {
      mobile: this.f.mobile.value,
      email: this.f.email.value,
      otp: ""
    }


    this.http.post<any>(this.authenticationService.apiUrl + "hcoregistration/emailOTPgenration", otpdata).subscribe(data => {
      if (data.isSuccess == false) {
        this.positionError(data.message)
        this.loading = false;
        return;
      }

      this.http.post<any>(this.authenticationService.apiUrl + "hcoregistration/mobileOTPgenration", otpdata).subscribe(data => {

        if (data.isSuccess == false) {
          this.loading = false;
          this.positionError(data.message)
          return;
        }
        this.alertmsg = "An OTP has been sent on the Entered Email ID and Mobile Number";
        //this.positionSuccess("")

        this.mobileVerificationForm.controls.mobile_no.setValue(this.f.mobile.value);
        this.emailVerificationForm.controls.email_address.setValue(this.f.email.value);
        this.email_mobile_verification.email = this.f.email.value;
        this.email_mobile_verification.mobilenumber = this.f.mobile.value;
        this.email_mobile_verification.isemail_otp_verifies = false;
        this.email_mobile_verification.ismobile_otp_verifies = false;
        this.email_mobile_verification.isemail_edit = false;
        this.email_mobile_verification.ismobile_edit = false;
        this.loading = false;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
      }, error => {
        this.loading = false;

      })


    }, error => {
      this.loading = false;
    }

    )
    //  this.alertSweet();


  }



  saveReg() {

    this.hospdataserv.setLoaderStatus(true);
    this.user.org_name = this.f.org_name.value;
    this.user.city = this.f.city.value;
    this.user.address = this.f.address.value;
    this.user.email = this.f.email.value;
    this.user.mobile = this.f.mobile.value;
    this.user.statecode = this.f.statecode.value.statecode;
    this.user.citycode = this.f.citycode.value.id;
    this.user.pincode = this.f.pincode.value;
    this.user.spoc_name = this.f.spoc_name.value;
    this.user.spoc_designation = this.f.spoc_designation.value;


    this.http.post<any>(this.authenticationService.apiUrl + 'hcoregistration', this.user).subscribe((res: any) => {

      if (res.isSuccess) {
        this.hospdataserv.setLoaderStatus(false);
        this.signupForm.reset();
        this.successmsg = true;
        this.msg = res.message;
        //this.positionSuccess(this.msg);
        this.hospdataserv.setRegisteredStatus(true);
        this.router.navigateByUrl('account/login')

      } else {
        this.hospdataserv.setLoaderStatus(false);
        this.successmsg = false;
        this.msg = "";
        this.error = res.message;
        this.positionError(this.error);

      }
    }, error => {
      this.hospdataserv.setLoaderStatus(false);
      console.log(error);
      this.error = error ? error.message : '';
    });

  }

  alertSweetInvalidEmail() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Please fill up all the mandatory field',
        // text: 'Invalid Email.',
        icon: 'warning',
        confirmButtonText: 'Ok',

        showCancelButton: false
      })
      .then(result => {
        result.dismiss === Swal.DismissReason.cancel
      });
  }

  alertSweet() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure you want to submit the registration form?',
        text: 'The details once entered cannot be edited.',
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          // swalWithBootstrapButtons.fire(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // );

          this.saveReg()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
          // this.positionError('msg error')
          return;
        }
      });
  }



  positionSuccess(msg) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 3000
    });
  }

  positionError(msg) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      text: msg,
      showConfirmButton: false,
      timer: 1500
    });
  }


  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  onlyNumberKeyandValidate(event) {

    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;

  }
  onlyAphaKey(event) {

    return (event.charCode == 8 || event.charCode == 0) ? null : (event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122 || event.charCode == 32 || event.charCode == 46
      || event.charCode == 45);
  }
  getStateList() {

    this.http.get<any>(this.authenticationService.apiUrl + 'unauthorized/statelist', {}).subscribe(res => {

      this.state = res;


    }, error => {
      console.log(error);
    });
  }

  selectState(event) {


    if (event == undefined) {
      this.f.city.setValue(null);
      this.f.citycode.setValue(null);
      this.district = null;
    } else {
      var statecode = event.statecode;
    }
    if (statecode == null || statecode == undefined) {
      this.f.city.setValue(null);
      this.f.citycode.setValue(null);
    } else {
      this.f.citycode.setValue(null);
      this.f.city.setValue(null);
      this.getStateWiseDistrictList(statecode);

    }
  }
  // resetDistrict(event, distr) {
  //   //debugger
  //   if (event == undefined) {
  //     this.f.city.setValue(null);
  //     this.f.citycode.setValue(null);
  //     // distr.handleClearClick();
  //     this.district = null;
  //     this.district.splice(0, this.district.length);
  //   }
  // }
  selectDistrict(event) {
    this.f.city.setValue(null);
  }
  getStateWiseDistrictList(statecode) {
    this.http.get<any>(this.authenticationService.apiUrl + 'unauthorized/district/' + statecode).subscribe(res => {

      this.district = res;


    }, error => {
      console.log(error);
    });
  }
  editMobileNo() {
    this.email_mobile_verification.ismobile_edit = true;
  }
  saveMobileNo() {
    this.savemobileloading = true;
    if (this.mobileVerificationForm.invalid) {
      this.positionError('Invalid Mobile Number');
      this.savemobileloading = false;
      return;
    }
    this.email_mobile_verification.ismobile_edit = false;
    let mobno = this.mobileVerificationForm.controls.mobile_no.value;
    this.f.mobile.setValue(mobno);
    this.email_mobile_verification.mobilenumber = mobno;
    this.savemobileloading = false;

    // this.regenrateMobileOtp();
  }
  editEmailAddress() {
    this.email_mobile_verification.isemail_edit = true;

  }
  saveEmailAddress() {
    this.saveemailloading = true;
    if (this.emailVerificationForm.invalid) {
      this.saveemailloading = false;
      this.positionError('Invalid Email Address');
      return;
    }
    let emailadd = this.emailVerificationForm.controls.email_address.value;
    this.email_mobile_verification.isemail_edit = false;
    this.f.email.setValue(emailadd);
    this.email_mobile_verification.email = emailadd;

    this.saveemailloading = false;
    //this.regenrateEmailOtp();


  }
  verifyMobileOtp() {
    this.verifymobileotploading = true;
    if (this.mobileVerificationForm.invalid) {
      this.positionError('Invalid Mobile Number');
      this.verifymobileotploading = false;
      return;
    }
    let mobno = this.mobileVerificationForm.controls.mobile_no.value;
    let data = {
      mobile: mobno,
      email: "",
      otp: this.email_mobile_verification.mobileOtp
    }
    this.http.post<any>(this.authenticationService.apiUrl + "hcoregistration/verifyMobileOtp", data).subscribe(data => {


      if (data.isSuccess) {
        this.verifymobileotploading = false;
        this.email_mobile_verification.ismobile_otp_verifies = true;
        this.positionSuccess(data.message);
      }
      else {
        this.verifymobileotploading = false;
        this.positionError(data.message);
      }

    }, error => {
      this.verifymobileotploading = false;
    })


  }
  verifyEmailOtp() {
    this.verifyemailotploading = true;
    if (this.emailVerificationForm.invalid) {
      this.verifyemailotploading = false;
      this.positionError('Invalid Email');
      return;
    }
    let emailadd = this.emailVerificationForm.controls.email_address.value;
    let data = {
      mobile: "",
      email: emailadd,
      otp: this.email_mobile_verification.emailOtp
    }
    this.http.post<any>(this.authenticationService.apiUrl + "hcoregistration/verifyEmailOtp", data).subscribe(data => {
      if (data.isSuccess) {
        this.verifyemailotploading = false;
        this.email_mobile_verification.isemail_otp_verifies = true;
        this.positionSuccess(data.message);
      }
      else {
        this.verifyemailotploading = false;
        this.positionError(data.message);
      }

    }, error => {
      this.verifyemailotploading = false;

    })

  }
  regenrateMobileOtp() {

    this.mobileoptgenrationloading = true;
    let otpdata = {
      mobile: this.mobileVerificationForm.controls.mobile_no.value,
      email: "",
      otp: ""
    }
    this.http.post<any>(this.authenticationService.apiUrl + "hcoregistration/mobileOTPgenration", otpdata).subscribe(data => {
      if (data.isSuccess) {
        this.mobileoptgenrationloading = false;
        this.positionSuccess(data.message);
      }
      else {
        this.mobileoptgenrationloading = false;
        this.positionError(data.message);
      }


    }, error => {
      this.mobileoptgenrationloading = false;
    })

  }
  regenrateEmailOtp() {

    this.emailoptgenrationloading = true;
    let otpdata = {
      mobile: "",
      email: this.emailVerificationForm.controls.email_address.value,
      otp: ""
    }
    this.http.post<any>(this.authenticationService.apiUrl + "hcoregistration/emailOTPgenration", otpdata).subscribe(data => {
      if (data.isSuccess) {
        this.emailoptgenrationloading = false;
        this.positionSuccess(data.message);
      }
      else {
        this.emailoptgenrationloading = false;
        this.positionError(data.message);
      }

    }, error => {
      this.emailoptgenrationloading = false;
    })


  }
  registrationAction() {
    this.modalService.dismissAll();
    this.alertSweet();

  }

}

export class Registraion {
  id: string;
  userid: string;
  org_name: string;
  spoc_name: string;
  spoc_designation: string;
  city: string;
  address: string;
  email: string;
  mobile: string;
  statecode: string;
  citycode: string;
  pincode: string;
  //total_bed_strength: string;
  // name: string;
  // designation: string;
}

class State {
  id: number;
  statename: string;
  statecode: string;
  gstcode: string;
}

class District {
  id: number;
  districtname: string;
  statecode: string;
  gstcode: string;
}
class OtpModel {
  mobilenumber: String
  email: String
  mobileOtp: String
  emailOtp: String
  ismobile_otp_verifies: Boolean
  isemail_otp_verifies: Boolean
  ismobile_edit: Boolean
  isemail_edit: Boolean
}