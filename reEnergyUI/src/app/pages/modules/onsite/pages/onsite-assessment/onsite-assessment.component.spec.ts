import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteAssessmentComponent } from './onsite-assessment.component';

describe('OnsiteAssessmentComponent', () => {
  let component: OnsiteAssessmentComponent;
  let fixture: ComponentFixture<OnsiteAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsiteAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsiteAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
