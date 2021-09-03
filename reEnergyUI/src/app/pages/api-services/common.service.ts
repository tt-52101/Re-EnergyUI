import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class CommonService
  {
      
    showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);
    setLoaderStatus(data: boolean) {
        this.showLoader.next(data);
    }
    getLoaderStatus(): Observable<boolean> {
        return this.showLoader.asObservable();
    }
  }