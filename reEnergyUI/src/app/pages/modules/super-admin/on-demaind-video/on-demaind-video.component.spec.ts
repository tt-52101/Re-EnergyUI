import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemaindVideoComponent } from './on-demaind-video.component';

describe('OnDemaindVideoComponent', () => {
  let component: OnDemaindVideoComponent;
  let fixture: ComponentFixture<OnDemaindVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDemaindVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemaindVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
