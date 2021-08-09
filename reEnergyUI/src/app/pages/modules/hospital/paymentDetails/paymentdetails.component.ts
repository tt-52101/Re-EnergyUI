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
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.scss']
})

export class PaymentDetailsComponent implements OnInit {

  @ViewChild('PaymentForm', { static: false }) paymentForm: NgForm;
  payment_details: paymentDetails;
  state = new Array<State>();
  district = new Array<District>();
  submitted: boolean = false;
  public currentObj: any;
  public propertyname: any;
  public selectedFile: any;
  ary_uploadedDocs: FileViewOrDelete[] = new Array();
  base_amount = 0;
  tds_deducted = 0;
  total_amount = 0;
  gst_amount = 0;
  final_amount;

  @Output() deleteFile = new EventEmitter();

  // rrc
  payCol: Paycollect;
  PaymentFor: string;
  ShowPayBtn: boolean = false;
  encRequest: String;
  accessCode: String;
  @ViewChild('form', { static: false }) form: ElementRef;
  private sub;
  hidden_spinner: boolean = true;
  selectedState: String;
  selectedDistrict: String;
  // rrc
  rptUrl; string;
  currentUser: any;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private uploadService: FileUploadService,
    private tostr: CustomTosterServiceService, private modalService: NgbModal) {
    const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
    console.log(currentUser);
    this.currentUser = currentUser;
    this.rptUrl = this.authenticationService.rptUrl;
    this.payment_details = new paymentDetails();

    // rrc
    this.payCol = new Paycollect();
    this.selectedState = "";
    this.selectedDistrict = "";
    this.PaymentFor = authenticationService.PaymentFor;
    this.ShowPayBtn = false;
    this.hidden_spinner = true;
    // rrc

    this.getHospitalDetalForPayment();
  }

  ngOnInit(): void {


  }

  getHospitalDetalForPayment() {
    this.http.get<any>(this.authenticationService.apiUrl + 'hospitalSections/GetHospDataForPayment', {}).subscribe(res => {

      this.payment_details = res;
      this.ShowPayBtn = false; // rrc

      console.log(".. this.payment_details ..");
      console.log(this.payment_details)

      if (this.payment_details.hospital_type.trim() == 'Hospital') {
        let sanctionedbed = Number(this.payment_details.sanctioned_bed_no);
        if (sanctionedbed <= 50) {
          this.base_amount = 21000;
          this.total_amount = this.base_amount
          this.gst_amount = (0.18 * this.total_amount);
          this.final_amount = this.total_amount + this.gst_amount;
        }
        else {
          this.base_amount = 52000;
          this.total_amount = this.base_amount
          this.gst_amount = (0.18 * this.total_amount);
          this.final_amount = this.total_amount + this.gst_amount;
        }
      }
      else {
        this.base_amount = 11000;
        this.total_amount = this.base_amount
        this.gst_amount = (0.18 * this.total_amount);
        this.final_amount = this.total_amount + this.gst_amount;
      }

      // rrc
      this.payCol.userid = this.payment_details.userid;
      this.payCol.hospitalid = this.payment_details.hospid;
      this.payCol.billing_name = this.payment_details.billing_info.org_name;
      this.payCol.billing_address = this.payment_details.billing_info.address;
      this.payCol.billing_state = this.payment_details.billing_info.state;
      this.payCol.billing_city = this.payment_details.billing_info.city;
      this.payCol.billing_district = this.payment_details.billing_info.district;

      this.payCol.gstin = this.payment_details.billing_info.gstin;
      this.payCol.pan = this.payment_details.billing_info.pan;
      this.payCol.tan = this.payment_details.billing_info.tan;
      this.payCol.gstcertificate = this.payment_details.billing_info.gstcertficate;
      this.payCol.gststatus = this.payment_details.billing_info.gstin;
      this.payCol.gstin = this.payment_details.billing_info.gstno;
      this.payCol.tradename = this.payment_details.billing_info.tradename;

      this.payCol.amount = this.final_amount;
      this.payCol.gst_amount = this.gst_amount;
      this.payCol.totalamtwithgst = this.final_amount;
      this.payCol.payableamount = this.payCol.totalamtwithgst;

      if (this.payCol.payableamount > 0) {
        this.ShowPayBtn = true;
      }

      //this.payCol.amount = 1;//please remove developer after testing complete
      this.payCol.billing_country = "India";
      this.payCol.billing_email = this.payment_details.billing_info.email;
      this.payCol.billing_tel = this.payment_details.billing_info.mobileno;
      this.payCol.billing_zip = this.payment_details.billing_info.pincode;

      console.log(".. this.payCol ..");
      console.log(this.payCol);


    }, error => {
      console.log(error);
    });
  }

  previewImage(files: FileList, obj, _propertyname) {

    const fileItem = files.item(0);
    this.selectedFile = fileItem;
    this.currentObj = obj;
    this.propertyname = _propertyname;

    this.Upload();

  }

  Upload() {

    if (this.selectedFile == null) {

      Swal.fire("please select file");

      return;


    }
    if (this.selectedFile != null) {
      var isfound = this.uploadService.checkImageFromate1(this.selectedFile.name)
      if (isfound) {
        // this.fileUploadLadda = false;
        Swal.fire("", "<p style='font-size: 1.5em'> Invalid file!! Only pdf can be uploaded </p>");
        return;
      }

    }
    this.uploadService.fileUpload(this.selectedFile).subscribe(data => {
      if (data.body) {

        if (data.body.isSuccess) {


          this.currentObj[this.propertyname] == null || this.currentObj[this.propertyname] == undefined || this.currentObj[this.propertyname] == "" ? this.currentObj[this.propertyname] = data.body.message : this.currentObj[this.propertyname] = this.currentObj[this.propertyname] + data.body.message;
          this.tostr.success('File uploaded');
          this.selectedFile = null;

          // let tempp = this.ClinicalServiceForm.daignostic_services.labservice_ac_credited_url
          //console.log(this.ClinicalServiceForm);
        }
        else {

          this.tostr.error(data.body.message);
          this.selectedFile = null;

        }
      }

    }
      , error => {
        console.log(error);
      });

  }


  openUploadedDocsModal(viewmodel, obj, _propertyname) {

    this.currentObj = obj;
    this.propertyname = _propertyname;
    this.ary_uploadedDocs = [];
    if (obj[_propertyname] == null || obj[_propertyname] == "" || obj[_propertyname] == undefined) {
      this.tostr.warning("No document uploaded.");
      return;
    }
    var str_array = obj[_propertyname].split('||');

    if (str_array) {
      if (str_array.length > 1) {
        for (var i = 0; i < str_array.length; i++) {

          if (str_array[i] && str_array[i].length > 0) {
            let docCls = new FileViewOrDelete();

            docCls.fn = str_array[i].split('|')[0];
            docCls.orgfn = str_array[i].split('|')[1];
            this.ary_uploadedDocs.push(docCls);
          }

        }
      }
    }
    this.modalService.open(viewmodel, { size: 'md' });
  }


  downloadUploadFile(item) {
    var result = this.uploadService.downloadUploadedFile(item.orgfn);
    result.subscribe(res => {
      if (res.isSuccess == true) {
        window.open(res.message);
      }
      else {
        this.tostr.error(res.message);
      }
    }, error => {
      //console.log(error);
    })
  }

  deleteUploadFile(item) {

    var result = this.uploadService.deleteUploadedFile(item.orgfn);
    result.subscribe(res => {

      if (res.isSuccess == true) {

        this.ary_uploadedDocs = this.ary_uploadedDocs.filter(objitem => objitem != item);//here current obj removed       
        var latestString = null;
        for (var i = 0; i < this.ary_uploadedDocs.length; i++) {
          latestString == null ? latestString = this.ary_uploadedDocs[i].fn + "|" + this.ary_uploadedDocs[i].orgfn + "||" : latestString += this.ary_uploadedDocs[i].fn + "|" + this.ary_uploadedDocs[i].orgfn + "||";
        }

        this.currentObj[this.propertyname] = latestString;
        this.deleteFile.emit(-1);

        // rrc
        this.payCol.gstcertificate = latestString;
        this.payCol.actiontype = 2;
        this.payCol.hospitalid = this.payment_details.hospid;

        this.http.post<CcAvenueOperationResult>(this.authenticationService.apiUrl + 'payment', this.payCol).subscribe(res => {
          this.payCol.gstcertificate = latestString;
        }, error => {
          console.log(error);
        })
        // rrc

      }
      else {
        this.tostr.error(res.message);
      }
    }, error => {
      console.log(".. error :- Delete GST certification & update ..");
      console.log(error);
    })
  }

  downloadPmytReciept(hospid) {


    let urlCert = this.rptUrl + "rptPaymentslip.aspx?hcopkid=" + hospid + "&accesstoken=" + this.currentUser.accessToken + "&type=invrcpt" + "&invoicefor=application1";
    window.open(urlCert, "_blank");
  }
  downloadPmytInvoice(hospid) {

    let urlCert = this.rptUrl + "rptPaymentslip.aspx?hcopkid=" + hospid + "&accesstoken=" + this.currentUser.accessToken + "&type=invrpt" + "&invoicefor=application";
    window.open(urlCert, "_blank");
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