import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Da_Oa_Allocated_Hosp_Dto } from '../../assessor/da-allocation/da-oa-allocated-hosp.component';
import { applicationTracker } from '../../super-admin/hospital-tracker/hospital-tracker.component';
import { FormBuilderSection } from '../model/FormBulderInfo';


@Injectable(
    {
        providedIn: 'root'
    }
)

export class FormBuilderDataShareService {
    formBulderInfo: BehaviorSubject<FormBuilderSection> = new BehaviorSubject(null);
    form_id: number;
    formName: string;
    vendorData: BehaviorSubject<applicationTracker> = new BehaviorSubject(null);
    vendorDataByasr: BehaviorSubject<Da_Oa_Allocated_Hosp_Dto> = new BehaviorSubject(null);
    assmt_id: BehaviorSubject<number> = new BehaviorSubject(0);
    hospid: BehaviorSubject<number> = new BehaviorSubject(0);
    formbuilder_form_id: BehaviorSubject<number> = new BehaviorSubject(0);

    setAssessmentId(data: number) {
        this.assmt_id.next(data);
    }

    getAssessmentId(): Observable<number> {
        return this.assmt_id.asObservable();
    }
    setFormId(data: number) {
        this.formbuilder_form_id.next(data);
    }

    getFormId(): Observable<number> {
        return this.formbuilder_form_id.asObservable();
    }

    setData(data: FormBuilderSection) {
        this.formBulderInfo.next(data);
    }

    getData(): Observable<FormBuilderSection> {
        return this.formBulderInfo.asObservable();
    }

    setVendorData(data: applicationTracker) {
        this.vendorData.next(data);
    }
    setVendorDataAsr(data: Da_Oa_Allocated_Hosp_Dto) {
        debugger
        this.vendorDataByasr.next(data);
    }
    setVendorDataHosp(data: number) {
        debugger
        this.hospid.next(data);
    }
    getVendorDatahosp(): Observable<number> {
        return this.hospid.asObservable();
    }

    getVendorData(): Observable<applicationTracker> {
        return this.vendorData.asObservable();
    }
    getVendorDataByasr(): Observable<Da_Oa_Allocated_Hosp_Dto> {
        return this.vendorDataByasr.asObservable();
    }
}
