import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PasswordchangeCommonComponent } from './passwordchangeCommon.component';


const routes: Routes = [
   
   
   
    {
        canActivate: [AuthGuard],
        path: '',
        component: PasswordchangeCommonComponent
       
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PasswordChangeRoutingModule { }
