import { BehaviorSubject, Observable } from 'rxjs';
import { HospitalPages, HospitalPagesQuestionBank } from 'src/app/pages/model/hospital/HospitalPages.model';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { root } from 'rxjs/internal/util/root';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class HospitalDataShareService {
    public apiUrl: any;

    hospitalpages: BehaviorSubject<HospitalPages> = new BehaviorSubject(null);
    hospitalPagesQuestionBank: BehaviorSubject<HospitalPagesQuestionBank> = new BehaviorSubject(null);
    isFormSubmitted: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isDeleteSuccess: BehaviorSubject<boolean> = new BehaviorSubject(false);
    ncFormTabInfo = new BehaviorSubject(null);
    currentStage = new BehaviorSubject(0);
    disableBtns: BehaviorSubject<boolean> = new BehaviorSubject(false);
    showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);
    registered_success: boolean = false

    setRegisteredStatus(data: boolean) {
        this.registered_success = data;
    }
    getRegisteredStatus(): boolean {
        return this.registered_success
    }
    setLoaderStatus(data: boolean) {
        this.showLoader.next(data);
    }
    getLoaderStatus(): Observable<boolean> {
        return this.showLoader.asObservable();
    }

    setData(data: HospitalPages) {
        this.hospitalpages.next(data);
    }
    getData(): Observable<HospitalPages> {
        return this.hospitalpages.asObservable();
    }


    setQuestionBankData(data: HospitalPagesQuestionBank) {
        this.hospitalPagesQuestionBank.next(data);
    }
    getQuestionBankData(): Observable<HospitalPagesQuestionBank> {
        return this.hospitalPagesQuestionBank.asObservable();
    }

    setFormSubmissionStatus(data: boolean) {
        this.isFormSubmitted.next(data);
    }
    getFormSubmissionStatus(): Observable<boolean> {
        return this.isFormSubmitted.asObservable();
    }

    setDeleteRecordStatus(data: boolean) {
        this.isDeleteSuccess.next(data);
    }
    getDeleteRecordStatus(): Observable<boolean> {
        return this.isDeleteSuccess.asObservable();
    }

    setButtonsHide(data: boolean) {
        return this.disableBtns.next(data);
    }

    getButtonsHide(): Observable<boolean> {
        return this.disableBtns.asObservable();
    }
    @Output() deleteFile = new EventEmitter();
    

}