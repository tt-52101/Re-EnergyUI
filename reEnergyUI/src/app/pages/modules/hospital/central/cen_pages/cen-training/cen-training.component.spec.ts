import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenTrainingComponent } from './cen-training.component';

describe('CenTrainingComponent', () => {
  let component: CenTrainingComponent;
  let fixture: ComponentFixture<CenTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
