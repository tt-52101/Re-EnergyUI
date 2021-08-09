import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
// private jwtHelper: JwtHelperService
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate() {
        if (localStorage.getItem('ayushCurrentUser')) {
            // logged           
            const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
            // check if the accessToken has expired by more than 60 minutes
            // if so, send the user to login page
            // else return true
            // const currentDateTime: any = new Date();
            // const expiryDateTime: any = this.jwtHelper.getTokenExpirationDate(currentUser.accessToken);
            // if ((currentDateTime - expiryDateTime) / 60 > 40) {
            if (currentUser == null) {
                // token expiry is exceeded by more than 60 minutes, send to login 
                // alert("Aww oops");
                this.router.navigate(['/account/login']);
                return false;
            } else {
                return true;
            }
        } else {
            // not logged in so redirect to login page
            this.router.navigate(['/account/login']);
            return false;
        }
    }
}
