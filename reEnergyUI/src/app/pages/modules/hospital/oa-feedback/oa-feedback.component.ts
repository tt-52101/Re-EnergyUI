import { Component, OnInit, ViewChild } from '@angular/core';
import { Assessorfeedback, AssessorfeedbackDTO, SecondAssessorfeedback } from 'src/app/pages/model/assessor_feedback.model';
import { NgForm } from '@angular/forms';
import { OaFeedbackService } from '../../../api-services/oa-feedback.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-oa-feedback',
  templateUrl: './oa-feedback.component.html',
  styleUrls: ['./oa-feedback.component.scss']
})
export class OAFeedbackComponent implements OnInit {
  assessorfeedback: Assessorfeedback;
  secondAssessorfeedback: SecondAssessorfeedback;
  assessorfeedbackDto: AssessorfeedbackDTO;
  error = '';
  successmsg = false;
  msg: any;
  currentUser: any;
  hospital_id: number;
  assessorData: AssessorfeedbackDTO;
  orgname: any;
  // rating_text: string[] = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  loading: boolean = false;
  loading2: boolean = false;
  formSubmitted: boolean = false;
  @ViewChild('feedbackAssessorOneForm') feedbackAssessorOneForm: NgForm;
  @ViewChild('feedbackAssessorSecondForm') feedbackAssessorSecondForm: NgForm;
  constructor(private feedbackService: OaFeedbackService, private router: Router,) {
    this.assessorfeedback = new Assessorfeedback();
    this.secondAssessorfeedback = new SecondAssessorfeedback();
    this.currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    this.hospital_id = this.currentUser.hospital_id
    this.orgname = this.currentUser.org_name;

  }

  ngOnInit(): void {

    this.assessorfeedbackDto = new AssessorfeedbackDTO();

    this.assessorfeedbackDto.hospital_id = 0;
    this.assessorfeedbackDto.asmtid = 0;
    this.assessorfeedbackDto.pasr_id = 0;
    this.assessorfeedbackDto.sasr_id = 0;
    this.assessorfeedbackDto.asmtdate = new Date;
    this.assessorfeedbackDto.orgname = "";
    this.assessorfeedbackDto.pasr_name = "";
    this.assessorfeedbackDto.sasr_name = "";

    this.getAssessorDta();
  }

  getAssessorDta() {

    this.feedbackService.getFeedbackData(this.hospital_id).subscribe(res => {

      this.assessorfeedbackDto = res;
      debugger
      this.secondAssessorfeedback = res.s_asrfeedback;
      this.assessorfeedback = res.p_asrfeedback;
    })
  }
  saveAssessorData(savetype) {
    debugger
    // if (savetype == 1) {

    //   if (this.assessorfeedbackDto.sasr_id > 0) {
    //     if (this.feedbackAssessorOneForm.invalid || this.feedbackAssessorSecondForm.invalid) {
    //       Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
    //       this.formSubmitted = true;
    //       this.loading2 = false;
    //       this.loading = false;
    //       return;
    //     }
    //   } else {
    //     if (this.feedbackAssessorOneForm.invalid) {
    //       Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
    //       this.formSubmitted = true;
    //       this.loading2 = false;
    //       this.loading = false;
    //       return;
    //     }
    //   }

    //   this.loading = true;
    // } 
    if (savetype == 2) {
      this.loading2 = true;
      //  this.formSubmitted = true;

    }


    this.assessorfeedbackDto.hospital_id = this.hospital_id;
    this.assessorfeedbackDto.p_asrfeedback = this.assessorfeedback;
    if (this.assessorfeedbackDto.sasr_id > 0) {
      this.assessorfeedbackDto.s_asrfeedback = this.secondAssessorfeedback;
    } else {
      this.assessorfeedbackDto.s_asrfeedback = new SecondAssessorfeedback();
    }

    this.feedbackService.saveFeedbackData(this.assessorfeedbackDto, savetype).subscribe(res => {
      console.log(res);
      if (res.isSuccess) {

        this.successmsg = true;
        this.loading = false;
        this.loading2 = false;
        this.msg = res.message;
        this.positionSuccess(this.msg);
        this.getAssessorDta();
        if (savetype == 1) {
          this.router.navigateByUrl('hospitaldashboard');
        }
      }
      else {
        this.successmsg = false;
        this.loading = false;
        this.loading2 = false;
        this.msg = "";
        this.error = res.message;
        this.positionError(this.error);
        this.getAssessorDta();
      }

    }, error => {
      this.loading2 = false;
      this.loading = false;
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

  alertSweet(savetype) {
    if (savetype == 1) {

      if (this.assessorfeedbackDto.sasr_id > 0) {
        if (this.feedbackAssessorOneForm.invalid || this.feedbackAssessorSecondForm.invalid) {
          Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
          this.formSubmitted = true;
          this.loading2 = false;
          this.loading = false;
          return;
        }
      } else {
        if (this.feedbackAssessorOneForm.invalid) {
          Swal.fire("", "<p style='font-size: 1.5em'> Please fill all required field </p>");
          this.formSubmitted = true;
          this.loading2 = false;
          this.loading = false;
          return;
        }
      }

      this.loading = true;
    }
    this.assessorfeedbackDto.hospital_id = this.hospital_id;
    this.assessorfeedbackDto.p_asrfeedback = this.assessorfeedback;
    if (this.assessorfeedbackDto.sasr_id > 0) {
      this.assessorfeedbackDto.s_asrfeedback = this.secondAssessorfeedback;
    } else {
      this.assessorfeedbackDto.s_asrfeedback = new SecondAssessorfeedback();
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2',
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure you want to submit the OA Feedback? ',
        text: 'The details once submitted cannot be edited.',

        icon: 'warning',
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        showLoaderOnConfirm: true,

        allowOutsideClick: () => !Swal.isLoading()

      })
      .then(result => {

        if (result.isConfirmed) {
          this.feedbackService.saveFeedbackData(this.assessorfeedbackDto, savetype).subscribe(res => {
            console.log(res);
            if (res.isSuccess) {

              this.successmsg = true;
              this.loading = false;
              this.loading2 = false;
              this.msg = res.message;
              this.positionSuccess(this.msg);
              this.getAssessorDta();
              if (savetype == 1) {
                this.router.navigateByUrl('hospitaldashboard');
              }
            }
            else {
              this.successmsg = false;
              this.loading = false;
              this.loading2 = false;
              this.msg = "";
              this.error = res.message;
              this.positionError(this.error);
              this.getAssessorDta();
            }

          }, error => {
            this.loading2 = false;
            this.loading = false;
          });

        } else if (

          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel

        ) {

          this.loading = false;

        }
      });


  }
}
