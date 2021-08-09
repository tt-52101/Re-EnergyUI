import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenAdminrecordComponent } from './cen-adminrecord.component';

describe('CenAdminrecordComponent', () => {
  let component: CenAdminrecordComponent;
  let fixture: ComponentFixture<CenAdminrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenAdminrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenAdminrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
