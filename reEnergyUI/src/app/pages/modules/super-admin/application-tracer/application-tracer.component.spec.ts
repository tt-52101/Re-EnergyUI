import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTracerComponent } from './application-tracer.component';

describe('ApplicationTracerComponent', () => {
  let component: ApplicationTracerComponent;
  let fixture: ComponentFixture<ApplicationTracerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationTracerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationTracerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
