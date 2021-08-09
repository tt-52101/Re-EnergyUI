import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';

import { ExtrapagesModule } from './extrapages/extrapages.module';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initFirebaseBackend } from './authUtils';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticationService } from './core/services/auth.service';
import { AuthHttpInterceptor } from './core/services/auth.interceptor';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbDateFRParserFormatter } from './service/ngb-date-fr-parser-formatter';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { LaddaModule } from 'angular2-ladda';
import { FormsModule } from '@angular/forms';
import { MinOneTableRecordDirective } from './customValidater/min-one-table-record.directive';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';



// import { MatDialogModule } from '@angular/material/dialog';
//initFirebaseBackend(environment.firebaseConfig);

@NgModule({
  providers: [
    AuthGuard,
    AuthenticationService,
    // MatDialogModule,
    // JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }
  ],
  declarations: [
    AppComponent,
    
    
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    LaddaModule,
    FormsModule,
    NgxLoadingModule.forRoot({
    fullScreenBackdrop:true,
    animationType: ngxLoadingAnimationTypes.wanderingCubes,
  primaryColour:"rgb(0, 0, 0)"}),
  ToastrModule.forRoot()
  

    
  ],
  bootstrap: [AppComponent],
  exports:[LaddaModule]
})
export class AppModule { }
