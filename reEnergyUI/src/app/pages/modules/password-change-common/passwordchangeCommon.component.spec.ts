import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordchangeCommonComponent } from './passwordchangeCommon.component';

describe('PasswordchangeCommonComponent', () => {
  let component: PasswordchangeCommonComponent;
  let fixture: ComponentFixture<PasswordchangeCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordchangeCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordchangeCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
