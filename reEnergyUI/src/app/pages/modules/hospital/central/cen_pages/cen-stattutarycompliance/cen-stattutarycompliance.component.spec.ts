import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenStattutarycomplianceComponent } from './cen-stattutarycompliance.component';

describe('CenStattutarycomplianceComponent', () => {
  let component: CenStattutarycomplianceComponent;
  let fixture: ComponentFixture<CenStattutarycomplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenStattutarycomplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenStattutarycomplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
