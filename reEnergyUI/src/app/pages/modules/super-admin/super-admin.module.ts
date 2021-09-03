import { DatePipe } from '@angular/common'; // rrc
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared.module';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AuthHttpInterceptor } from 'src/app/core/services/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { LaddaModule } from 'angular2-ladda';
import { ApplicationTracerComponent } from './application-tracer/application-tracer.component';
import { StudiosComponent } from './studios/studios.component';
import { UsersComponent } from './users/users.component';
import { LiveVedioSheduleComponent } from './live-vedio-shedule/live-vedio-shedule.component';
import { OnDemaindVideoComponent } from './on-demaind-video/on-demaind-video.component';
import { PricingComponent } from './pricing/pricing.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { CustomersComponent } from './customers/customers.component';


@NgModule({
  declarations: [
    ApplicationTracerComponent,
    StudiosComponent,
    UsersComponent,
    LiveVedioSheduleComponent,
    OnDemaindVideoComponent,
    PricingComponent,
    MasterDataComponent,
    CustomersComponent

  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    LaddaModule,
    SharedModule

  ],
  providers: [DatePipe, // rrc
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ]
})
export class SuperAdminModule { }
