import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderHospListComponent } from './form-builder-hosp-list.component';

describe('FormBuilderHospListComponent', () => {
  let component: FormBuilderHospListComponent;
  let fixture: ComponentFixture<FormBuilderHospListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBuilderHospListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderHospListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
