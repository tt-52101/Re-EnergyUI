export class PayemntTrackerList {
        id: number;
        hosp_id: number | null;
        reference_id: string;
        org_name: string;
        state_id: number;
        state: string;
        application_type: string;
        type: string;

        application_no: string;
        registration_date: Date | string;
        stage: string;
        stage_id: number;
        status: boolean;

        city: string;
        district: string;

        gstin: string;
        pan: string;
        tds: string;

        tan: string;
        gstcertificate: string;
        gststatus: string;

        payment_mode: string;
        //Mode of payment used by the customer
        //Credit Card
        //Net banking
        //Debit Card
        //Cash Card
        //Mobile Payment
        //Alphabets

        // and unique id provided by ccavent account
        order_id: string;
        //Unique ID sent by the merchant at the time of initiating the transaction.
        //Alphanumeric(30)
        tracking_id: number | null;

        amount: number | null;
        payment_date: Date | string | null;


    }
    export class PayemntTracker {
        current: number;
        total: number;
        rowcount: number;
        rows: PayemntTrackerList[];

        
    }