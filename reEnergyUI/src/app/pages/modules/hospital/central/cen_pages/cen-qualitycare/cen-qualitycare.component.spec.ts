import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenQualitycareComponent } from './cen-qualitycare.component';

describe('CenQualitycareComponent', () => {
  let component: CenQualitycareComponent;
  let fixture: ComponentFixture<CenQualitycareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenQualitycareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenQualitycareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
