import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectionControlComponent } from './infection-control.component';

describe('InfectionControlComponent', () => {
  let component: InfectionControlComponent;
  let fixture: ComponentFixture<InfectionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfectionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
