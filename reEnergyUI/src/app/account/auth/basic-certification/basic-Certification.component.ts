import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidationErrors, FormArrayName, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { HospitalDataShareService } from 'src/app/pages/modules/hospital/hospital/datashareservice/hospitalDataShare.service';

@Component({
  selector: 'app-basic-Certification',
  templateUrl: './basic-Certification.component.html',
  styleUrls: ['./basic-Certification.component.scss', '../../../layouts/horizontaltopbar/horizontaltopbar.component.scss']

})
export class BasicCertificationComponent implements OnInit, AfterViewInit {

  public username: string = '';
  basicCertForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  basicCert: BasicCertification;
  msg: string;
  // set the currenr year
  year: number = new Date().getFullYear();

  SelectOrganizationType: string;
  SelectedSanctionBedType: string;
  currentUser: any;
  // ayushSystems: Array<any> = [

  //   { id: 0, name: 'Ayurveda' },
  //   { id: 1, name: 'Naturopathy' },
  //   { id: 2, name: 'Unani' },
  //   { id: 3, name: 'Siddha' },
  //   { id: 4, name: 'Homeopathy' }
  // ];



  systemData: Organization[] = [
    { id: 1, name: 'Ayurveda', isselected: false },
    { id: 2, name: 'Yoga', isselected: false },
    { id: 3, name: 'Naturopathy', isselected: false },
    { id: 4, name: 'Unani', isselected: false },
    { id: 5, name: 'Siddha', isselected: false },
    { id: 6, name: 'Homeopathy', isselected: false },
    { id: 7, name: 'Sowa-Rigpa', isselected: false }
  ];

  selectedHospital: boolean = false;
  org: string;
  pop: string;
  pop1: string = "test2"
  loading = false;
  saveIsSucess: boolean = false;
  // tslint:disable-next-line: max-line-length
  constructor(private hospdataserv: HospitalDataShareService, private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    console.log(currentUser);
    this.currentUser = currentUser;
    this.username = this.currentUser.org_name;
    this.basicCert = new BasicCertification();
    this.pop = '<b>Abc</b>';
    this.basicCertForm = this.formBuilder.group({
      SelectOrganizationType: ['', Validators.required],
      SelectSanctionedBed: [null, Validators.required],
      SanctionedBedno: ['', [Validators.required]],
      // ayush_system: ['', [Validators.required]],
      organization: this.formBuilder.array(
        [

          this.formBuilder.group
            (
              { id: [0], text: ['Ayurveda'], isselected: [false] },
            ),
          this.formBuilder.group
            (
              { id: [0], text: ['Yoga'], isselected: [false] },
            ),
          this.formBuilder.group
            (
              { id: [0], text: ['Naturopathy'], isselected: [false] },
            ),
          this.formBuilder.group
            (
              { id: [0], text: ['Unani'], isselected: [false] },
            ),
          this.formBuilder.group
            (
              { id: [0], text: ['Siddha'], isselected: [false] },
            ),
          this.formBuilder.group
            (
              { id: [0], text: ['Homeopathy'], isselected: [false] },
            ),
          this.formBuilder.group
            (
              { id: [0], text: ['Sowa-Rigpa'], isselected: [false] },
            )



        ]
        , {
          validators: (formarry: FormArray) => {
            return this.minOneSelectValidator(formarry)
          }
        }),
    });

    this.basicCertForm.get('SelectSanctionedBed').disable();
    this.basicCertForm.get('SanctionedBedno').disable();


    this.basicCertForm.controls.SelectOrganizationType.valueChanges.subscribe(value => {

      this.basicCertForm.get('SelectSanctionedBed').setValue(null)
      this.basicCertForm.get('SanctionedBedno').setValue(null)
      if (value == 'Hospital') {
        this.basicCertForm.get('SelectSanctionedBed').enable();

      }
      else {
        this.basicCertForm.get('SelectSanctionedBed').disable();
      }

    })

    this.basicCertForm.controls.SelectSanctionedBed.valueChanges.subscribe(value => {

      this.SelectedSanctionBedType = value;
      this.basicCertForm.get('SanctionedBedno').setValue(null)
      if (value != null && value != undefined && value != "") {

        this.basicCertForm.get('SanctionedBedno').enable();
        let validater_list = [
          Validators.required
        ]
        if (value == "51 and above") {

          this.basicCertForm.get('SanctionedBedno').clearValidators();
          this.basicCertForm.get('SanctionedBedno').setValidators(validater_list.concat(this.sanctionBedMax));
          //   this.basicCertForm.get('SanctionedBedno').setValidators(Validators.required);

        }
        else if (value == 'Less than or equal to 50') {
          this.basicCertForm.get('SanctionedBedno').clearValidators();
          this.basicCertForm.get('SanctionedBedno').setValidators(validater_list);
        }



      }
      else {
        this.basicCertForm.get('SanctionedBedno').disable();
      }

    })

    this.basicCertForm.controls.SanctionedBedno.valueChanges.subscribe(value => {

      if (this.basicCertForm.controls.SelectSanctionedBed.value == 'Less than or equal to 50') {

        if (this.basicCertForm.get('SanctionedBedno').value != null || this.basicCertForm.get('SanctionedBedno').value != undefined) {
          let num = this.basicCertForm.get('SanctionedBedno').value as number
          if (num > 50) {
            this.basicCertForm.get('SanctionedBedno').setValue(null);
          }

        }

      }
      let num = this.basicCertForm.get('SanctionedBedno').value as number
      if (num == 0) {
        this.basicCertForm.get('SanctionedBedno').setValue(null);
      }



    })


  }

  minOneSelectValidator(_formary: FormArray): ValidationErrors | null {



    let selectectedcount = 0;
    _formary.controls.forEach(fgroup => {
      if (fgroup.get('isselected').value) {
        selectectedcount++;

      }

    })

    // Object.keys(_formgroup.controls).forEach(key => {

    //   if (_formgroup.get(key).value === true) {
    //     selectectedcount++;
    //   }

    // })

    if (selectectedcount > 0) {
      return null;
    }
    else {
      return { "minOneChecked": true }

    }



  }
  sanctionBedMax(control: FormControl): ValidationErrors | null {


    if (control.value != null && control.value != '' && control.value < 51) {
      return { 'sanctionBedMaxError': true }
    }



    return null;
  };
  ngAfterViewInit() {
  }
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  // convenience getter for easy access to form fields
  get f() { return this.basicCertForm.controls; }
  // get systems() {
  //   return this.signupForm.get('systems');
  // }
  /**
   * On submit form
   */
  onSubmit() {
    this.loading = true;
    // this.alertSweet();

    if (this.basicCertForm.invalid) {
      this.submitted = true;
      this.loading = false;
      return;
    }

    this.alertSweet();
    // this.saveBasicCerData();
    // this.user.organizationType = this.f.organizationType.value;
    // // this.user.systems = this.f.systems.value;


  }
  selectState(event) {

    var statecode = event.target.value;
    // this.getStateWiseDistrictList(statecode);

  }
  getOrganizationFormArray(): any {


    let formarray = this.basicCertForm.get('organization') as FormArray
    return formarray.controls;





  }




  alertSweet() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2',




      },
      buttonsStyling: false
    });
    if (this.f.SelectOrganizationType.value == "Hospital") {
      const ipAPI = this.authenticationService.apiUrl + "unauthorized/delay";
      swalWithBootstrapButtons
        .fire({
          title: 'You have selected to apply for AYUSH Entry Level Hospital Certification. After clicking on Proceed, you will be redirected to fill the Application Form.',
          text: 'The details once submitted will not be editable.',

          icon: 'warning',
          confirmButtonText: 'Proceed',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          showLoaderOnConfirm: true,

          preConfirm: () => {
            return fetch(ipAPI).then
              (response => response.json())
              .then(data => Swal.insertQueueStep(data.ip))
              .catch(() => {
                Swal.insertQueueStep({
                  icon: 'error',
                  title: 'Internal Error Please Try later!'
                })
              })
          },
          allowOutsideClick: () => !Swal.isLoading()

        })
        .then(result => {
          this.hospdataserv.setLoaderStatus(true);
          if (result.isConfirmed) {


            this.saveBasicCerData();


            this.hospdataserv.setLoaderStatus(false);
            // this.hospdataserv.setLoaderStatus(false);
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
            // this.hospdataserv.setLoaderStatus(false);
            this.loading = false;
            return this.hospdataserv.setLoaderStatus(false);
          }
        });
    }
    else if (this.f.SelectOrganizationType.value == "Centre") {
      const ipAPI = this.authenticationService.apiUrl + "unauthorized/delay";
      swalWithBootstrapButtons
        .fire({
          title: 'You have selected to apply for AYUSH Entry Level Centre Certification. After clicking on Proceed, you will be redirected to fill the Application Form.',
          text: 'The details once submitted will not be editable.',
          icon: 'warning',
          confirmButtonText: 'Proceed',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          showLoaderOnConfirm: true,

          preConfirm: () => {
            return fetch(ipAPI).then
              (response => response.json())
              .then(data => Swal.insertQueueStep(data.ip))
              .catch(() => {
                Swal.insertQueueStep({
                  icon: 'error',
                  title: 'Internal Error Please Try later!'
                })
              })

          },
          allowOutsideClick: () => !Swal.isLoading()
        })
        .then(result => {
          if (result.value) {
            !Swal.isLoading();

            this.saveBasicCerData();
            this.hospdataserv.setLoaderStatus(false);

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
            this.loading = false;
            return;
          }

        });

    }
  }


  saveBasicCerData() {


    let ayush_systm: string = null;


    let formarray = this.basicCertForm.get('organization') as FormArray;

    for (let c of formarray.controls) {

      if (c.get("isselected").value) {
        if (ayush_systm == null) {
          ayush_systm = c.get("text").value
        }
        else {
          ayush_systm = ayush_systm + "," + c.get("text").value;
        }

      }
    }



    this.basicCert.id = 0;
    this.basicCert.hospital_id = this.currentUser.hospital_id;
    // this.basicCert.ayush_system = this.f.org.value;
    this.basicCert.ayush_system = ayush_systm;

    this.basicCert.organization_type = this.f.SelectOrganizationType.value;
    this.basicCert.sanctioned_bed_category = this.f.SelectSanctionedBed.value;
    this.basicCert.sanctioned_bed_no = this.f.SanctionedBedno.value;

    this.http.post<any>(this.authenticationService.apiUrl + "basicCert", this.basicCert).subscribe(res => {

      if (res.isSuccess) {
        var refreshToken = this.currentUser.refreshToken;
        this.authenticationService.refreshToken_1(refreshToken).subscribe(data => {

          localStorage.setItem('ayushCurrentUser', JSON.stringify(data));
          // this.loading = false;
          const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
          // this.hospdataserv.setLoaderStatus(false);
          this.router.navigateByUrl(currentUser.navigation[0].url);

        })




      } else {
        this.loading = false;


      }
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

  toggleWithGreeting(popover, greeting: string, language: string) {
    popover.open({ greeting, language });
  }

}

export class BasicCertification {
  id: number;
  hospital_id: number;
  organization_type: string;
  ayush_system: string;
  sanctioned_bed_category: string;
  sanctioned_bed_no: string;

}
export interface AyushSystems {
  key: number;
  value: string;
}

class Organization {
  id: number;
  name: string;
  isselected?: boolean;
}