import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVedioSheduleComponent } from './live-vedio-shedule.component';

describe('LiveVedioSheduleComponent', () => {
  let component: LiveVedioSheduleComponent;
  let fixture: ComponentFixture<LiveVedioSheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveVedioSheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveVedioSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
