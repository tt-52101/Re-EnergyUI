import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutaryComplianceComponent } from './statutary-compliance.component';

describe('StatutaryComplianceComponent', () => {
  let component: StatutaryComplianceComponent;
  let fixture: ComponentFixture<StatutaryComplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatutaryComplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutaryComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
