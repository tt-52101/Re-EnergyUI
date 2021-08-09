import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionDischargeComponent } from './admission-discharge.component';

describe('AdmissionDischargeComponent', () => {
  let component: AdmissionDischargeComponent;
  let fixture: ComponentFixture<AdmissionDischargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionDischargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionDischargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
