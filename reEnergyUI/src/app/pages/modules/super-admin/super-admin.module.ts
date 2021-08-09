import { DatePipe } from '@angular/common'; // rrc
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared.module';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { UserListComponent } from './userlist/user-list.component';
import { AuthHttpInterceptor } from 'src/app/core/services/auth.interceptor';
import { HospitalListComponent } from './hospitallist/hospital-list.component';
import { HospitalTrackerComponent } from './hospital-tracker/hospital-tracker.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DaAllocateComponent } from './da-allocation/da-allocate.component';
import { LaddaModule } from 'angular2-ladda';
import { AsrlistComponent } from './asrlist/asrlist.component';
import { CertifiedHospitalComponent } from './certified-hospital/certified-hospital.component';
import { OaAllocationComponent } from './oa-allocation/oa-allocation.component';
import { CcAllocationComponent } from './cc-allocation/cc-allocation.component';
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
    UserListComponent,
    HospitalListComponent,
    HospitalTrackerComponent,
    DaAllocateComponent,
    AsrlistComponent,
    CertifiedHospitalComponent,
    OaAllocationComponent,
    CcAllocationComponent,
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
