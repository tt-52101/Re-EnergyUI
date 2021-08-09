import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtiliytRoutingModule } from './utility-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { NgbNavModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { StarterComponent } from './starter/starter.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PricingComponent } from './pricing/pricing.component';
// import { BasicCertificationComponent } from '../modules/basic-certification/basic-Certification.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StarterComponent, TimelineComponent, FaqsComponent, PricingComponent],
  imports: [
    CommonModule,
    UtiliytRoutingModule,
    UIModule,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAccordionModule,

  ]
})
export class UtilityModule { }
