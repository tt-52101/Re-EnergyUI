import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrequestionBankComponent } from './centrequestion-bank.component';

describe('CentrequestionBankComponent', () => {
  let component: CentrequestionBankComponent;
  let fixture: ComponentFixture<CentrequestionBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentrequestionBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentrequestionBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
