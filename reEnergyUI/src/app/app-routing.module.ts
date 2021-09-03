import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { ErrorpageComponent } from './shared/ui/errorpage/errorpage.component';

const routes: Routes = [
  {

    path: '',
    redirectTo: 'account/login',
    pathMatch: 'full',
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  // tslint:disable-next-line: max-line-length
  // { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  // { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard] }

  {
    canActivate: [AuthGuard],
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  
  {
    canActivate: [AuthGuard],
    path: 'pages',
    loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule)
  },
 
 
  {
    canActivate: [AuthGuard],
    path: 'password-change',
    component: LayoutComponent,
    loadChildren: () => import('./pages/modules/password-change-common/passwordchange.module').then(m => m.PasswordChangeModule)
  },
 
  
  {

    path: 'error',
    component: ErrorpageComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
