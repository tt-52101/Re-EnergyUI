import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';

import { User } from '../models/auth.models';
import { HttpRequest, HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    public token: string;
    public currentUserDatails;
    public loggedIn: boolean;
    public apiUrl: any;
    public rptUrl: string;

    // rrc
    public totalCtrl_hospp: number;
    public totalCtrl_centerr: number;
    public PaymentFor: string; //  live/test/local
    linkexpired: boolean;
    // rrc

    constructor(private http: HttpClient, private router: Router) {
        // set token if saved in local storage
        this.apiUrl = environment.apiUrl;

        // rrc
        this.rptUrl = environment.reportUrl;
        this.totalCtrl_hospp = environment.totalCtrl_hosp;
        this.totalCtrl_centerr = environment.totalCtrl_center;
        this.PaymentFor = environment.PaymentFor;
        // rrc

        const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
        this.token = currentUser && currentUser.accessToken;
        this.currentUserDatails = currentUser;
        //console.log("iisjsjj" + this.token);

        //console.log("iisjsjj" + this.currentUserDatails);
    }


    private parseData(res: Response) {
        return res || {};
    }

    private handleError(error: Response | any) {
        let errorMessage: string;

        errorMessage = error.error ? error.error : error.toString();


        // This returns another Observable for the observer to subscribe to
        return Observable.throw(errorMessage);
    }

    login(username: string, password: string): Observable<any> {

        return this.http.post(this.apiUrl + 'tokens', { UserName: username, Password: password, grant_type: 'password' })
            .map(this.parseData);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('ayushCurrentUser');
    }

    refreshToken_1(refresh_token: string): Observable<any> {

        return this.http.post(this.apiUrl + 'tokens', { UserName: '', Password: '', grant_type: 'refresh_token', refreshToken: refresh_token })
            .map(this.parseData);
    }
    refreshToken(req: HttpRequest<any>, next: HttpHandler, refreshToken: string): void {

        this.http.post(this.apiUrl + 'tokens', { UserName: '', Password: '', grant_type: 'refresh_token', RefreshToken: refreshToken })
            .subscribe((data: TokenResponse) => {
                if (data.accessToken) {
                    localStorage.setItem('nhaCurrentUser', JSON.stringify(data));
                    this.token = data.accessToken;
                    this.loggedIn = true;

                    // re-perform the request

                    next.handle(req);
                }
                else {
                    this.token = null;
                    this.loggedIn = false;
                    this.router.navigateByUrl('pages/login');
                }
            });

    }


    //#region 
    // Sign-in    

    getToken() {
        const currentUser = JSON.parse(localStorage.getItem('ayushCurrentUser'));
        return currentUser.accessToken;
    }

    get isLoggedIn(): boolean {
        let authToken = JSON.parse(localStorage.getItem('ayushCurrentUser'));
        return (authToken !== null) ? true : false;
    }
    //#endregion


    // user: User;

    // constructor() {
    // }

    // /**
    //  * Returns the current user
    //  */
    // public currentUser(): User {
    //     return getFirebaseBackend().getAuthenticatedUser();
    // }

    // /**
    //  * Performs the auth
    //  * @param email email of user
    //  * @param password password of user
    //  */
    // login(email: string, password: string) {
    //     return getFirebaseBackend().loginUser(email, password).then((response: any) => {
    //         const user = response;
    //         return user;
    //     });
    // }

    // /**
    //  * Performs the register
    //  * @param email email
    //  * @param password password
    //  */
    // register(email: string, password: string) {
    //     return getFirebaseBackend().registerUser(email, password).then((response: any) => {
    //         const user = response;
    //         return user;
    //     });
    // }

    // /**
    //  * Reset password
    //  * @param email email
    //  */
    // resetPassword(email: string) {
    //     return getFirebaseBackend().forgetPassword(email).then((response: any) => {
    //         const message = response.data;
    //         return message;
    //     });
    // }

    // /**
    //  * Logout the user
    //  */
    // logout() {
    //     // logout the user
    //     // getFirebaseBackend().logout();
    // }
}


interface TokenResponse {
    accessToken: string,
    refreshToken: string,
    userName: string,
    userId: number,
    email: string

}