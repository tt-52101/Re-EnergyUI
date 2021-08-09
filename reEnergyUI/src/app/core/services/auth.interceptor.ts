import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

// , private jwtHelper: JwtHelperService
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  erMsg: string;
  erMsgFound: boolean;
  alertShown: boolean;
  constructor(private injector: Injector, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth: AuthenticationService = this.injector.get(AuthenticationService);
    let authReq = req.clone();
    let methode = req.method;
    
    //console.log("methode");
    //console.log(methode + "|" + req.urlWithParams);   
    if (methode == "GET") {
      // this.loaderService.show();
      //  this.loadingScreenService.startLoading();s
      // console.log("loder start ........" + req.urlWithParams)

    }


    if (!req.url.toLocaleLowerCase().endsWith('/tokens') && !req.url.toLocaleLowerCase().includes('/hcoregistration') && !req.url.toLocaleLowerCase().includes('/unauthorized/') && !req.url.toLocaleLowerCase().includes('/questionBank/') && !req.url.toLocaleLowerCase().includes('/assets/data/')) {

      const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
      // check if the accessToken is null, if so, re-direct to login page      
      if (!currentUser.accessToken) {
        this.router.navigateByUrl('/account/login');
        return;
      }
      // check if accessToken is expired, if so, call authentication service refresh token mehod
      // if (this.jwtHelper.isTokenExpired(currentUser.accessToken)) {
      if (currentUser.accessToken == null) {
        if (this.alertShown != true) {
          this.alertShown = true;

          alert("Your login session might have expired.\nIf problem persists, Sign-in again in portal !!")
          this.router.navigateByUrl('account/login');
          localStorage.removeItem('ayushCurrentUser');
        }
        auth.refreshToken(req, next, currentUser.refreshToken);
        return;
      }
      // if we have reached here, it means that we have a valid accessToken, so append it and send request
      authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + currentUser.accessToken) });

    } //if req.url.toLocaleLowerCase().endsWith('/tokens')

    // return next.handle(authReq);

    return next.handle(authReq)._finally(() => {
      // this.loaderService.hide();
    }

      // console.log("loder stop ........")
    )
      .catch((error, caught) => {
        // intercept the respons error and displace it to the console
        console.log('..AuthIncept Error Occurred...');
        
        // rrc//
        console.log("error.error ++++++++++++++++++ " + error.error);
        console.log(error);
        //console.log(error.error);

        this.erMsg = "";
        this.erMsg = error.message;

        this.erMsgFound = this.erMsg.toString().trim().toLowerCase().startsWith("Could not verify username/ password or refresh token".toLowerCase());

        if (this.erMsgFound == true) {
          if (this.alertShown != true) {
            this.alertShown = true;
            alert("Your login session has expired. To continue on portal, Sign in again\nCould not verify username/ password or refresh token !!"); // Login session may have expired !!\n Close all tabs & Please Login again    
            console.log("this.erMsgFound.. Could not verify user... " + this.erMsgFound);
            //return Observable.throw(error);
          }
        }

        this.erMsgFound = this.erMsg.toString().trim().toLowerCase().startsWith("Grant type is compulsory field".toLowerCase());

        if (this.erMsgFound == true) {
          if (this.alertShown != true) {
            this.alertShown = true;
            //alert("Your login session has expired. To continue on portal, Sign in again\nGrant type is compulsory field !!");
            console.log("this.erMsgFound.. Grant type... " + this.erMsgFound);
            //return Observable.throw(error);
          }
        }

        this.erMsg = error.message;

        if (this.erMsg) {
          this.erMsgFound = this.erMsg.toString().trim().toLowerCase().startsWith("Invalid login".toLowerCase());

          if (this.erMsgFound == true) {
            if (this.alertShown != true) {
              this.alertShown = true;
              //alert("Your login session has expired. To continue on portal, Sign in again\nInvalid login !!");
              console.log("this.erMsgFound.. Invalid login... " + this.erMsgFound);
              //return Observable.throw(error);
            }
          }
        }
        // rrc

        this.router.navigateByUrl('/account/login');
        //console.log(error);
        localStorage.removeItem('nhaCurrentUser');
        // return the error to the method that called it
        return Observable.throw(error);
      }) as any;



  } //intercept

} //class
