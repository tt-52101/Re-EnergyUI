import { BehaviorSubject, Observable } from 'rxjs';
import { cenHospitalPages, cenHospitalPagesQuestionBank } from 'src/app/pages/model/center/cenHospitalPages.model';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { root } from 'rxjs/internal/util/root';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class cenHospitalDataShareService {
    public apiUrl: any;

    cenhospitalpages: BehaviorSubject<cenHospitalPages> = new BehaviorSubject(null);
    cenhospitalPagesQuestionBank: BehaviorSubject<cenHospitalPagesQuestionBank> = new BehaviorSubject(null);
    isFormSubmitted: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isDeleteSuccess: BehaviorSubject<boolean> = new BehaviorSubject(false);
    disableBtns: BehaviorSubject<boolean> = new BehaviorSubject(false);
    ncFormTabInfo = new BehaviorSubject(null);
    currentStage = new BehaviorSubject(0);
    @Output() openNcModelTabControl = new EventEmitter();
    // showLoader:BehaviorSubject<boolean> = new BehaviorSubject(false);

    // setLoaderStatus(data: boolean) {
    //     this.showLoader.next(data);
    // }
    // getLoaderStatus(): Observable<boolean> {
    //     return this.showLoader.asObservable();
    // }

    setData(data: cenHospitalPages) {
        this.cenhospitalpages.next(data);
    }
    getData(): Observable<cenHospitalPages> {
        return this.cenhospitalpages.asObservable();
    }


    setQuestionBankData(data: cenHospitalPagesQuestionBank) {
        this.cenhospitalPagesQuestionBank.next(data);
    }
    getQuestionBankData(): Observable<cenHospitalPagesQuestionBank> {
        return this.cenhospitalPagesQuestionBank.asObservable();
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
}