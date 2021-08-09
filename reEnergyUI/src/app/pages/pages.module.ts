import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgApexchartsModule } from 'ng-apexcharts';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

import { FullCalendarModule } from '@fullcalendar/angular';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { EmailModule } from './email/email.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ContactsModule } from './contacts/contacts.module';
import { UtilityModule } from './utility/utility.module';
import { UiModule } from './ui/ui.module';
import { FormModule } from './form/form.module';
import { TablesModule } from './tables/tables.module';
import { IconsModule } from './icons/icons.module';
import { ChartModule } from './chart/chart.module';
import { CalendarComponent } from './calendar/calendar.component';
import { MapsModule } from './maps/maps.module';
import { ChatComponent } from './chat/chat.component';
import { AdminDashboardComponent } from './dashboard/admindashboard/admidashboard.component';
import { HospitalDashboardComponent } from './dashboard/hospitaldashboard/hospitaldashboard.component';
//import { CcDashboardComponent } from './dashboard/ccdashboard/CcDashboardComponent.component';
// import { AssessordashboardComponent } from './dashboard/assessordashboard/assessordashboard.component';
import { QuestionBankComponent } from './modules/question-bank/question-bank.component';
// import { AssessorComponent } from './modules/assessor/assessor.component';
import { CentrequestionBankComponent } from './modules/centrequestion-bank/centrequestion-bank.component';
import { from } from 'rxjs';
import { ArchwizardModule } from 'angular-archwizard';
import { AsrdashboardComponent } from './dashboard/asrdashboard/asrdashboard.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { NgxPaginationModule } from 'ngx-pagination';
import { LaddaModule } from 'angular2-ladda';
import { CcDashboardComponent } from './dashboard/ccdashboard/ccdashboard.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3
};

@NgModule({
  declarations: [
    DashboardComponent,
    CalendarComponent,
    ChatComponent,
    AdminDashboardComponent,
    HospitalDashboardComponent,
    AsrdashboardComponent,
    QuestionBankComponent,
    CentrequestionBankComponent,
    CcDashboardComponent
    // AssessordashboardComponent,



  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    EcommerceModule,
    EmailModule,
    InvoicesModule,
    ProjectsModule,
    UIModule,
    TasksModule,
    ContactsModule,
    UtilityModule,
    UiModule,
    FormModule,
    TablesModule,
    IconsModule,
    ChartModule,
    WidgetModule,
    MapsModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbModule,
    PerfectScrollbarModule,
    ArchwizardModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    LaddaModule,


  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
