import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenInfectionControlComponent } from './cen-infection-control.component';

describe('CenInfectionControlComponent', () => {
  let component: CenInfectionControlComponent;
  let fixture: ComponentFixture<CenInfectionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenInfectionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenInfectionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
