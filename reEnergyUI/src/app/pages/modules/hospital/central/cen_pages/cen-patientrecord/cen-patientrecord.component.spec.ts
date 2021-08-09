import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenPatientrecordComponent } from './cen-patientrecord.component';

describe('CenPatientrecordComponent', () => {
  let component: CenPatientrecordComponent;
  let fixture: ComponentFixture<CenPatientrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenPatientrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenPatientrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
