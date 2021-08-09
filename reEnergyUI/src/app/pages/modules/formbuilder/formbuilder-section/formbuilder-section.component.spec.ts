import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormbuilderSectionComponent } from './formbuilder-section.component';

describe('FormbuilderSectionComponent', () => {
  let component: FormbuilderSectionComponent;
  let fixture: ComponentFixture<FormbuilderSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormbuilderSectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormbuilderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
