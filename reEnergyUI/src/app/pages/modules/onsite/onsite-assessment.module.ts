import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnsiteAssessmentComponent } from './pages/onsite-assessment/onsite-assessment.component';
import { OnsiteAssessmentRoutingModule } from './onsite-assessment-routing.module';
import { NgbCarouselModule, NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [OnsiteAssessmentComponent],
  imports: [
    CommonModule,
    OnsiteAssessmentRoutingModule,
    NgbNavModule,
    FormsModule,
    NgbCarouselModule,
    LaddaModule,
    NgbDropdownModule,
    NgSelectModule,
    NgbModule,

  ],
  exports: [NgbNavModule, NgbCarouselModule]
})
export class OnsiteAssessmentModule { }
