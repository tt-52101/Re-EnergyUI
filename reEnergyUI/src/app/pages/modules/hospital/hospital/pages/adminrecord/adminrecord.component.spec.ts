import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrecordComponent } from './adminrecord.component';

describe('AdminrecordComponent', () => {
  let component: AdminrecordComponent;
  let fixture: ComponentFixture<AdminrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
