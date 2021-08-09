// rrc
export class Paycollect {
  id: number;
  merchant_id: number;
  order_id: String;
  tracking_id: number;
  hospitalid: number;
  userid: number; // rrc
  bank_ref_no: String;
  order_status: String;
  failure_message: String;
  payment_mode: String;
  card_name: String;
  status_code: number;
  status_message: String;
  currency: String;
  amount: number;
  gst_amount: number;
  totalamtwithgst: number;
  payableamount: number;
  billing_name: String = "";
  billing_address: String = "test";
  billing_city: String = "";
  billing_state: String = "";
  billing_district: String = "";
  billing_zip: String = "";
  billing_country: String = "India";
  billing_tel: String = "";
  billing_email: String = "";
  delivery_name: String;
  delivery_address: String;
  delivery_city: String = "";
  delivery_state: String = "";
  delivery_district: String = "";
  delivery_zip: String;
  delivery_country: String = "India";
  delivery_tel: String;
  merchant_param1: String = "test1";
  merchant_param2: String = "test2";
  merchant_param3: String = "test3";
  merchant_param4: String = "test4";
  merchant_param5: String = "test5";
  creationdatetime: Date;
  ispaid: boolean;
  district: String;
  gstin: String;
  pan: String;

  tan: String;
  gstcertificate: String;
  gststatus: String;
  tradename: String;
  actiontype: number;
  PaymentFor: string;
}
// rrc