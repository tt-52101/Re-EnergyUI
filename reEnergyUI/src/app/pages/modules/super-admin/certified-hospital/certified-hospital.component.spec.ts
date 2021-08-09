import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedHospitalComponent } from './certified-hospital.component';

describe('HospitalTrackerComponent', () => {
  let component: CertifiedHospitalComponent;
  let fixture: ComponentFixture<CertifiedHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifiedHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifiedHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
