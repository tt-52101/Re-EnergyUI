import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenSupportServiceComponent } from './cen-support-service.component';

describe('CenSupportServiceComponent', () => {
  let component: CenSupportServiceComponent;
  let fixture: ComponentFixture<CenSupportServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenSupportServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenSupportServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
