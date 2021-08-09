import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalTrackerComponent } from './hospital-tracker.component';

describe('HospitalTrackerComponent', () => {
  let component: HospitalTrackerComponent;
  let fixture: ComponentFixture<HospitalTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
