import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaAllocateComponent } from './da-allocate.component';

describe('HospitalTrackerComponent', () => {
  let component: DaAllocateComponent;
  let fixture: ComponentFixture<DaAllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaAllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
