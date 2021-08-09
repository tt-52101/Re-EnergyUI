import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { BasicCertificationComponent } from './basic-certification/basic-Certification.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'reset-password',
        component: PasswordresetComponent
    },
    {
        path: 'basicCert',
       
        component: BasicCertificationComponent
    },
    {
        path: 'password-change',
        component: ForgotPasswordComponent
       
    },
    {
        canActivate: [AuthGuard],
        path: 'change-password',
        component: PasswordchangeComponent
       
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
