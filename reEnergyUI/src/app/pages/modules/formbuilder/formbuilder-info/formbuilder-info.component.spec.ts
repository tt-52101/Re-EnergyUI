import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormbuilderInfoComponent } from './formbuilder-info.component';

describe('FormbuilderInfoComponent', () => {
  let component: FormbuilderInfoComponent;
  let fixture: ComponentFixture<FormbuilderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormbuilderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormbuilderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
