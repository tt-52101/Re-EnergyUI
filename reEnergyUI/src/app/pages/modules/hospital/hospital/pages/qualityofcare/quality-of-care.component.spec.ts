import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityOfCareComponent } from './quality-of-care.component';

describe('QualityOfCareComponent', () => {
  let component: QualityOfCareComponent;
  let fixture: ComponentFixture<QualityOfCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityOfCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityOfCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
