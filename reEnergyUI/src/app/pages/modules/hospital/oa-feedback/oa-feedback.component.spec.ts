import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OAFeedbackComponent } from './oa-feedback.component';

describe('OAFeedbackComponent', () => {
  let component: OAFeedbackComponent;
  let fixture: ComponentFixture<OAFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OAFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OAFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
