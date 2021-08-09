import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core'; // rrc - ElementRef
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FileUploadService } from 'src/app/pages/api-services/fileupload.service';
import { CustomTosterServiceService } from 'src/app/customtoster-service/customTosterService.service';
import Swal from 'sweetalert2';
import { FileViewOrDelete } from 'src/app/pages/model/FileViewOrDelete.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paycollect } from 'src/app/pages/model/paycollect';
import { Observable, interval, Subscription } from 'rxjs'; // rrc

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss']
})

export class CCDecisionComponent implements OnInit {
 // @ViewChild('dicisionForm') dicisionForm: NgForm;
 
cc_decision:CcdecisionModel;
recommended :boolean |null;
non_recommended : boolean |null;
pending_recommended :boolean |null;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private uploadService: FileUploadService,
    private tostr: CustomTosterServiceService, private modalService: NgbModal) {

   this.cc_decision = new CcdecisionModel();
  }

  ngOnInit(): void {

    dicisionForm:NgForm

  }




} // ends export


export class paymentDetails {
  hospital_type: String;
  sanctioned_bed_no: String
  billing_info: BillingInfo = new BillingInfo();
  shipping_info: ShippingInfo = new ShippingInfo();
  payment_summary: PaymentSummary = new PaymentSummary();
  all_paydetails: PayCollectionDetails[] = []; // rrc

  // rrc
  hospid: number;
  userid: number;
  // rrc

}
export class BillingInfo {
  org_name: String;
  country: String;
  state: String;
  district: String;
  email: String;
  mobileno: String;
  pincode: String;
  address: String;
  pan: String;
  tan: String;
  tradename: String;
  gstin: String;
  gstno: String;
  gstcertficate: String;
  city: String; // rrc
}
export class ShippingInfo {
  name: String;
  country: String;
  state: String;
  district: String;
  contactno: String;
  pincode: String;
  address: String;
  city: String; // rrc
}
export class PaymentSummary {
  tds_amount: boolean;
  qci_pan: String;
  qci_tan: String;
  qci_gstin: String;


}

//rrc
export class PayCollectionDetails {
  id: number;
  application_type: String;
  amount: number;
  transaction_no: number;
  payment_mode: String;
  payment_date: Date;
}
//rrc


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

// rrc
class CcAvenueOperationResult {
  isSuccess: boolean;
  Message: string;
  encRequest: string;
  strAccessCode: string;
  id: number;
}
// rrc
 class CcdecisionModel{
  recommended:boolean; 
  not_recommended:boolean;
  pending:boolean;
}