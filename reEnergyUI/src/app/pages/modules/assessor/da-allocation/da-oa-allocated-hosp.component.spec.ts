import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaOaAllocatedHospComponent } from './da-oa-allocated-hosp.component';

describe('HospitalTrackerComponent', () => {
  let component: DaOaAllocatedHospComponent;
  let fixture: ComponentFixture<DaOaAllocatedHospComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaOaAllocatedHospComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaOaAllocatedHospComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
